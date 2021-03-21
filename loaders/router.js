module.exports = (app) => {
    app.use('/', require('../api/routers/url'));
}
