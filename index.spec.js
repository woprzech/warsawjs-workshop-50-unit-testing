const supertest = require('supertest');
const app = require('./index');
describe('should check index', () => {
    it('should verify health endpoint', async () => {
        const response = await supertest(app)
            .get('/health');

        expect(response.body).toEqual({health: true});
    });
});
