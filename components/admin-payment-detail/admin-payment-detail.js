(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh a-href di admin-table-payments.
    // Creates:
    // Menampilkan detail payment per id Pendaftaran.

    angular
        .module('smartdokter')
        .component('adminPaymentDetail', {
            template: require('./admin-payment-detail.html'),
            controller: adminPaymentDetailController,
            controllerAs: '$ctrl'
        });

    adminPaymentDetailController.$inject = ['$scope', '$stateParams', '$q', 'Dokter', 'Pendaftaran'];
    function adminPaymentDetailController($scope, $stateParams, $q, Dokter, Pendaftaran) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.data = $stateParams.riwayat;
            $q.all([
                Dokter.getDokterById($scope.data.idDokter),
                Pendaftaran.getAntriById($scope.data.idPendaftaran)
            ])
                .then((res) => {
                    $scope.data = Object.assign($scope.data, {
                        dataDokter: res[0],
                        dataPendaftaran: res[1]
                    });
                    console.log($scope.data);
                });

        };
    }
})();