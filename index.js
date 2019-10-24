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
  response.headers = options.headers || {};
  response.statusCode = options.statusCode || 200;
  if (options.cookies) {
    response.headers['Set-Cookie'] = objectToCookie(options.cookies);
  }
  if (options.expires) {
    response.headers['Cache-Control'] = `max-age=${options.expires}`;
    console.log(`WARNING: options.expires is setting Cache-Control max-age to ${options.expires}`);
  }
  if (options.cache) {
    if (typeof options.cache === 'string') {
      response.headers['Cache-Control'] = options.cache;
    } else {
      const dirString = [];
      if (options.cache.maxAge) {
        dirString.push(`max-age=${options.cache.maxAge}`);
      }
      if (options.cache.sharedMaxAge) {
        dirString.push(`s-maxage=${options.cache.sharedMaxAge}`);
      }
      response.headers['Cache-Control'] = dirString.join(',');
    }
  }
  if (options.cors) {
    response.headers['Access-Control-Allow-Origin'] = '*';
  }
  return response;
};

module.exports.html = (body, options) => {
  const response = setResponse(options);
  response.headers = Object.assign({ 'Content-Type': 'text/html; charset=utf8' }, response.headers);
  response.body = body;
  return response;
};

module.exports.json = (body, options) => {
  const response = setResponse(options);
  response.headers = Object.assign({ 'Content-Type': 'application/json; charset=utf8' }, response.headers);
  response.body = JSON.stringify(body);
  return response;
};

module.exports.text = (body, options) => {
  const response = setResponse(options);
  response.headers = Object.assign({ 'Content-Type': 'text/plain; charset=utf8' }, response.headers);
  response.body = body;
  return response;
};

module.exports.redirect = (location, options = {}) => {
  const response = setResponse(options);
  response.headers = Object.assign({ Location: location }, response.headers);
  response.statusCode = options.type === 'temporary' ? 302 : 301;
  return response;
};
