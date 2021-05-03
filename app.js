const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3001

app.set('view engine', 'ejs')

app.listen(PORT)

app.use(morgan('tiny'))
app.use(express.static('public'))



app.get('/', (req, res) => {
    res.render('index', {
        title: 'ANASAYFA'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'HAKKIMIZDA'
    })
})
app.get('/about-us', (req, res) => {
    res.redirect('./about')
})
app.get('/404', (req, res) => {
    res.render('404')
})
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'there is no place like'
    })
})