'use strict';

var tape = require('tape');

function getSum(){
  var sum1 = 0;
  var sums = [10, 20, 30];
  sums.forEach(function(item){
    sum1 += Number(item);
  })
  return sum1;
}

var list_input = [5, 10, 15];

function createElement(item){
  var contentAppearsInInnerHTML = item;
  return contentAppearsInInnerHTML;
};

function createElements(list_input){
  list_input.forEach(function(item){
    createElement(item);
  });
};

console.log(createElements(list_input));

// module.exports = getSum;
// module.exports = createElement;
// module.exports = createElements;

tape('getSum is a function', function(t){
  t.equal(typeof getSum, 'function');
  t.end();
});

tape('getSum returns a number', function(t){
  t.deepEqual(typeof getSum(), 'number');
  t.end();
});

tape('getSum returns the sum of the list', function(t){
  t.deepEqual(getSum(), 60);
  t.end();
});

tape('createElements is a function', function(t){
  t.deepEqual(typeof createElements, 'function');
  t.end();
});

tape('createElements iterates until the end value', function(t){
  var list_input = [5, 10, 15];
  t.deepEqual(createElements(list_input), 15);
  t.end();
});


// tape('getSum is a function', function(t){
//   t.equal(typeof getSum, 'function');
//   t.end();
// });
//
// tape('getSum returns a number', function(t){
//   t.deepEqual(typeof getSum(), 'number');
//   t.end();
// });
//
// tape('getSum returns the sum of the list', function(t){
//   t.deepEqual(getSum(), 60);
//   t.end();
// });
