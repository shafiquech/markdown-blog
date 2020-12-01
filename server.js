const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/article')
const Article = require('./models/article');
const methodOverride = require('method-override')
const app = express();

// connect to db
mongoose.connect('mongodb://root:root@localhost:27017/blog?authSource=admin', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
  console.log('MongoDB is connected.')
}).catch(err => {
  console.log('Connection unsuccessful, will retry after 5 seconds...')
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)