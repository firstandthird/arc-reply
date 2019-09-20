const tap = require('tap');
const reply = require('../index');

tap.test('http', t => {
  const r = reply.html('<body> hi </body>', {
    statusCode: 201,
  });
  t.match(r, {
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: '<body> hi </body>',
    statusCode: 201
  });
  t.end();
});

tap.test('http w cookies and header', t => {
  const r = reply.html('<body> hi </body>', {
    headers: { 'blah-blah': 'blah' },
    cookies: { token: { value: 'blah123', ttl: 123 }, token2: 'blah2' }
  });
  t.match(r, {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'blah-blah': 'blah',
      'Set-Cookie': 'value=blah123; ttl=123; token2=blah2'
    },
    body: '<body> hi </body>',
    statusCode: 200,
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
  const r = reply.json({ packet: 'crisps' }, {
    headers: { 'blah-blah': 'blah' },
    cookies: { token: 'blah123' },
    statusCode: 201
  });
  t.match(r, {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'blah-blah': 'blah',
      'Set-Cookie': 'token=blah123'
    },
    body: '{"packet":"crisps"}',
    statusCode: 201,
  });
  t.end();
});

tap.test('redirect', t => {
  const perm = reply.redirect('https://google.com', { type: 'permanent' });
  const temp = reply.redirect('https://google.com', { type: 'temporary' });
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
  const perm = reply.redirect('https://google.com', { type: 'permanent', headers: { 'blah-blah': 'blah' }, cookies: { token: 'blah123' } });
  const temp = reply.redirect('https://google.com', { type: 'temporary', headers: { 'blah-blah': 'blah' }, cookies: { token: 'blah123' } });
  t.match(perm, {
    headers: {
      Location: 'https://google.com',
      'blah-blah': 'blah',
      'Set-Cookie': 'token=blah123'
    },
    statusCode: 301
  });
  t.match(temp, {
    headers: {
      Location: 'https://google.com',
      'blah-blah': 'blah',
      'Set-Cookie': 'token=blah123'
    },
    statusCode: 302
  });
  t.end();
});

tap.test('other options', t => {
  const r = reply.html('<body> hi </body>', {
    cors: true,
    expires: 300
  });
  t.match(r, {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'max-age=300',
      'access-control-allow-origin': '*'
    },
    statusCode: 200,
    body: '<body> hi </body>'
  });
  t.end();
});
