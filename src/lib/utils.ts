export function formatCurrency(amount: number, currency = 'EUR'): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
