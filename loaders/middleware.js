module.exports = (app) => {
    app.use(require('../api/middlewares/error'));
}