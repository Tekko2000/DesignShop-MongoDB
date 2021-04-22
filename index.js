const express = require('express');
const mongoose = require('mongoose');
const DesignItem = require('./models/designItem')
require('dotenv').config();
const DbUri = "mongodb+srv://supercode:supercode@fullstack.jvlme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express()
mongoose.connect(DbUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('Database connected')
    app.listen(5000, () => {
        console.log('Listening at http://localhost:5000');
    })
})
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    DesignItem.find()
        .then(result => {
            console.log(result)
            res.render('pages/index', { result })
        }).catch(err => console.log(err))
})
app.get('/add', (req, res) => {
    res.render('pages/newItem')
})

app.post('/new', (req, res) => {
    console.log(req.body)
    console.log(typeof req.body.rating)
    const newDesignItem = new DesignItem({
        product_pic_link: req.body.product_pic_link,
        link_shop: req.body.link_shop,
        product: req.body.product,
        company: req.body.company,
        price: req.body.price
    })
    newDesignItem.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
    // res.redirect('/')
})

app.get('/item/:id', (req, res) => {
    // res.send(req.params.id)
    DesignItem.findById(req.params.id)
        .then(result => {
            res.render('pages/viewItem', { result })
        }).catch(err => console.log(err))
})

app.get('/updateItem/:id', (req, res) => {
    DesignItem.findById(req.params.id)
        .then(result => {
            res.render('pages/updateItem', { result })
        }).catch(err => console.log(err))
})

// Update with Post method

app.post('/update', (req, res) => {
    // res.send(req.body)
    DesignItem.findByIdAndUpdate(req.body.id, { product_pic_link: req.body.product_pic_link, link_shop: req.body.link_shop, product: req.body.product, company: req.body.company, price: req.body.price })
        .then(result => {
            // res.send(result) Best way to test
            res.redirect('/')
        }).catch(err => console.log(err))
})

app.get('/delete/:id', (req, res) => {
    // res.send(req.params.id)
    DesignItem.findByIdAndDelete(req.params.id)
        .then(result => {
            // res.send(result)
            res.redirect('/')
        }).catch(err => console.log(err))
})