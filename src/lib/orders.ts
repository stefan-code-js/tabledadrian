export interface Order {
    sessionId: string;
    priceId: string;
    mode: 'payment' | 'subscription';
}

const orders = new Map<string, Order>();

export function addOrder(order: Order) {
    orders.set(order.sessionId, order);
}

export function getOrder(sessionId: string): Order | undefined {
    return orders.get(sessionId);
}
