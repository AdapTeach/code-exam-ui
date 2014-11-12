angular.module('app',[
  'ngMaterial',
  'ui.router',
  'ui.ace',
  'angular-persona-jwt',
  'auth'
]).constant('BACKEND',{
  AUTH : 'http://localhost:5011'
}).config(function($locationProvider){
  $locationProvider.html5Mode(true);
}).run(function(){

});