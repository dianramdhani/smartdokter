angular.module('smartdokter')
    .component('admin', {
        template: require('./admin.html'),
        controller: ['$location', class admin {
            constructor($location) {
                console.log('admin terbuka');
                $location.path('/admin/patient')

            }
        }]
    });