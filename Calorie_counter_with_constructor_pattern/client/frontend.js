'use strict';

function Controller(url){
  this.url = url;
};

  Controller.prototype.getElements = function(item){
    API1.callAPI(item, 'GET', this.url);
  };

  Controller.prototype.refreshElements = function(item){
    DOM1.removeItems();
    API1.callAPI(DOM1.createElements, 'GET', this.url);
  };

  Controller.prototype.filterElement = function(item){
    DOM1.removeItems();
    API1.callAPI(DOM1.createElements, 'GET', this.url + '?date=' + DOM1.date_filter_text.value);
  };

  Controller.prototype.addElement = function(){
    var inputData = JSON.stringify({'name' : DOM1.meal_text.value, 'calorie' : DOM1.calories_text.value, 'date' : DOM1.date_text.value});
    API1.callAPI(DOM1.createElement, 'POST', this.url, true, inputData);
  };

  Controller.prototype.removeElement = function(event){
    var id = event.target.parentNode.getAttribute("data-id");
    API1.callAPI(function() {DOM1.removeItem(event.target.parentNode);}, 'DELETE', this.url + '/' + id, event)
  };

var controller1 = new Controller('http://localhost:3000/meals');


function DOMfunctions(){
  this.mainListUl = document.querySelector('ul');
  this.meal_text = document.querySelector('.meal_text');
  this.calories_text = document.querySelector('.calories_text');
  this.date_text = document.querySelector('.date_text');
  this.date_filter_text = document.querySelector('.date_filter_text');
  this.submit_button = document.querySelector('.submit_button');
  this.filter_button = document.querySelector('.filter_button');
  this.all_button = document.querySelector('.all_button');
  this.sum = document.querySelector('p');
  this.submit_button.addEventListener('click', addElement);
  this.all_button.addEventListener('click', refreshElements);
  this.filter_button.addEventListener('click', filterElement);
};

  function addElement() {
    controller1.addElement();
  };

  function refreshElements() {
    controller1.refreshElements();
  };

  function filterElement() {
    controller1.filterElement();
  };

  DOMfunctions.prototype.createElement = function(response){
    var mainListUl = document.querySelector('ul');
    var newListItem = document.createElement('li');
    var deleteButton = document.createElement('button');
    var sum = document.querySelector('p');
    mainListUl.appendChild(newListItem);
    newListItem.innerHTML = response.name + ' <span class="summa">' + response.calorie + '</span> ' + response.date;
    newListItem.appendChild(deleteButton);
    newListItem.setAttribute('data-id', response.id);
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', removeElement);
    sum.innerHTML = DOM1.getSum();
  };

  function removeElement(event) {
    controller1.removeElement(event);
  };

  DOMfunctions.prototype.createElements = function(response, summa){
    response.forEach(function(response){
      DOM1.createElement(response, summa);
    });
  }

  DOMfunctions.prototype.getSum = function(){
    var _this = this;
    this.sum1 = 0;
    this.sums = document.querySelectorAll('.summa');
    this.sums.forEach(function(item){
      _this.sum1 += Number(item.textContent);
    })
    return this.sum1;
  }

  DOMfunctions.prototype.removeItems = function(response){
    this.mainListUl.innerHTML = '';
  };

  DOMfunctions.prototype.removeItem = function(item){
    this.mainListUl.removeChild(item);
    this.sum.innerHTML = DOM1.getSum();
  };

var DOM1 = new DOMfunctions()

function APIfunctions(url){
  this.url = url;
}


  APIfunctions.prototype.callAPI = function(callback, methodDiff, url, valueDiff, senddata){
    this.methodDiff = methodDiff;
    this.url = url;
    this.valueDiff = valueDiff;
    this.senddata = senddata;
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var response = JSON.parse(xhr.response);
      callback(response);
    }
    xhr.open(this.methodDiff, this.url, this.valueDiff);
    xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
    xhr.send(this.senddata);
  };


var API1 = new APIfunctions("http://localhost:3000/meals")

controller1.getElements(DOM1.createElements);
