const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/article');
const routerArticle = require('./routes/articles');
const methodOverride = require('method-override');


mongoose.connect('mongodb+srv://mrbui:mrbui123456@cluster0.jntsz.mongodb.net/nodetuts?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(result => app.listen( process.env.PORT || 5000 ))
.catch(err => console.log(err));
app.set("view engine", 'ejs');

app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
   const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', {articles});
})

app.use('/articles', routerArticle);

