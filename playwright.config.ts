import { defineConfig, devices } from '@playwright/test';


const webServerPort = 4200;
const host = process.env.USE_DOCKER_HOST_WEBSERVER ? `host.docker.internal` : `127.0.0.1`;
const webServerUrl = `http://${host}:${webServerPort}`;

console.log(`WebServer URL set to ${webServerUrl}`);

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
    command: `npx ng serve --port ${webServerPort}`,
    url: webServerUrl,
    reuseExistingServer: true,
    stdout: "pipe",
    timeout: 30 * 1000, // 30 secs
  },
});
