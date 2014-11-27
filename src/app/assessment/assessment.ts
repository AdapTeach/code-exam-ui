/// <reference path="../../../typings/tsd.d.ts" />


class AssessmentService {

    current:{
        raw:Assessment;
        edited:Assessment;
    };
    sessionId:string;
    latestSubmission:Submission;

    constructor(private $http:ng.IHttpService, private $window:ng.IWindowService, private BACKEND) {
    }

    load(sessionId:string, assessmentId:string):ng.IHttpPromise<StudentAssessment> {
        return this.$http.get(this.BACKEND.URL + 'session/' + sessionId + '/' + assessmentId)
            .success((data:StudentAssessment) => {
                this.sessionId = sessionId;
                this.latestSubmission = data.latestSubmission;
                var raw = data.assessment;
                var edited = angular.copy(data.assessment);
                edited.compilationUnitsToSubmit = angular.copy(this.latestSubmission.compilationUnits);
                this.current = {
                    raw: raw,
                    edited: edited
                }
            });
    }

    submit:Function = (submission:Submission) => {
        this.$http.post(this.BACKEND.URL + 'session/' + this.sessionId + '/' + this.current.edited.id, submission)
            .success((submissionResult:SubmissionResult) => {
                this.$window.alert('Submission successfully saved');
                this.latestSubmission = submissionResult;
            })
            .error((error) => {
                this.$window.alert(error);
            });
    };

    reset:Function = () => {
        this.current.edited.compilationUnitsToSubmit = this.current.raw.compilationUnitsToSubmit;
    };

}

angular.module('assessment', [
    'ui.router'
])
    .service('AssessmentService', AssessmentService)

    .config(function ($stateProvider) {
        $stateProvider.state('assessment', {
            url: '/:sessionId/:assessmentId',
            templateUrl: 'assessment/assessment.tpl.html',
            controller: function ($scope, AssessmentService) {
                $scope.AssessmentService = AssessmentService;
            },
            resolve: {
                assessment: function ($stateParams, $state:ng.ui.IStateService, AssessmentService:AssessmentService) {
                    return AssessmentService
                        .load($stateParams.sessionId, $stateParams.assessmentId)
                        .catch(function (response) {
                            if (response.status === 401) {
                                $state.go('login');
                            }
                        });
                }
            }
        });
    });