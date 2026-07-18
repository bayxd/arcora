import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

export const circleWallets = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY!,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET!
});

export const CIRCLE = {
  kitKey: "KIT_KEY:proxied:proxied",
} as const;

export function ensureCircleConfig() {
  return CIRCLE;
}