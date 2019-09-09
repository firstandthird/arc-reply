module.exports.html = (body, statusCode = 200, response = {}, cookie = false) => {
  response.headers = Object.assign({ 'content-type': 'text/html; charset=utf8' }, response.headers);
  response.body = body;
  response.statusCode = statusCode;
  // arc.codes will handle the 'cookie' field:
  if (cookie) {
    response.cookie = cookie;
  }
  return response;
};

module.exports.json = (body, statusCode = 200, response = {}, cookie = false) => {
  response.headers = Object.assign({ 'content-type': 'application/json; charset=utf8' }, response.headers);
  response.body = JSON.stringify(body);
  response.statusCode = statusCode;
  if (cookie) {
    response.cookie = cookie;
  }
  return response;
};

module.exports.text = (body, statusCode = 200, response = {}, cookie = false) => {
  response.headers = Object.assign({ 'content-type': 'application/text; charset=utf8' }, response.headers);
  response.body = body;
  response.statusCode = statusCode;
  if (cookie) {
    response.cookie = cookie;
  }
  return response;
};

module.exports.redirect = (location, type = 'permanent', response = {}, cookie = false) => {
  response.headers = Object.assign({ Location: location }, response.headers);
  response.statusCode = type === 'permanent' ? 301 : 302;
  if (cookie) {
    response.cookie = cookie;
  }
  return response;
};
