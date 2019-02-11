angular.module('smartdokter')
    .component('adminTableServices', {
        template: require('./admin-table-services.html'),
        controller: [class adminTableServices {
            constructor() {
                console.log('adminTableServices terbuka');
            }
        }]
    });