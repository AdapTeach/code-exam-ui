angular.module('exam', [
    'ui.router'
])

    .config(function ($stateProvider) {
        $stateProvider.state('exam', {
            url: '/exam/:examId/:assessmentId',
            controller: 'ExamCtrl as exam',
            templateUrl: 'exam/exam.tpl.html'
        });
    });