angular.module('smartdokter')
    .config(['$stateProvider', function ($stateProvider) {
        let states = [
            { name: 'dokter.patients', url: '/patient', component: 'dokterTablePatients' },
            { name: 'dokter.addTreatment', url: '/add-treatment/{data:json}', component: 'dokterAddTreatment' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);