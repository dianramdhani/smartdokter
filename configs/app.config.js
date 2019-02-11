angular.module('smartdokter')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        let states = [
            { name: 'login', url: '/login', component: 'login' },
            { name: 'register', url: '/register', component: 'register' },
            { name: 'dokter', url: '/dokter', component: 'dokter' },
            { name: 'admin', url: '/admin', component: 'admin' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);