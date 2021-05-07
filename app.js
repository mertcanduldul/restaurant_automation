const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Blog = require('./models/blogs')

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

app.get('/eqc', (req, res) => {
    const blog = new Blog({
        title: 'Büyük Pizza',
        short: '100₺',
        long: '4 Kişilik',
        photo: './images/pz2.jpeg'
    })
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all', (req, res) => {
    Blog.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/', (req, res) => {
    Blog.find().sort({
        createdAt: -1
    }).then((result) => {
        res.render('index', {
            title: 'ANASAYFA',
            blogs: result
        })
    })
})

app.get('/blog/:id', (req, res) => {
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

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT US'
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/blog', (req, res) => {
    res.redirect('./404')
})

app.get('/about-us', (req, res) => {
    res.redirect('./about')
})
app.get('/404', (req, res) => {
    res.render('404')
})
app.get('/admin', (req, res) => {
    Blog.find().sort({
        createdAt: -1
    }).then((result) => {
        res.render('admin', {
            blogs: result
        })
    })
})

app.get('/admin/add', (req, res) => {
    res.render('add')
})
app.post('/admin/add', (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.redirect('/admin')
    }).catch((err) => {
        console.log(err)
    })

})


app.use((req, res) => {
    res.status(404).render('404', {
        title: 'there is no place like'
    })
})