const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const connection = require('./database/database')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
 
const Article = require('./articles/Article')
const Category = require('./categories/Category')

// view engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//configuração bodyparser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

connection
.authenticate()
.then(()=> {
    console.log('Conexão feita com sucesso')
}).catch((error) => {
    console.log(error)
})

//passando a rota categories vindo de outro arquivo
app.use('/',categoriesController);

app.use('/',articlesController);


app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories})
        })
       
    })
   
})


app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', {article: article, categories: categories})
            })
        }else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})


app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                console.log(category.dataValues.Articles)
              console.log(categories)
              console.log(category)
         res.render('index',{articles: categories.articles, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.listen(8080, () => {
    console.log('Servidor rodando')
})