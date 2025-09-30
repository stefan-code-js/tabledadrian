import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const HOME_HEADING = "An evening written in quiet chapters";

test.describe("homepage", () => {
    test("renders hero and passes accessibility scan", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(HOME_HEADING);

        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });

    test("navigates to contact from CTA", async ({ page }) => {
        await page.goto("/");
        const cta = page.getByRole("link", { name: "Reserve a private table" }).first();
        await expect(cta).toHaveAttribute("href", "/contact");
        await expect(cta).toBeVisible();
        await Promise.all([
            page.waitForURL(/\/contact$/),
            cta.click(),
        ]);
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Contact");
    });
});
