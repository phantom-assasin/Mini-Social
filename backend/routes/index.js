var express = require('express');
var router = express.Router();

const postRouter = require('./post.js')
const commentRouter = require('./comment.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/post', postRouter)
router.use('/comments', commentRouter)

module.exports = router;
