const expressLoader = require('./express');
const routerLoader = require('./router');
const middlewareLoader = require('./middleware');

module.exports = (app) => {
    expressLoader(app);
    routerLoader(app);
    middlewareLoader(app);
}
