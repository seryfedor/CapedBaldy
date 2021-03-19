var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ヒーローの帰還', alert: req.query.msg });
});

router.post('/', (req,res) => {
  // res.send('Post method...')

  console.log(req.body.message)

  var getUri = require('get-uri');
  getUri('https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage?chat_id=' + process.env.TELEGRAM_CHAT_ID + '&text=' + req.body.message)

  res.redirect(301,'/?msg=ok')
})

module.exports = router;
