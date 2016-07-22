'use strict';

var controller = (function(){

  var url = 'http://localhost:3000/meals';

  function getElements(item){
    APIfunctions.callAPI(item, 'GET', url);
  };

  function refreshElements(){
    DOMfunctions.removeItems();
    APIfunctions.callAPI(DOMfunctions.createElements, 'GET', url);
  };

  function filterElement(){
    DOMfunctions.removeItems();
    APIfunctions.callAPI(DOMfunctions.createElements, 'GET', url + '?date=' + DOMfunctions.date_filter_text.value);
  };

  function addElement(){
    var inputData = JSON.stringify({'name' : DOMfunctions.meal_text.value, 'calorie' : DOMfunctions.calories_text.value, 'date' : DOMfunctions.date_text.value});
    APIfunctions.callAPI(DOMfunctions.createElement, 'POST', url, true, inputData);
  };

  function removeElement(event){
    var id = event.target.parentNode.getAttribute("data-id");
    APIfunctions.callAPI(function() {DOMfunctions.removeItem(event.target.parentNode);}, 'DELETE', url + '/' + id, event);
  };


  return {
    getElements: getElements,
    filterElement: filterElement,
    refreshElements: refreshElements,
    addElement: addElement,
    removeElement: removeElement
  }

})();


var DOMfunctions = (function (){

  var mainListUl = document.querySelector('ul');
  var meal_text = document.querySelector('.meal_text');
  var calories_text = document.querySelector('.calories_text');
  var date_text = document.querySelector('.date_text');
  var date_filter_text = document.querySelector('.date_filter_text');
  var submit_button = document.querySelector('.submit_button');
  var filter_button = document.querySelector('.filter_button');
  var all_button = document.querySelector('.all_button');
  var sum = document.querySelector('p');
  submit_button.addEventListener('click', controller.addElement);
  all_button.addEventListener('click', controller.refreshElements);
  filter_button.addEventListener('click', controller.filterElement);

  function createElement(response){
    var newListItem = document.createElement('li');
    var deleteButton = document.createElement('button');
    mainListUl.appendChild(newListItem);
    newListItem.innerHTML = response.name + ' <span class="summa">' + response.calorie + '</span> ' + response.date;
    newListItem.appendChild(deleteButton);
    newListItem.setAttribute('data-id', response.id);
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', controller.removeElement);
    sum.innerHTML = getSum();
  };

  function createElements (response){
    response.forEach(function(response){
      createElement(response);
    });
  }

  function getSum(){
    var sum1 = 0;
    var sums = document.querySelectorAll('.summa');
    sums.forEach(function(item){
      sum1 += Number(item.textContent);
    })
    return sum1;
  }

  function removeItems(response){
    mainListUl.innerHTML = '';
  }

  function removeItem(item){
    mainListUl.removeChild(item);
    sum.innerHTML = getSum();
  }


  return {
    date_filter_text: date_filter_text,
    meal_text: meal_text,
    calories_text: calories_text,
    date_text: date_text,
    createElement: createElement,
    createElements: createElements,
    removeItems: removeItems,
    removeItem: removeItem,
    getSum: getSum,
    sum: sum
  }

})();

var APIfunctions = (function(){

  var url = 'http://localhost:3000/meals';

  function callAPI(callback, method, url, value, senddata){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var response = JSON.parse(xhr.response);
      callback(response);
    }
    xhr.open(method, url, value);
    xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
    xhr.send(senddata);
  };

  return {
    callAPI: callAPI
  }

})();

controller.getElements(DOMfunctions.createElements);
