import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const HOME_HEADING = "An evening written in quiet chapters";

async function acceptCookieConsent(page: Page): Promise<void> {
    const banner = page.getByRole("dialog", { name: "Curate your consent" });
    await banner.waitFor({ state: "attached", timeout: 2000 }).catch(() => undefined);
    if ((await banner.count()) === 0) {
        return;
    }
    if (await banner.isVisible()) {
        await banner.getByRole("button", { name: "Accept all" }).click();
        await expect(banner).toBeHidden();
    }
}

test.describe("homepage", () => {
    test("renders hero and passes accessibility scan", async ({ page }) => {
        await page.goto("/");
        await acceptCookieConsent(page);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(HOME_HEADING);

        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });

    test("navigates to contact from CTA", async ({ page }) => {
        await page.goto("/");
        await acceptCookieConsent(page);
        const cta = page.getByRole("link", { name: "Reserve a private table" }).first();
        await expect(cta).toHaveAttribute("href", "/contact");
        await expect(cta).toBeVisible();
        await cta.click();
        await expect(page).toHaveURL(/\/contact$/, { timeout: 60000 });
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Contact");
    });
});
