(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh a-href di tabel patient dokter dan admin.
    // Creates:
    // Menampilkan tabel resume patient.

    angular
        .module('smartdokter')
        .component('resumePatient', {
            template: require('./resume-patient.html'),
            controller: resumePatientController,
            controllerAs: '$ctrl'
        });

    resumePatientController.$inject = ['$state', '$scope', '$stateParams', '$q', 'Riwayat', 'Pendaftaran', 'Pasien', 'Dokter', 'TransaksiObat', 'Obat', 'Fisik'];
    function resumePatientController($state, $scope, $stateParams, $q, Riwayat, Pendaftaran, Pasien, Dokter, TransaksiObat, Obat, Fisik) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            // untuk nama pasien di header
            Pasien.getDataPasienById(Number($stateParams.id))
                .then((dataPasien) => {
                    $scope.dataPasien = dataPasien;
                });

            // untuk tabel
            Riwayat.getRiwayatByIdPasien($stateParams.id)
                .then((dataRiwayat) => {
                    dataRiwayat.forEach(_dataRiwayat => {
                        $q.all([
                            Pendaftaran.getAntriById(_dataRiwayat.idPendaftaran),
                            Pasien.getDataPasienById(_dataRiwayat.idPasien),
                            Dokter.getDokterById(_dataRiwayat.idDokter),
                            TransaksiObat.getTransaksiObatByIdAntrian(_dataRiwayat.idPendaftaran),
                            Fisik.getFisikByIdPendaftaran(_dataRiwayat.idPendaftaran)
                        ])
                            .then((res) => {
                                _dataRiwayat = Object.assign(_dataRiwayat, {
                                    dataPendaftaran: res[0],
                                    dataPasien: res[1],
                                    dataDokter: res[2],
                                    dataTransaksiObat: res[3],
                                    dataFisik: res[4]
                                });
                                _dataRiwayat.dataTransaksiObat.forEach(_dataTransaksiObat => {
                                    Obat.getObatById(_dataTransaksiObat.idObat)
                                        .then((dataObat) => {
                                            _dataTransaksiObat = Object.assign(_dataTransaksiObat, { dataObat });
                                        });
                                });
                            });
                    });
                    $scope.data = dataRiwayat;
                });

            $scope.detailPayment = (data) => {
                $state.go(`${$state.$current.parent.name}.paymentDetail`, { riwayat: data });
            };
        };
    }
})();