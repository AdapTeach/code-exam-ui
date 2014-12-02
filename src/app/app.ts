// TODO Switch automatically
//var BACKEND_URL = 'http://localhost:5100';
var BACKEND_URL = 'https://codexam-adapteach.rhcloud.com';

angular.module('app', [
    'ngMaterial',
    'ui.router',
    'ui.ace',
    'angular-persona-jwt',
    'login',
    'assessment',
    'at.assessment'
])
    .constant('BACKEND', {
        URL: BACKEND_URL
    })

    .config(function ($locationProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider, $stateProvider:ng.ui.IStateProvider, personaProvider) {
        //$locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('login');

        personaProvider.config({
            baseUrl: BACKEND_URL,
            tokenName: 'code-exam-token'
        });
    })

    .run(function (persona, $mdToast) {
        persona.addLoginListener(function (loggedUser) {
            var email = "No Email";
            if (loggedUser.email) email = loggedUser.email;
            $mdToast.show({
                template: '<md-toast>Logged in as ' + email + '</md-toast>'
            });
        });
        persona.addLogoutListener(function () {
            $mdToast.show({
                template: '<md-toast>Logged out</md-toast>'
            });
        });
        persona.addLoginFailListener(function () {
            $mdToast.show({
                template: '<md-toast>Login failed</md-toast>'
            });
        });
    });