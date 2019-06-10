module.exports.html = (body, statusCode=200) => {
  return {
    headers: { 'content-type': 'text/html; charset=utf8' },
    body,
  	statusCode
  };
};

module.exports.json = (body, statusCode=200) => {
  return {
    headers: { 'content-type': 'application/json; charset=utf8' },
    body: JSON.stringify(body),
  	statusCode
  };
};

module.exports.redirect = (location, type='permanent') => {
  return {
  	headers: {
      Location: location,
    },
  	statusCode: type === 'permanent' ? 301 : 302
  };
};
