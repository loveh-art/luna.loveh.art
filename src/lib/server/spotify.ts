import spotifyApi from "spotify-web-api-node";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { randomBytes } from "crypto";
import { Logger } from "$lib/server/logger";
import * as env from "$env/static/private";
import { defaultSong, type iSong, type iSpotifyData } from "$lib/spotify";
export const prerender = false;

const logger = new Logger("[spotify]", import.meta.url, true, 0x00ff00);

export const headlessStates: string[] = [];

puppeteer.use(StealthPlugin());

const enablePuppeteer = env.SPOTIFY_PASSWORD && env.SPOTIFY_PASSWORD !== "";

let alertCooldown = false;

export let lastKnownSong: iSong = defaultSong;

interface iPersistData {
  spotify_refresh_token?: string;
  spotify_access_token?: string;
  lastKnownSong?: iSong;
}

const spotify = new spotifyApi({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
  refreshToken: env.SPOTIFY_REFRESH_TOKEN,
  accessToken: env.SPOTIFY_ACCESS_TOKEN,
  redirectUri: `http${env.HTTPS ? "s" : ""}://${env.SERVER}/spotify/auth`,
});

export const setRefreshToken = async (newToken: string) => {
  spotify.setRefreshToken(newToken);
  return await refreshAuth();
};

setInterval(
  async () => {
    const newTokens = (await spotify.refreshAccessToken()).body;
    spotify.setAccessToken(newTokens.access_token);
    if (newTokens.refresh_token) {
      spotify.setRefreshToken(newTokens.refresh_token);
    }
  },
  1000 * 60 * 50
);

async function refreshAuth(): Promise<boolean> {
  try {
    const oldAccessToken = spotify.getAccessToken();
    const oldRefreshToken = spotify.getRefreshToken()!;
    const authData = await spotify.authorizationCodeGrant(oldRefreshToken);
    spotify.setAccessToken(authData.body["access_token"]);
    spotify.setRefreshToken(authData.body["refresh_token"]);

    let me = (await spotify.getMe()).body;
    if (me.id !== env.SPOTIFY_OWNER_ID) {
      spotify.setAccessToken(oldAccessToken || "");
      spotify.setRefreshToken(oldRefreshToken);

      logger.log({
        content: `WARNING: Authenticated with a different user!!!`,
        embeds: [
          {
            color: 0xff0000,
            author: {
              name: `${me.display_name} (${me.id})`,
              icon_url: me.images?.[0].url,
              url: me.uri,
            },
          },
        ],
      });
      return false;
    }

    return true;
  } catch (error) {
    try {
      if (alertCooldown) return false;
      alertCooldown = true;
      setTimeout(() => (alertCooldown = false), 20000);
      // console.log(error);

      const state = randomBytes(20).toString("hex");
      const authUrl = spotify.createAuthorizeURL(
        ["user-read-currently-playing", "user-read-playback-state"],
        state
      );

      if (enablePuppeteer) {
        headlessStates.push(state);
        const browser = await puppeteer.launch({
          headless: "new",
          args: env.PROD ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
          executablePath: env.CHROME_PATH || "",
        });
        const page = await browser.newPage();
        await page.goto(authUrl);
        await page.waitForSelector("#login-username");
        await page.focus("#login-username"); // put in the credentials
        await page.keyboard.type(env.SPOTIFY_OWNER_ID);
        await page.focus("#login-password");
        await page.keyboard.type(env.SPOTIFY_PASSWORD!);
        await page.$eval("#login-button", (el: any) => el.click());
        await page.waitForNavigation();
        console.log(page.url());
        await page.waitForNetworkIdle();
        headlessStates.splice(headlessStates.indexOf(state), 1);
        await browser.close().catch(console.log);
      } else {
        logger.log(
          `<@${env.DISCORD_OWNER_ID}> The refresh token has expired. Please re-authenticate [here](${authUrl})`
        );
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export async function getData(): Promise<iSpotifyData> {
  try {
    const userData = (await spotify.getMe()).body;
    const nowPlaying = (await spotify.getMyCurrentPlaybackState()).body;
    if (nowPlaying.item) {
      nowPlaying.item = nowPlaying.item as TrackObjectFull;
      lastKnownSong = {
        name: nowPlaying.item.name,
        artist: nowPlaying.item.artists[0].name,
        artistUrl: nowPlaying.item.artists[0].external_urls.spotify,
        album: nowPlaying.item.album.name,
        albumUrl: nowPlaying.item.album.external_urls.spotify,
        image: nowPlaying.item.album.images[0].url,
        time: nowPlaying.progress_ms!,
        duration: nowPlaying.item.duration_ms!,
      };
      if (nowPlaying.context?.type === "playlist") {
        const playlistData = (
          await spotify.getPlaylist(nowPlaying.context.uri.split(":")[2])
        ).body;
        lastKnownSong.playlist = playlistData.name;
        lastKnownSong.playlistUrl = playlistData.external_urls.spotify;
      }
    }
    const output: iSpotifyData = {
      song: lastKnownSong,
    };
    if (userData) {
      if (userData.images?.[0]) output.avatarUrl = userData.images[0].url;
      output.userName = userData.display_name || userData.id;
      output.url = userData.external_urls.spotify;
    }
    return output;
  } catch (error) {
    if ((error as any).statusCode !== 401) console.error(error);
    refreshAuth();
    return {
      song: defaultSong,
    };
  }
}
