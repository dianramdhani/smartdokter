angular.module('smartdokter')
    .config(['$stateProvider', function ($stateProvider) {
        let states = [
            { name: 'admin.patients', url: '/patient', component: 'adminTablePatients' },
            { name: 'admin.services', url: '/service', component: 'adminTableServices' },
            { name: 'admin.registrationPatient', url: '/patient/add', component: 'adminRegistrationPatient' },
            { name: 'admin.updatePatient', url: '/patient/update/{data:json}', component: 'adminUpdatePatient' },
            { name: 'admin.addService', url: '/', component: 'adminAddService' },
            { name: 'admin.updateService', url: '/service/update/{data:json}', component: 'adminUpdateService' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);