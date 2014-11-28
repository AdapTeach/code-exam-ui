angular.module('login', [
    'ui.router',
    'angular-persona-jwt'
])

    .config(function ($stateProvider:ng.ui.IStateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login/login.tpl.html',
            controller: function ($scope, persona) {
                $scope.persona = persona;
            }
        });
    });