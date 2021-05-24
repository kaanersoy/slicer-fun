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

    const redirectUrl = await urls.findOne({ slug });

    res.redirect(redirectUrl.url || '404.html');
});

const createUrl = ash(async (req, res) => {
  let { slug, url } = req.body;
  
  // Checks url is exists or additional slug sended
  const isUrlExist = await urls.findOne({ url });
  if(!slug && isUrlExist){
    return res.json(isUrlExist)
  }

  // if slug not sended with request randomizes it!
  slug = slug || nanoid(6)

  // Validate the schema
  await urlSchema.validate({ slug, url });
  
  // if slug in use throws error.
  const isSlugExist = await urls.findOne({ slug });
  if (isSlugExist) {
    throw new Error('Slug is in use. 🤦‍♂️');
  }

  const newUrl = { url, slug };

  const createdUrl = await urls.insert(newUrl);
  res.json(createdUrl);
});

module.exports = { getUrlById, createUrl };
