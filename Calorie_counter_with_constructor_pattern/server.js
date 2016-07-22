var queries = require('./queries')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('./client'))

app.get('/meals', function(req, res){
  if (req.query.date){
    queries.getMeal(req.query.date, function(err, result){
         res.send(result);
       })
  } else {
    queries.getMeals(function(err, result){
      res.send(result);
    })
  }
});

app.post('/meals', function(req, res){
  var item = {
        name: req.body.name,
        calorie: req.body.calorie,
        date: req.body.date
    };
  queries.addMeal(item, function(err, result){
    res.send(result);
  });
});

app.delete('/meals/:id', function(req, res){
  var item = {
        status: 'ok',
        id: req.params.id,
    };
  queries.deleteMeal(req.params.id, function(err, result){
      res.send(item);
  })
});


app.listen(3000);
