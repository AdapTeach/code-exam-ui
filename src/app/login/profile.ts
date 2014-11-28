/// <reference path="../../../typings/tsd.d.ts" />

class StudentProfile {

    email:string;

    // @ngInject
    constructor(private $http:ng.IHttpService, private $window:ng.IWindowService, private BACKEND) {
    }

    save:Function = () => {
        this.$http
            .put(BACKEND_URL + '/me', {email: this.email})
            .success(() => {
                this.$window.alert('Email successfully saved')
            })
            .error((error) => {
                this.$window.alert('Error saving email : ' + error.message);
            });
    }

    load() {
        this.$http
            .get(this.BACKEND.URL + '/me')
            .success((studentProfile:any) => {
                this.email = studentProfile.studentEmail;
            });
    }

}

angular.module('student.profile', [])

    .service('StudentProfile', StudentProfile)

    .run(function (persona, StudentProfile:StudentProfile) {
        persona.addLoginListener(function (loggedUser) {
            StudentProfile.load();
        });
        persona.addLogoutListener(function () {
            StudentProfile.email = '';
        });
    });