export function getTelegramWebApp(): any | undefined {
  return (window as any).Telegram?.WebApp;
}

export function getInitData(): string | null {
  const webApp = getTelegramWebApp();
  const initData = webApp?.initData as string | undefined;
  return initData ?? null;
}

export function markReady() {
  const webApp = getTelegramWebApp();
  webApp?.ready?.();
}


