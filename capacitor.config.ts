import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dailygoalsandgrub.app',
  appName: 'daily-goals-and-grub',
  webDir: 'dist',
  server: {
    url: 'https://638da5e7-5c34-4752-af0d-11da4bc4a28d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
