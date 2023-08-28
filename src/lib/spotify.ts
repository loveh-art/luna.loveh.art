export const defaultSong: iSong = {
  name: "Nothing Playing",
  album: "Nothing Playing",
  albumUrl: "https://open.spotify.com",
  image: "/img/nosong.png",
  time: 0,
  duration: 3000,
};
export const defaultData: iSpotifyData = {
  song: defaultSong,
};
export interface iSpotifyData {
  userName?: string;
  url?: string;
  avatarUrl?: string;
  song: iSong;
}
export interface iSong {
  name: string;
  artist?: string;
  artistUrl?: string;
  album: string;
  albumUrl: string;
  image: string;
  playlist?: string;
  playlistUrl?: string;
  time: number;
  duration: number;
}
