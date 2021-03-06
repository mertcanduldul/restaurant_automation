const express = require('express')
const router = express.Router()
const Blog=require('../models/blogs')


router.get('/admin', (req, res) => {
    Blog.find().sort({
        createdAt: -1
    }).then((result) => {
        res.render('admin',{
            blogs: result
        })
    })
})

router.get('/admin/add', (req, res) => {
    res.render('add')
})
router.post('/admin/add', (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.redirect('/admin')
    }).catch((err) => {
        console.log(err)
    })

})
router.delete('/admin/delete/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id).then((result) => {
        res.json({
            link: '/admin'
        })
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router