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

    /*
    * Zaimplementuj wykorzystując TDD następujące funkcjonalności:
    */

    /*
    * Pobieranie wizyt po dacie
    * - w query powinienś przesłać wartości "from" oraz "to"
    * obsłuż sytuacje, gdy:
    * - jest przesłane wyłącznie from - szukamy wszystkich wizyt od jakiejś daty
    * - jest przesłane wyłącznie to - szukamy wszystkich wizyt do jakiejś daty
    * - są przesłane obie daty - szukamy wizyt dla wskazanego okresu czasu
    * */

    /*
    * Anulowanie wizyt
    * - endpoint do tworzenia wizyt powinien zwracać id wizyty
    * - endpoint do anulowania DELETE url: /visits/:visitId
    * obsłuż sytuacje, gdy:
    * - wizyta dla wskazanego ID istnieje - usuwamy ją
    * - wizyta o wskazanym ID nie istnieje - zwracamy http status 404
    * */

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
