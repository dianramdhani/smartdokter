angular.module('smartdokter')
    .component('login', {
        template: require('./login.html'),
        controller: [class login {
            constructor() {
                console.log('login terbuka');
            }
        }]
    });