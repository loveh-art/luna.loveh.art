// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
  interface Platform {
    env: {
      DISCORD_OWNER_ID: string;
      DISCORD_BOT_TOKEN: string;
    };
    context: {
      waitUntil(promise: Promise<unknown>): void;
    };
    caches: CacheStorage & { default: Cache };
  }
}
