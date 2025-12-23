import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Tests', () => {

  test('GET /posts should return list of posts', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('userId');
    expect(body[0]).toHaveProperty('title');
  });

  test('GET /posts/1 should return single post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.userId).toBeDefined();
  });

  test('GET /posts/9999 should return empty object', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999');

    expect(response.status()).toBe(404);
  });

});
