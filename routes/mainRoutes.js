const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.redirect('/blog')
})
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT US'
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/blog', (req, res) => {
    res.redirect('./404')
})

router.get('/about-us', (req, res) => {
    res.redirect('./about')
})
router.get('/404', (req, res) => {
    res.render('404')
})
router.use((req, res) => {
    res.status(404).render('404', {
        title: 'there is no place like'
    })
})

module.exports = router