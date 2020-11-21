const supertest = require('supertest');
const app = require('./application/petclinic-controller');

const mockSend = jest.fn();
jest.mock('./infrastructure/email-service', () => {
    return jest.fn().mockImplementation(() => ({
        send: mockSend
    }));
})

describe('petclinic', () => {
    it('should create visit', async () => {
        await createVisit({pet: 'Ferdek', timestamp: 1000000});

        const visits = await fetchVisits();

        expect(visits).toEqual([{pet: 'Ferdek', timestamp: 1000000}]);
    });

    it('should send email with information about new visit', async () => {
        await createVisit({pet: 'Ferdek', timestamp: 1000000});

        expect(mockSend).toHaveBeenCalledWith('Wizyta umówiona.')
    });

    async function fetchVisits() {
        const visits = await supertest(app)
            .get('/visits');
        return visits.body;
    }

    async function createVisit(visit) {
        await supertest(app)
            .post('/visits')
            .send(visit);
    }
});
