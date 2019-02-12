angular.module('smartdokter')
    .component('adminAddService', {
        template: require('./admin-add-service.html'),
        controller: [class adminAddService {
            constructor() {
                console.log('adminAddService terbuka');
            }
        }]
    });