const tap = require('tap');
const reply = require('../index');
tap.test('http', async t => {
  const r = reply.html('<body> hi </body>', 201);
  t.match(r, {
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: '<body> hi </body>',
    statusCode: 201
  });
  t.end();
});

tap.test('json', async t => {
  const r = reply.json({ packet: 'crisps' });
  t.match(r, {
    headers: { 'content-type': 'application/json; charset=utf8' },
    body:JSON.stringify({ packet: 'crisps' }),
    statusCode: 200
  });
  t.end();
});

tap.test('redirect', async t => {
  const perm = reply.redirect('https://google.com', type='permanent');
  const temp = reply.redirect('https://google.com', type='temporary');
  t.match(perm, {
    headers: {
      Location: 'https://google.com',
    },
    statusCode: 301
  });
  t.match(temp, {
    headers: {
      Location: 'https://google.com',
    },
    statusCode: 302
  });
  t.end();
});
