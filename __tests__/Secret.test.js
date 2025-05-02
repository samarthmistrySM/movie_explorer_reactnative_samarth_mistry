import Secret from '../src/secrets/Secret';

describe('Secret', () => {
    it('should have a stripePublishableKey', () => {
        expect(Secret).toHaveProperty('stripePublishableKey');
        expect(typeof Secret.stripePublishableKey).toBe('string');
    });
});