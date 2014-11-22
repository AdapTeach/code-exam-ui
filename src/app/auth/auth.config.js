angular.module('auth', [
    'ui.router',
    'angular-persona-jwt'
])

    .config(function ($stateProvider, personaProvider) {
        personaProvider.config({
            baseUrl: 'http://localhost:5100',
            tokenName: 'code-exam-token'
        });
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginCtrl as user',
            templateUrl: 'auth/auth.tpl.html'
        });
    });