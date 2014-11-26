/// <reference path="../../../typings/tsd.d.ts" />


class AssessmentService {

    current:Assessment = new Assessment();

    constructor(private $http:ng.IHttpService, private BACKEND) {
    }

    load(sessionId:string, assessmentId:string):ng.IHttpPromise<StudentAssessment> {
        return this.$http.get(this.BACKEND.URL + 'session/' + sessionId + '/' + assessmentId)
            .success((data:StudentAssessment) => this.current = data.assessment);
    }

}

angular.module('assessment', [
    'ui.router'
])
    .service('AssessmentService', AssessmentService)

    .config(function ($stateProvider) {
        $stateProvider.state('assessment', {
            url: '/:sessionId/:assessmentId',
            templateUrl: 'assessment/assessment.tpl.html',
            controller: function ($scope, AssessmentService:AssessmentService) {
                $scope.AssessmentService = AssessmentService;
            },
            resolve: {
                assessment: function ($stateParams, AssessmentService:AssessmentService) {
                    return AssessmentService.load($stateParams.sessionId, $stateParams.assessmentId);
                }
            }
        });
    });