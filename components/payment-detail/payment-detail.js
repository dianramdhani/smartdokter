(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh a-href di admin-table-payments dan resume-patient saat melihat detail payment dengan parameter Riwayat pasien.
    // Creates:
    // Menampilkan detail payment per id Pendaftaran.

    angular
        .module('smartdokter')
        .component('paymentDetail', {
            template: require('./payment-detail.html'),
            controller: paymentDetailController,
            controllerAs: '$ctrl'
        });

    paymentDetailController.$inject = ['$scope', '$stateParams', '$q', 'Dokter', 'Pendaftaran', 'TransaksiObat', 'Obat', 'Fisik'];
    function paymentDetailController($scope, $stateParams, $q, Dokter, Pendaftaran, TransaksiObat, Obat, Fisik) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.data = $stateParams.riwayat;
            $q.all([
                Dokter.getDokterById($scope.data.idDokter),
                Pendaftaran.getAntriById($scope.data.idPendaftaran),
                TransaksiObat.getTransaksiObatByIdAntrian($scope.data.idPendaftaran),
                Fisik.getFisikByIdPendaftaran($scope.data.idPendaftaran)
            ])
                .then((res) => {
                    $scope.data = Object.assign($scope.data, {
                        dataDokter: res[0],
                        dataPendaftaran: res[1],
                        dataTransaksiObat: res[2],
                        dataFisik: res[3]
                    });
                    $scope.data.dataTransaksiObat.forEach(_dataTransaksiObat => {
                        Obat.getObatById(_dataTransaksiObat.idObat)
                            .then((dataObat) => {
                                _dataTransaksiObat = Object.assign(_dataTransaksiObat, { dataObat });
                            });
                    });
                });

        };
    }
})();