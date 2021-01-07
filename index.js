const express = require('express');
const yup = require('yup');
const monk = require('monk');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const {nanoid} = require('nanoid');

require('dotenv').config();

const {DB_URL, PORT} = process.env;
const db = require('monk')(DB_URL);
const app = express();


//MiddleWares!!!!
// app.use(yup());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));


app.get('/url/:id', (req,res) => {
    //TODO get a short url by id( using by uniqID )
})


app.get('/:id', (req,res) => {
    //TODO redirect to website
    console.log('Redirecting to Website');
})

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required()
});

app.post('/url', async (req,res,next) =>{
    
    let {slug, url} = req.body;
    try {
        await schema.validate({
            slug,
            url
        })
        if(!slug){
            slug = nanoid(6);
        }
        slug = slug.toLowerCase();
        res.json({
            slug,
            url
        })
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Port is active in ${port}`);
})