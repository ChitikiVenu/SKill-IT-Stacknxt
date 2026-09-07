import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    // The app freezes its decorative CSS/framer-motion animations under
    // prefers-reduced-motion (see src/index.css); requesting it here keeps
    // continuously-animating cards (e.g. .course-card's float loop) from
    // making Playwright's element-stability check flake.
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});
