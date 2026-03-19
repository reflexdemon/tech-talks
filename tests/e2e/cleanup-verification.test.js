// Feature: project-reorganization-cleanup
const { test, expect } = require('@playwright/test');

// The app uses query-string routing (?presentation=name) for all presentations.
// site/openspec/index.html exists for GitHub Pages path routing, but locally
// serve redirects /openspec -> /openspec/ which breaks relative asset paths.
// Use query-string URLs for reliable local testing.
const PAGES = ['/', '/?presentation=java-11-to-17', '/?presentation=openspec'];

// Feature: project-reorganization-cleanup, Property 5: Zero console errors on page load
// Feature: project-reorganization-cleanup, Property 6: No 404 asset requests during page load
for (const route of PAGES) {
    test(`${route} - no console errors and no 404 asset requests`, async ({ page }) => {
        const consoleErrors = [];
        const failedRequests = [];

        page.on('console', msg => {
            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('response', response => {
            if (response.status() === 404) failedRequests.push(response.url());
        });

        await page.goto(route);
        await page.waitForLoadState('networkidle');

        expect(consoleErrors, `Console errors on ${route}`).toHaveLength(0);
        expect(failedRequests, `404 requests on ${route}`).toHaveLength(0);
    });
}

// Feature: project-reorganization-cleanup, Example: Landing page loads correctly (Req 6.3)
test('landing page title and status', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(/Tech Talks/);
});

// Feature: project-reorganization-cleanup, Property 4: All presentation routes return non-404
for (const route of ['/?presentation=java-11-to-17', '/?presentation=openspec']) {
    test(`${route} returns non-404`, async ({ page }) => {
        const response = await page.goto(route);
        expect(response.status()).not.toBe(404);
    });
}
