angular.module('smartdokter')
    .component('admin', {
        template: require('./admin.html'),
        controller: ['$state', class admin {
            constructor($state) {
                $state.go('admin.patients')
            }
        }]
    });