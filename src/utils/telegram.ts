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

export type TelegramTheme = 'light' | 'dark';

export function getTelegramTheme(): TelegramTheme {
  const webApp = getTelegramWebApp();
  const scheme = webApp?.colorScheme as 'light' | 'dark' | undefined;
  if (scheme === 'dark') return 'dark';
  return 'light';
}

export function getTelegramPlatform(): 'ios' | 'android' | 'macos' | 'tdesktop' | 'unrecognized' {
  const webApp = getTelegramWebApp();
  const platform = (webApp?.platform as string | undefined)?.toLowerCase();
  if (!platform) return 'unrecognized';
  if (platform.includes('ios')) return 'ios';
  if (platform.includes('android')) return 'android';
  if (platform.includes('macos')) return 'macos';
  if (platform.includes('tdesktop') || platform.includes('desktop')) return 'tdesktop';
  return 'unrecognized';
}



