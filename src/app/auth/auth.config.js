angular.module('auth', [
  'ui.router',
  'angular-persona'
]).config(function ($stateProvider, $httpProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller : 'LoginCtrl as user',
    templateUrl : 'auth/auth.tpl.html'
  });
  $httpProvider.interceptors.push(function ($q) {
    return {
      request: function (httpConfig) {
        var token = localStorage.getItem('token');
        if (token) {
          httpConfig.headers['Authorization'] = 'Bearer ' + token;
        }
        return httpConfig;
      },
      responseError: function (response) {
        return $q.reject(response);
      }
    };
  });
});