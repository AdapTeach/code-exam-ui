angular.module('auth')
  .factory('auth', function ($window, $q, $http, BACKEND) {

    var service = {};

    //service.signup = function(){
    //    var deferred = $q.defer();
    //    $http.get(BACKEND.AUTH + '/signup').success(function(user){
    //        service.loggedUser = user;
    //        deferred.resolve();
    //    });
    //    return deferred.promise;
    //};

    service.login = function (assertion) {
      var deferred = $q.defer();
      $http.post(BACKEND.AUTH + '/login', {
        assertion: assertion
      }).success(function (user) {
        service.loggedUser = user;
        deferred.resolve();
      });
      return deferred.promise;
    };

    service.logout = function () {
      $window.localStorage.removeItem('token');
      service.loggedUser = null;
    };

    service.getMe = function () {
      var deferred = $q.defer();
      $http.get(BACKEND.AUTH + '/me').success(function (user) {
        service.loggedUser = user;
        deferred.resolve();
      });
      return deferred.promise;
    };

    $window.navigator.id.watch({
      loggedInUser: service.loggedUser,
      onlogin: service.login,
      onlogout: service.logout
    });
    return service;
  });