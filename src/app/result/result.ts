/// <reference path="../../../typings/tsd.d.ts" />


class ResultService {

    current = {message: 'loading result'};

    // @ngInject
    constructor(private $http:ng.IHttpService, private BACKEND) {
    }

    load(sessionId:string):ng.IHttpPromise<StudentAssessment> {
        return this.$http.get(this.BACKEND.URL + '/session/' + sessionId)
            .success((data) => {
                this.current = data;
            });
    }

}

angular.module('result', [
    'ui.router'
])
    .service('ResultService', ResultService)

    .config(function ($stateProvider) {
        $stateProvider.state('result', {
            url: '/result/:sessionId/',
            templateUrl: 'result/result.tpl.html',
            controller: function ($scope, ResultService) {
                $scope.ResultService = ResultService;
            },
            resolve: {
                result: function ($stateParams, $state:ng.ui.IStateService, ResultService:ResultService) {
                    return ResultService
                        .load($stateParams.sessionId)
                        .catch(function (response) {
                            if (response.status === 401) {
                                $state.go('login');
                            }
                        });
                }
            }
        });
    });