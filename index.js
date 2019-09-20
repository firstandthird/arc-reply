const objectToCookie = (obj) => {
  const cookies = [];
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      Object.keys(obj[key]).forEach(subkey => {
        cookies.push(`${subkey}=${obj[key][subkey]}`);
      });
    } else {
      cookies.push(`${key}=${obj[key]}`);
    }
  });
  return cookies.join('; ');
};

const setResponse = (options = {}) => {
  const response = {};
  response.headers = options.headers;
  response.statusCode = options.statusCode || 200;
  if (options.cookies) {
    response.headers['Set-Cookie'] = objectToCookie(options.cookies);
  }
  if (options.expires) {
    response.headers['cache-control'] = `max-age=${options.expires}`;
  }
  if (options.cors) {
    response.headers['access-control-allow-origin'] = '*';
  }
  return response;
};

module.exports.html = (body, options) => {
  const response = setResponse(options);
  response.headers = Object.assign({ 'content-type': 'text/html; charset=utf8' }, response.headers);
  response.body = body;
  return response;
};

module.exports.json = (body, options) => {
  const response = setResponse(options);
  response.headers = Object.assign({ 'content-type': 'application/json; charset=utf8' }, response.headers);
  response.body = JSON.stringify(body);
  return response;
};

module.exports.text = (body, options) => {
  const response = setResponse(options);
  response.headers = Object.assign({ 'content-type': 'application/text; charset=utf8' }, response.headers);
  response.body = body;
  return response;
};

module.exports.redirect = (location, options) => {
  const response = setResponse(options);
  response.headers = Object.assign({ Location: location }, response.headers);
  response.statusCode = options.type === 'permanent' ? 301 : 302;
  return response;
};
