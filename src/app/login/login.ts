angular.module('auth', [
    'ui.router',
    'angular-persona-jwt'
])

    .config(function ($stateProvider:ng.ui.IStateProvider, personaProvider) {
        personaProvider.config({
            baseUrl: 'http://localhost:5100',
            tokenName: 'code-exam-token'
        });
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login/login.tpl.html',
            controller: function($scope, persona) {
                $scope.persona = persona;
            }
        });
    });