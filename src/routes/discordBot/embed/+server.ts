import { getData } from "$lib/server/spotify";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import * as env from "$env/static/private";

import puppeteer from "puppeteer";

export const GET: RequestHandler = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: env.PROD ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
    executablePath: env.CHROME_PATH || "",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 340, height: 100 });
  await page.goto(
    `http${env.HTTPS ? "s" : ""}://${env.SERVER}/discordBot/embedLoad`,
  );

  const ss = await page.screenshot({});

  await browser.close();

  return new Response(ss, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
