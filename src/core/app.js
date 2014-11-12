angular.module('app',[
  'ngMaterial',
  'ui.router',
  'ui.ace',
  'angular-persona-jwt',
  'auth',
  'exam'
]).constant('BACKEND',{
  AUTH : 'http://localhost:5011'
}).config(function($locationProvider){
  $locationProvider.html5Mode(true);
}).run(function(persona,$rootScope,$mdToast,$state){
  $rootScope.$watch(function(){
    return persona.loggedUser
  },function(loggedUser){
    if(loggedUser){
      if(loggedUser.email){
        $mdToast.show({
          template : '<md-toast>Logged In !!</md-toast>'
        });
        $state.go('exam',{ id : 5});
      }else{
        $mdToast.show({
          template : '<md-toast>error !!</md-toast>'
        });
      }
    }
  })
});