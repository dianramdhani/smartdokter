angular.module('smartdokter')
    .config(['$stateProvider', function ($stateProvider) {
        let states = [
            { name: 'dokter.patients', url: '/patient', component: 'dokterTablePatients' },
            { name: 'dokter.addExamination', url: '/add-examination/{data:json}', component: 'dokterAddExamination' },
            { name: 'dokter.resumePatient', url: '/patient/resume/{id}', component: 'resumePatient' },
            { name: 'dokter.paymentDetail', url: '/payment/detail/{riwayat:json}', component: 'paymentDetail' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);