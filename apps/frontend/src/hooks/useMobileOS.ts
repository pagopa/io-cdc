import { useEffect, useState } from 'react';

export const useMobileOS = () => {
  const [os, setOS] = useState<null | 'ios' | 'android'>(null); // "ios" | "android"

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    console.log('🚀 ~ useMobileOS ~ ua:', {
      ua,
      userAgent: navigator.userAgent,
      vendor: navigator.vendor,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints,
    });

    if (/android/i.test(ua)) {
      setOS('android');
    }
    if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      // include iPadOS detection
      setOS('ios');
    }
  }, []);

  return os;
};
