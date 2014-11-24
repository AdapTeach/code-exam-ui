angular.module('assessment', [
    'ui.router'
])

    .factory('Assessments', function ($http, BACKEND) {

        var Assessments = {
            current: {}
        };

        Assessments.load = function (sessionId, assessmentId) {
            $http.get(BACKEND.URL + 'session/' + sessionId + '/' + assessmentId)
                .then(function (response) {
                    console.log(response);
                });
        };

        return Assessments;

    })

    .controller('AssessmentController', function ($scope, Assessments) {
        $scope.Assessments = Assessments;
    })

    .config(function ($stateProvider) {
        $stateProvider.state('assessment', {
            url: '/:sessionId/:assessmentId',
            controller: 'AssessmentController',
            templateUrl: 'assessment/assessment.tpl.html',
            resolve: {
                assessment: function ($stateParams, Assessments) {
                    return Assessments.load($stateParams.sessionId, $stateParams.assessmentId).then(function (response) {
                        console.log(response);
                    });
                }
            }
        });
    });