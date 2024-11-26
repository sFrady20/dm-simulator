declare module "ga-gtag" {
  export function install(trackingId: string, additionalConfigInfo?: {}): void;
  export function gtag(...args: any[]): void;
}
