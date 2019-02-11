angular.module('smartdokter')
    .component('admin', {
        template: require('./admin.html'),
        controller: [class admin {
            constructor() {
                console.log('admin terbuka');
            }
        }]
    });