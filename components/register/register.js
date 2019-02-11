angular.module('smartdokter')
    .component('register', {
        template: require('./register.html'),
        controller: [class register {
            constructor() {
                console.log('register terbuka');
            }
        }]
    });