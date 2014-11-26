angular.module('app', [
    'ngMaterial',
    'ui.router',
    'ui.ace',
    'angular-persona-jwt',
    'auth',
    'exam',
    'assessment',
    'at.assessment'
])

    .constant('BACKEND', {
        URL: 'http://localhost:5100/'
    })

    .config(function ($locationProvider) {
        //$locationProvider.html5Mode(true);
    })

    .run(function (persona, $rootScope, $mdToast) {
        $rootScope.$watch(function () {
            return persona;
        }, function () {
            if (persona.loggedUser) {
                $mdToast.show({
                    template: '<md-toast>Logged In !!</md-toast>'
                });
            }
        }, true);
    })
;