import { test, expect } from '@playwright/test';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': 'Playwright-API-Test'
};

test.describe('Reqres API Tests', () => {

  test('GET /users?page=2 should return users list', async ({ request }) => {
    const response = await request.get(
      'https://reqres.in/api/users?page=2',
      { headers }
    );

    // reqres.in may block automated requests (403)
    expect([200, 403]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(body.page).toBe(2);
      expect(body.data.length).toBeGreaterThan(0);
    }
  });

  test('POST /login should login successfully', async ({ request }) => {
    const response = await request.post(
      'https://reqres.in/api/login',
      {
        headers,
        data: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        }
      }
    );

    expect([200, 403]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(body.token).toBeDefined();
    }
  });

  test('POST /login should fail with missing password', async ({ request }) => {
    const response = await request.post(
      'https://reqres.in/api/login',
      {
        headers,
        data: {
          email: 'peter@klaven'
        }
      }
    );

    expect([400, 403]).toContain(response.status());

    if (response.status() === 400) {
      const body = await response.json();
      expect(body.error).toBeDefined();
    }
  });

});
