export interface Order {
    sessionId: string;
    mode: "payment" | "subscription";
    priceId?: string;
    amount?: number;
    currency?: string;
    metadata?: Record<string, string>;
}

const orders = new Map<string, Order>();

export function addOrder(order: Order) {
    orders.set(order.sessionId, order);
}

export function getOrder(sessionId: string): Order | undefined {
    return orders.get(sessionId);
}
