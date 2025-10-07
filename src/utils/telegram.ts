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

export function expandWebApp() {
  const webApp = getTelegramWebApp();
  try {
    webApp?.expand?.();
  } catch (_) {}
}

export function requestFullscreen() {
  const docEl: any = document.documentElement as any;
  const req = docEl?.requestFullscreen || docEl?.webkitRequestFullscreen || docEl?.msRequestFullscreen;
  if (typeof req === 'function') {
    try {
      req.call(docEl);
    } catch (_) {}
  }
}

export type TelegramTheme = 'light' | 'dark';

export function getTelegramTheme(): TelegramTheme {
  const webApp = getTelegramWebApp();
  const scheme = webApp?.colorScheme as 'light' | 'dark' | undefined;
  if (scheme === 'dark') return 'dark';
  return 'light';
}



