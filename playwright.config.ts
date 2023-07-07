import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: 'list',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npx ng serve --port 4200`,
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: true,
    stdout: "pipe",
    timeout: 30 * 1000, // 30 secs
  },
});
