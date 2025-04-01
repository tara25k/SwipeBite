import { processData } from '.././APIService';  

const mockData = {
    restaurants: [
    { name: 'Pizza Palace', rating: { count: 50, starRating: 4.5 }, cuisines: [{ name: 'Italian' }], address: { city: 'London', firstLine: '123 Main St' } },
    { name: 'Burger Haven', rating: { count: 10, starRating: 3.8 }, cuisines: [{ name: 'American' }, { name: 'Burgers' }], address: { city: 'London', firstLine: '132 Fake St' } },
    { name: 'Sushi Spot', rating: { count: 5, starRating: 4.9 }, cuisines: [{ name: 'Japanese' }, { name: 'Sushi' }], address: { city: 'London', firstLine: '2 London Rd' } },
    { name: 'No Reviews Cafe', rating: { count: 0, starRating: 0 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    { name: 'Mock data', rating: { count: 50, starRating: 2 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    { name: 'Mock data', rating: { count: 50, starRating: 2 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    { name: 'Mock data', rating: { count: 50, starRating: 2 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    { name: 'Mock data', rating: { count: 50, starRating: 2 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    { name: 'Mock data', rating: { count: 50, starRating: 2 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    { name: 'Mock data', rating: { count: 50, starRating: 2 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    { name: 'Mock data', rating: { count: 50, starRating: 2 }, cuisines: [{ name: 'Cafe' }], address: { city: 'London', firstLine: '10 Pine St' } },
    ],
}

describe('processData', () => {

    test('filters restaurants by selected cuisines', async () => {
      const result = await processData(false, 3, ['Japanese'], mockData);
      console.log(result)
      expect(result).toEqual([
        expect.objectContaining({ name: 'Sushi Spot' }),
      ]);
    });

    test('returns all restaurants if no cuisine filter is applied', async () => {
      const result = await processData(false, 3, [], mockData);
      expect(result.length).toBe(3); 
    });

    test('sorts by rating when sortByRating is true', async () => {
      const result = await processData(true, 3, [], mockData);
      expect(result.map(r => r.name)).toEqual(['Sushi Spot', 'Pizza Palace', 'Burger Haven']);
    });

    test('sorts by numReviews when sortByRating is false', async () => {
      const result = await processData(false, 3, [], mockData);
      expect(result.map(r => r.name)).toEqual(['Pizza Palace', 'Burger Haven', 'Sushi Spot']);
    });

    test('sorts by numReviews when sortByRating is false', async () => {
        const result = await processData(false, 0, [], mockData);
        console.log(result)
        expect(result.length).toBe(10); // Should return only the first 10
    });
});
