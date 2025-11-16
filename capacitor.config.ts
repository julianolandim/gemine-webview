import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.ca9f0bb659f746ea96d6de972793ee8c',
  appName: 'Gemini AI',
  webDir: 'dist',
  server: {
    url: 'https://ca9f0bb6-59f7-46ea-96d6-de972793ee8c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1625',
      showSpinner: true,
      spinnerColor: '#a855f7'
    }
  }
};

export default config;
