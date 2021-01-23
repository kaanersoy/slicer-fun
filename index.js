const express = require('express');
const yup = require('yup');
const monk = require('monk');
const cors = require('cors');
const morgan = require('morgan');
const {nanoid} = require('nanoid');

require('dotenv').config();

const {DB_URL, PORT} = process.env;

//DB CONNECTION
const db = monk(DB_URL);
const urls = db.get('urls');
urls.createIndex('slug');

const app = express();

//MiddleWares!!!!
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get('/404', (req,res) => {
    res.redirect('404.html');
})

app.get('/:id', async (req,res) => {
    const { id:slug } = req.params;
    try {
        const redirectUrl = await urls.findOne({slug});
        if(redirectUrl){
            res.redirect(redirectUrl.url);
        }
        res.redirect('404.html');
    } catch (err) {
        res.redirect('404.html');
    }
})

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required()
});

app.post('/url', async (req,res,next) =>{
    let {slug, url} = req.body;
    try {
        if(!slug){
            slug = nanoid(5);
        }
        await schema.validate({
            slug,
            url
        })
        slug = slug.toLowerCase();
        const isExist = await urls.findOne({ slug });
        if(isExist) {
            throw new Error('Slug is in use. 🤦‍♂️');
        }
        const newUrl = {
            url,
            slug,
        }
        const created = await urls.insert(newUrl);
        res.json(created);
    } catch (error) {
        next(error);
    }
})

app.use((error, req, res, next) => {
    if(error.status){
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV == 'production'  ? '❤' : error.stack,
    })
});

const port = PORT || 5000;
app.listen(port, () => {
    console.log(`Port is active in ${port}`);
})