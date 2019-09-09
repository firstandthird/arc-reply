const tap = require('tap');
const reply = require('../index');

tap.test('http', t => {
  const r = reply.html('<body> hi </body>', 201);
  t.match(r, {
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: '<body> hi </body>',
    statusCode: 201
  });
  t.end();
});

tap.test('http w cookies and header', t => {
  const r = reply.html('<body> hi </body>', 201, { headers: { 'blah-blah': 'blah' } }, 'token=blah123');
  t.match(r, {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'blah-blah': 'blah'
    },
    body: '<body> hi </body>',
    statusCode: 201,
    cookie: 'token=blah123'
  });
  t.end();
});

tap.test('json', t => {
  const r = reply.json({ packet: 'crisps' });
  t.match(r, {
    headers: { 'content-type': 'application/json; charset=utf8' },
    body: JSON.stringify({ packet: 'crisps' }),
    statusCode: 200
  });
  t.end();
});

tap.test('text', t => {
  const r = reply.text('two pints of lager');
  t.match(r, {
    headers: { 'content-type': 'application/text; charset=utf8' },
    body: 'two pints of lager',
    statusCode: 200
  });
  t.end();
});

tap.test('json w cookies and header', t => {
  const r = reply.json({ packet: 'crisps' }, 200, { headers: { 'blah-blah': 'blah' } }, 'token=blah123');
  t.match(r, {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'blah-blah': 'blah'
    },
    body: '{"packet":"crisps"}',
    statusCode: 200,
    cookie: 'token=blah123'
  });
  t.end();
});

tap.test('redirect', t => {
  const perm = reply.redirect('https://google.com', 'permanent');
  const temp = reply.redirect('https://google.com', 'temporary');
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

tap.test('redirect w cookies and header', t => {
  const perm = reply.redirect('https://google.com', 'permanent', { headers: { 'blah-blah': 'blah' } }, 'token=blah123');
  const temp = reply.redirect('https://google.com', 'temporary', { headers: { 'blah-blah': 'blah' } }, 'token=blah123');
  t.match(perm, {
    headers: {
      Location: 'https://google.com', 'blah-blah': 'blah'
    },
    statusCode: 301,
    cookie: 'token=blah123'
  });
  t.match(temp, {
    headers: {
      Location: 'https://google.com', 'blah-blah': 'blah'
    },
    statusCode: 302,
    cookie: 'token=blah123'
  });
  t.end();
});
