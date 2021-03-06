var express = require('express');
var mongodb = require('mongodb');
var db = require('monk')('mongodb://quangcuong0808:kiwihoabattu95@ds011890.mlab.com:11890/simpleapp');
var router = express.Router();
var data = null;
var tasks = db.get('tasks');


/* GET home page. */
/*=======================================*/
router.get('/', function(req, res, next) {
	tasks.find( { todo: { $exists: true } }, function(err, docs){
		if (err) { console.log(err)}
		else {
			res.render('index', { title: docs });	
		}

	});
});

router.post('/add', function(req, res, next) {
	tasks.insert({todo:req.body.taskInput, deadline:req.body.deadline});
    res.redirect('/');

});

router.get('/del/:id', function(req, res, next) {
	tasks.remove({ _id: req.params.id});
	console.log("Request: " + req.params.id);
    res.redirect('/');

});


module.exports = router;
