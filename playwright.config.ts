import { defineConfig, devices } from '@playwright/test';

/**
 * Testes end-to-end contra o build de produção.
 *
 *   npm run build
 *   npm run test:e2e
 *
 * No CI roda em Chromium e WebKit (Safari do iPhone, de onde vem a maior parte
 * das visitas pelo Instagram). Localmente usa o Chrome instalado; WebKit com PW_WEBKIT=1.
 */
const PORT = 3400;
const ci = Boolean(process.env.CI);
const chrome = ci ? {} : { channel: 'chrome' as const };
const webkit = ci || Boolean(process.env.PW_WEBKIT);

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 1 : 0,
  // Máquina local com pouca RAM e CI de 2 núcleos: poucos navegadores ao mesmo tempo
  workers: ci ? 1 : 2,
  reporter: ci ? [['github'], ['html', { open: 'never' }]] : [['list']],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'pt-BR',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], ...chrome } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'], ...chrome } },
    ...(webkit ? [{ name: 'iphone-webkit', use: { ...devices['iPhone 15'] }, timeout: ci ? 120_000 : 60_000 }] : []),
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !ci,
    timeout: 60_000,
  },
});
