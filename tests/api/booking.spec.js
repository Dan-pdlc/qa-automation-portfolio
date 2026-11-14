const { test, expect } = require('@playwright/test');

const reserva = {
  firstname: 'Daniel',
  lastname: 'Plasencia',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Desayuno',
};

const cabeceras = { 'Content-Type': 'application/json', Accept: 'application/json' };

test.describe.configure({ mode: 'serial' });

test.describe('API de reservas (CRUD)', () => {
  let token;
  let bookingId;

  test('TC-API-01 genera un token con credenciales válidas', async ({ request }) => {
    const res = await request.post('/auth', {
      headers: cabeceras,
      data: { username: 'admin', password: 'password123' },
    });
    expect(res.status()).toBe(200);
    const cuerpo = await res.json();
    expect(cuerpo.token).toBeTruthy();
    token = cuerpo.token;
  });

  test('TC-API-02 no entrega token con credenciales inválidas', async ({ request }) => {
    const res = await request.post('/auth', {
      headers: cabeceras,
      data: { username: 'admin', password: 'incorrecta' },
    });
    const cuerpo = await res.json();
    expect(cuerpo.token).toBeUndefined();
    expect(cuerpo.reason).toBe('Bad credentials');
  });

  test('TC-API-03 crea una reserva y devuelve su identificador', async ({ request }) => {
    const res = await request.post('/booking', { headers: cabeceras, data: reserva });
    expect(res.status()).toBe(200);
    const cuerpo = await res.json();
    expect(cuerpo.bookingid).toBeGreaterThan(0);
    expect(cuerpo.booking).toMatchObject(reserva);
    bookingId = cuerpo.bookingid;
  });

  test('TC-API-04 consulta la reserva creada', async ({ request }) => {
    const res = await request.get(`/booking/${bookingId}`, { headers: cabeceras });
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject(reserva);
  });

  test('TC-API-05 actualiza la reserva con token', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, {
      headers: { ...cabeceras, Cookie: `token=${token}` },
      data: { ...reserva, totalprice: 200 },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).totalprice).toBe(200);
  });

  test('TC-API-06 rechaza la actualización sin token', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, {
      headers: cabeceras,
      data: { ...reserva, totalprice: 999 },
    });
    expect(res.status()).toBe(403);
  });

  test('TC-API-07 elimina la reserva y ya no existe', async ({ request }) => {
    const borrar = await request.delete(`/booking/${bookingId}`, {
      headers: { ...cabeceras, Cookie: `token=${token}` },
    });
    expect(borrar.status()).toBe(201);

    const consulta = await request.get(`/booking/${bookingId}`, { headers: cabeceras });
    expect(consulta.status()).toBe(404);
  });

  test('TC-API-08 responde 404 ante un identificador inexistente', async ({ request }) => {
    const res = await request.get('/booking/99999999', { headers: cabeceras });
    expect(res.status()).toBe(404);
  });
});

test.describe('API de reservas (lectura)', () => {
  test('TC-API-09 lista las reservas con identificadores numéricos', async ({ request }) => {
    const res = await request.get('/booking', { headers: cabeceras });
    expect(res.status()).toBe(200);
    const lista = await res.json();
    expect(Array.isArray(lista)).toBe(true);
    expect(lista.length).toBeGreaterThan(0);
    expect(typeof lista[0].bookingid).toBe('number');
  });

  test('TC-API-10 filtra reservas por apellido', async ({ request }) => {
    const res = await request.get('/booking', {
      headers: cabeceras,
      params: { lastname: 'Brown' },
    });
    expect(res.status()).toBe(200);
    expect(Array.isArray(await res.json())).toBe(true);
  });
});
