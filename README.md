# Playwright bug with reuseExistingServer and node 18

This is a demo repo to for [[BUG] webServer.reuseExistingServer is broken on node 18 #24101](https://github.com/microsoft/playwright/issues/24101).

## Bug description

When setting `webServer.reuseExistingServer` to `true` on the [playwright.config.ts](/playwright.config.ts) it still executes the `webServer.command` when running on node `18.16.0`. 

It works as expected on node 16, tested with `16.19.1`. On node 16, when `webServer.reuseExistingServer` to `true`, it does NOT execute the `webServer.command`.

## Steps

To reproduce:

1) Clone this repo and using your shell of choice navigate to the root of the repo.
2) Execute `npm start`. This will build and run an angular app.
3) Once the angular app is running, execute `npm test`

When running with node `16.19.1` the output after `step 3` is:

```
> demo-app@0.0.0 test
> npx playwright test


Running 1 test using 1 worker

  ✓  1 [chromium] › example.spec.ts:3:5 › dummy test (1.8s)

  1 passed (2.6s)
```

When running with node `18.16.0` the output after `step 3` is:

```
> demo-app@0.0.0 test
> npx playwright test

[WebServer] ? Port 4200 is already in use.
Would you like to use a different port? (Y/n) [WebServer]
Error: Timed out waiting 30000ms from config.webServer.
```

As you can see, it tries to execute the `webServer.command` and then eventually times out because the port is already taken.

## Expected behavior

When running on node `18.16.0` it should NOT try to execute the `webServer.command` when `webServer.reuseExistingServer` is set to true.

## Notes

I used [nvm](https://github.com/nvm-sh/nvm) to swap between node versions whilst testing this.
