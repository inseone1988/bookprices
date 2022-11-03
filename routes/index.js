var express = require('express');
var router = express.Router();
const processor = require('../controllers/processor');

/* GET home page. */
router.get('/', function(req, res, next){
    res.render("index",{title : "Express"});
});

router.get('/generate',processor.makePriceBook);
router.get('/careers',processor.displayCareers);

router.get('/bookpackages',processor.searchBookPackage);
router.post('/bookpackages',processor.updateBook)

module.exports = router;
