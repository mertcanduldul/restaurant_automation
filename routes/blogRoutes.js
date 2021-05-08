const express = require('express')
const router = express.Router()
const Blog = require('../models/blogs')


router.get('/blog', (req, res) => {
    Blog.find().sort({
        createdAt: -1
    }).then((result) => {
        res.render('index', {
            title: 'ANASAYFA',
            blogs: result
        })
    })

})

router.get('/blog/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id).then((result) => {
        res.render('blog', {
            blog: result,
            title: 'Detay'
        })
    }).catch((err) => {
        console.log(err)
    })
})
module.exports = router