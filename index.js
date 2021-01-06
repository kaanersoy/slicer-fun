const express = require('express');
const yup = require('yup');
const monk = require('monk');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//MiddleWares!!!!
// app.use(yup());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static("public"));


// app.get('/url/:id', (req,res) => {
//     //TODO get a short url by id( using by uniqID )
// })


// app.get('/:id', (req,res) => {
//     //TODO redirect to website
//     console.log('Redirecting to Website');
// })

// app.post('/url', (req,res) =>{
//     const {url, id} = req.body;
//     console.log(url,id);
//     res.send("url is okey");
//     res.status(400);
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Port is active in ${port}`);
})