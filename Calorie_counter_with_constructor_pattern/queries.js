var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'monochrome',
  database: 'calorie_counter'
});

connection.connect();


function getMeals(cb){
  connection.query('SELECT * from meals', function(err, result){
    cb(err, result);
  })
};

function getMeal(item, cb){
    connection.query("SELECT * from meals WHERE date = ?", item, function(err, result){
    cb(err, result);
  })
};

function addMeal(item, cb){
  connection.query("INSERT INTO meals SET ?", item, function(err, result){
    addedItem = {
        status : "ok",
        id : result.insertId,
        name : item.name,
        calorie : item.calorie,
        date : item.date
    };
    cb(err, addedItem);
  });
}

function deleteMeal(item, cb){
  connection.query('DELETE from meals WHERE id = ?', item, function (err, result){
    cb(err, result);
  });
}

module.exports = {
  getMeals: getMeals,
  getMeal: getMeal,
  addMeal: addMeal,
  deleteMeal: deleteMeal
};
