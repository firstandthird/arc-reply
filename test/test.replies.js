const tap = require('tap');
const reply = require('../index');

tap.test('http', t => {
  const r = reply.html('<body> hi </body>', {
    statusCode: 201,
  });
  t.match(r, {
    headers: { 'Content-Type': 'text/html; charset=utf8' },
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
      'Content-Type': 'text/html; charset=utf8',
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
    headers: { 'Content-Type': 'application/json; charset=utf8' },
    body: JSON.stringify({ packet: 'crisps' }),
    statusCode: 200
  });
  t.end();
});

tap.test('text', t => {
  const r = reply.text('two pints of lager');
  t.match(r, {
    headers: { 'Content-Type': 'plain/text; charset=utf8' },
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
      'Content-Type': 'application/json; charset=utf8',
      'blah-blah': 'blah',
      'Set-Cookie': 'token=blah123'
    },
    body: '{"packet":"crisps"}',
    statusCode: 201,
  });
  t.end();
});

tap.test('redirect', t => {
  const perm = reply.redirect('https://google.com');
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
      'Content-Type': 'text/html; charset=utf8',
      'Cache-Control': 'max-age=300',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: '<body> hi </body>'
  });
  t.end();
});

tap.test('cache settings', t => {
  const seconds = 5;
  const result = reply.html('html', {
    cache: {
      maxAge: seconds,
      sharedMaxAge: seconds,
    }
  });
  const result2 = reply.html('html', {
    cache: {
      sharedMaxAge: seconds,
    }
  });
  const result3 = reply.html('html', {
    cache: {
      maxAge: seconds,
    }
  });
  const result4 = reply.html('html', {
    cache: 'no-store'
  });
  t.match(result.headers['Cache-Control'], 'max-age=5,s-maxage=5');
  t.match(result2.headers['Cache-Control'], 's-maxage=5');
  t.match(result3.headers['Cache-Control'], 'max-age=5');
  t.match(result4.headers['Cache-Control'], 'no-store');
  t.end();
});
