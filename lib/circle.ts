export const CIRCLE = {
  kitKey: "KIT_KEY:proxied:proxied",
} as const;

export function ensureCircleConfig() {
  return CIRCLE;
}