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

// Telegram-specific fullscreen controls
export function tgRequestFullscreen() {
  const webApp = getTelegramWebApp();
  try {
    (webApp as any)?.requestFullscreen?.();
  } catch (_) {}
}

export function tgExitFullscreen() {
  const webApp = getTelegramWebApp();
  try {
    (webApp as any)?.exitFullscreen?.();
  } catch (_) {}
}

export function tgIsFullscreen(): boolean {
  const webApp = getTelegramWebApp();
  try {
    return !!(webApp as any)?.isFullscreen?.();
  } catch (_) {
    return false;
  }
}

export function onTgFullscreenChanged(handler: (isFullscreen: boolean) => void) {
  const webApp = getTelegramWebApp();
  try {
    (webApp as any)?.onEvent?.('fullscreenChanged', () => handler(tgIsFullscreen()));
  } catch (_) {}
}

// Haptic feedback
export function triggerHapticFeedback(type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'selection' = 'light') {
  const webApp = getTelegramWebApp();
  try {
    (webApp as any)?.HapticFeedback?.impactOccurred?.(type);
  } catch (_) {
    // Fallback to browser vibration API
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        rigid: [15],
        soft: [5],
        selection: [5]
      };
      navigator.vibrate(patterns[type] || [10]);
    }
  }
}

export type TelegramTheme = 'light' | 'dark';

export function getTelegramTheme(): TelegramTheme {
  const webApp = getTelegramWebApp();
  const scheme = webApp?.colorScheme as 'light' | 'dark' | undefined;
  if (scheme === 'dark') return 'dark';
  return 'light';
}



