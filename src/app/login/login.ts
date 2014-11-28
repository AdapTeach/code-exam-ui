angular.module('login', [
    'ui.router',
    'angular-persona-jwt',
    'student.profile'
])

    .config(function ($stateProvider:ng.ui.IStateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login/login.tpl.html',
            controller: function ($scope, persona, StudentProfile:StudentProfile) {
                $scope.persona = persona;
                $scope.StudentProfile = StudentProfile;
            }
        });
    });