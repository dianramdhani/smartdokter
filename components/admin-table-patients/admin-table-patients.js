angular.module('smartdokter')
    .component('adminTablePatients', {
        template: require('./admin-table-patients.html'),
        controller: [class adminTablePatients {
            constructor() {
                console.log('adminTablePatients terbuka');
            }
        }]
    });