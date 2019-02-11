angular.module('smartdokter')
    .component('dokter', {
        template: require('./dokter.html'),
        controller: [class dokter {
            constructor() {
                console.log('dokter terbuka');
            }
        }]
    });