angular.module('smartdokter')
    .config(['$stateProvider', function ($stateProvider, $urlRouterProvider) {
        let states = [
            { name: 'admin.patients', url: '/patient', component: 'adminTablePatients' },
            { name: 'admin.services', url: '/service', component: 'adminTableServices' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);