import CircuitBreaker from 'opossum';

const brokerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
};

export function createCircuitBreaker<T extends (...args: any[]) => Promise<any>>(actions: T) {
    const breaker = new CircuitBreaker(actions, brokerOptions);

    breaker.fallback(() => ({ error: 'Fallback: Payment service unavailable' }));
    breaker.on('open', () => console.warn('🔌 Circuit Open'));
    breaker.on('halfOpen', () => console.info('⚠️ Circuit Half-Open'));
    breaker.on('close', () => console.info('✅ Circuit Closed'));
    return breaker;
}
