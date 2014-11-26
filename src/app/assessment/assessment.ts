/// <reference path="../../../typings/tsd.d.ts" />

class CompilationUnit {
    name:string;
    code:string;
}

class Assessment {
    compilationUnits:Array<CompilationUnit>;
}

class Assessments {

    current:Assessment = new Assessment();

    constructor(private $http:ng.IHttpService, private BACKEND) {
    }

    load(sessionId:string, assessmentId:string):ng.IHttpPromise<Assessment> {
        return this.$http.get(this.BACKEND.URL + 'session/' + sessionId + '/' + assessmentId)
            .success((assessment:Assessment) => this.current = assessment);
    }

}

angular.module('assessment', [
    'ui.router'
])

    .service('Assessments', Assessments)

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
                    return Assessments.load($stateParams.sessionId, $stateParams.assessmentId)
                        .then(function () {
                            console.log(Assessments.current);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
    });