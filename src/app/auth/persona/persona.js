angular.module('angular-persona',[

]).directive('persona',function(auth,$window){

  function login(){
    console.log('ererer')
    $window.navigator.id.request();
  }


  return {
    restrict : 'EA',
    scope : {

    },
    controller : function(){
      this.login = login;
    },
    controllerAs : 'persona',
    templateUrl : 'auth/persona/persona.tpl.html',
    link : function(scope,element,attrs){

    }
  }
});