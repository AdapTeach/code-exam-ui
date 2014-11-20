angular.module('exam', [
    'ui.router'
])

    .config(function ($stateProvider) {
        $stateProvider.state('exam', {
            url: '/exam/:id',
            controller: 'ExamCtrl as exam',
            templateUrl: 'exam/exam.tpl.html'
        });
    });