import type {
  RESTPostAPIWebhookWithTokenJSONBody,
  RESTPostAPIWebhookWithTokenResult,
} from "discord-api-types/v10";

import * as env from "$env/static/private";

export const prerender = false;

export class Logger {
  prefix: string;
  discord: boolean;
  color: number;
  fileName: string;

  constructor(
    prefix: string,
    fileName: string,
    discord: boolean = false,
    color: number = 0
  ) {
    this.prefix = `[${prefix}]`;
    this.discord = discord;
    this.color = color;
    this.fileName = fileName.split("src/")[1];
  }

  log(
    message: string | RESTPostAPIWebhookWithTokenJSONBody,
    _options?: { discord?: boolean; color?: number }
  ): string {
    console.log(`${this.prefix} ${message}`);
    const options = _options || {};
    options.discord =
      typeof options.discord !== "undefined" ? options.discord : this.discord;
    if (options.discord) {
      if (typeof message === "string") {
        sendWebhookMessage({
          embeds: [
            {
              title: this.prefix,
              url: `https://github.com/ImLvna/website/blob/main/src/${this.fileName}`,
              description: message,
              color: options.color || this.color,
            },
          ],
        });
        return message;
      }
      sendWebhookMessage(message);
      return message.content || "";
    } else return message as string;
  }
}

export function sendWebhookMessage(
  content: RESTPostAPIWebhookWithTokenJSONBody
): void {
  fetch(env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
}
