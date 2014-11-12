angular.module('angular-persona-jwt', []).config(function ($httpProvider) {
  $httpProvider.interceptors.push(function ($q) {
    return {
      request: function (httpConfig) {
        var token = localStorage.getItem('token');
        if (token) {
          httpConfig.headers.Authorization = 'Bearer ' + token;
        }
        return httpConfig;
      },
      responseError: function (response) {
        return $q.reject(response);
      }
    };
  });
}).provider('persona', function ($windowProvider) {

  var $window = $windowProvider.$get(),
    options = {
      baseUrl: 'localhost',
      audience: $window.location.href,
      tokenName: 'token'
    };
  this.config = function (data) {
    options = angular.extend(options,data);
  };

  function Persona($rootScope, $http) {
    var service = {};
    service.login = function (assertion) {
      var param = {
        assertion: assertion,
        audience: options.audience
      };
      $http.post(options.baseUrl + '/login', param).success(function (data) {
        service.loggedUser = data.user;
        $window.localStorage.setItem(options.tokenName, data.token);
      }).error(function (err) {
        $rootScope.$broadcast('login:error', err);
      });
    };

    service.logout = function () {
      $window.localStorage.removeItem(options.tokenName);
      service.loggedUser = null;
    };

    $window.navigator.id.watch({
      loggedInUser: service.loggedUser,
      onlogin: service.login,
      onlogout: service.logout
    });
    return service;
  }

  this.$get = Persona;

}).directive('personaLogin', function ($window) {

  function login() {
    console.log('log1')
    $window.navigator.id.request();
  }

  return {
    restrict: 'EA',
    scope: true,
    transclude: true,
    controller: function () {
      this.login = login;
    },
    controllerAs: 'persona',
    template: '<div ng-transclude ng-click="persona.login()"></div>'
  }
}).directive('personaLogout', function ($window) {

  function logout() {
    $window.navigator.id.logout();
  }

  return {
    restrict: 'EA',
    transclude: true,
    scope: true,
    controller: function () {
      this.logout = logout;
    },
    controllerAs: 'persona',
    template: '<div ng-transclude ng-click="persona.logout()"></div>'
  }
});