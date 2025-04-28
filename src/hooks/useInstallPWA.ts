import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const useInstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptInstall(e);
      setSupportsPWA(true);
    };

    // Detecta se é iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    window.addEventListener('beforeinstallprompt', handler as any);

    return () => window.removeEventListener('beforeinstallprompt', handler as any);
  }, []);

  const installPWA = async () => {
    if (promptInstall) {
      await promptInstall.prompt();
      const result = await promptInstall.userChoice;
      if (result.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
      }
      setPromptInstall(null);
    }
  };

  return { supportsPWA, promptInstall, installPWA, isIOS };
}; 