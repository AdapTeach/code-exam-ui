var DEV_BACKEND_URL = 'http://localhost:5100';
var PROD_BACKEND_URL = 'https://codexam-adapteach.rhcloud.com';
var BACKEND_URL;

if (window.location.hostname === 'localhost') {
    BACKEND_URL = DEV_BACKEND_URL;
    //BACKEND_URL = PROD_BACKEND_URL;
} else {
    BACKEND_URL = PROD_BACKEND_URL;
}

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
        persona.addLoginListener(function () {
            $mdToast.show({
                template: '<md-toast>Logged In</md-toast>'
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