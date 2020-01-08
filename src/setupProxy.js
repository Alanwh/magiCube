const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:3001/api/',
      changeOrigin: true,
    })
  );
  app.use(
    '/rp2',
    proxy({
      // target: 'http://10.208.251.145/app/mock/43/',
      target: 'http://10.93.153.51:8080/',
      // target: 'http://10.93.147.119:8080/',
      pathRewrite: {
        '^/rp2': '/'
      },
      changeOrigin: true,
    })
  );
};