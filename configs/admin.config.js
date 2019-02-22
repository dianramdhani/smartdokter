angular.module('smartdokter')
    .config(['$stateProvider', function ($stateProvider) {
        let states = [
            { name: 'admin.patients', url: '/patient', component: 'adminTablePatients' },
            { name: 'admin.services', url: '/service', component: 'adminTableServices' },
            { name: 'admin.registrationPatient', url: '/patient/add', component: 'adminRegistrationPatient' },
            { name: 'admin.updatePatient', url: '/patient/update/{data:json}', component: 'adminUpdatePatient' },
            { name: 'admin.addService', url: '/service/add', component: 'adminAddService' },
            { name: 'admin.updateService', url: '/service/update/{data:json}', component: 'adminUpdateService' },
            { name: 'admin.obats', url: '/obat', component: 'adminTableObat' },
            { name: 'admin.addObat', url: '/obat/add', component: 'adminAddObat' },
            { name: 'admin.payments', url: '/payment', component: 'adminTablePayments' },
            { name: 'admin.paymentDetail', url: '/payment/detail/{riwayat:json}', component: 'paymentDetail' },
            { name: 'admin.resumePatient', url: '/patient/resume/{id}', component: 'resumePatient' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);