(function () {
    'use strict';

    // Usage:
    // Di panggil oleh a-href Payment di side-nav admin.
    // Creates:
    // Menghasilkan tabel pembayaran.

    angular
        .module('smartdokter')
        .component('adminTablePayments', {
            template: require('./admin-table-payments.html'),
            controller: adminTablePaymentsController,
            controllerAs: '$ctrl',
        });

    adminTablePaymentsController.$inject = ['$scope', '$state', '$q', 'Riwayat', 'Pasien', 'Pendaftaran'];
    function adminTablePaymentsController($scope, $state, $q, Riwayat, Pasien, Pendaftaran) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.data = [];
            Riwayat.getRiwayatByIdDokter()
                .then((riwayats) => {
                    riwayats.forEach((riwayat) => {
                        $q.all([
                            Pasien.getDataPasienById(riwayat.idPasien),
                            Pendaftaran.getAntriById(riwayat.idPendaftaran)
                        ])
                            .then((res) => {
                                $scope.data.push(Object.assign(riwayat, {
                                    dataPasien: res[0],
                                    dataPendaftaran: res[1]
                                }));
                            });
                    });
                    console.log($scope.data)
                });

            $scope.detailPayment = (data) => {
                $state.go('admin.detailPayment', { riwayat: data });
            };
        };
    }
})();