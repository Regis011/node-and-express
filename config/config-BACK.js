
const buildURL = (version, path) => `/api/${version}/${path}`;
const DB_USER  = '<USER>';
const DB_USER_PASSWORD = '<PASSWORD>';

module.exports = {
  // DB Connnect
  DB_URL :`mongodb://${DB_USER}:${DB_USER_PASSWORD}@ds123933.mlab.com:23933/sandbox_chas`,
  PORT : 3000,
  TLS_PORT : 3003,
  CONSULTS_BASE_URL : buildURL('v1', 'consults')
}
