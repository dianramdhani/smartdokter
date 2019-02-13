angular.module('smartdokter')
    .config(['$stateProvider', function ($stateProvider) {
        let states = [
            { name: 'dokter.patients', url: '/patient', component: 'dokterTablePatients' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);