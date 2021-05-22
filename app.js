const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Blog = require('./models/blogs')

const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const mainRoutes = require('./routes/mainRoutes')

const PORT = process.env.PORT || 3001
const app = express()

const dbURL = 'mongodb+srv://mert123:mertmert@cluster0.nlmpn.mongodb.net/mybistro?retryWrites=true&w=majority';

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log('CONNECTION OK')
}).catch((err) => {
    console.log('CONNECTION ERROR')
})

app.set('view engine', 'ejs')
app.listen(PORT)

app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(express.static('images'))

app.use(express.urlencoded({
    extended: true
}))

app.use(adminRoutes)

app.use(blogRoutes)

app.use(mainRoutes)

