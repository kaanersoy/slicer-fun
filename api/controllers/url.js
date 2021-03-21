const { nanoid } = require('nanoid');
const monk = require('monk');
const urlSchema = require('../../schemas/url');
const config = require('../../config/index');
const ash = require('express-async-handler');

const db = monk(config.db_url);
const urls = db.get('urls');
urls.createIndex('slug');

const getUrlById = ash(async (req, res) => {
    const { id:slug } = req.params;

    const redirectUrl = await urls.findOne( {slug });

    res.redirect(redirectUrl.url || '404.html');
});

const createUrl = ash(async (req, res, next) => {
    let { slug, url } = req.body;

    slug = slug || nanoid(5);
    
    await urlSchema.validate({ slug, url });

    slug = slug.toLowerCase();
    
    const isUrlExist = await urls.findOne({ slug });

    if (isUrlExist) {
        throw new Error('Slug is in use. 🤦‍♂️');
    }

    const newUrl = { url, slug };

    const createdUrl = await urls.insert(newUrl);
    res.json(createdUrl);
});

module.exports = { getUrlById, createUrl };
