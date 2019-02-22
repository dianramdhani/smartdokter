(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh a-href add examination di tabel patient list dokter.
    // Creates:
    // Menampilkan form add examination.

    angular
        .module('smartdokter')
        .component('dokterAddExamination', {
            template: require('./dokter-add-examination.html'),
            controller: dokterAddExaminationController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    dokterAddExaminationController.$inject = ['$scope', '$state', '$stateParams', '$q', 'Obat', 'Riwayat', 'TransaksiObat', 'Fisik'];
    function dokterAddExaminationController($scope, $state, $stateParams, $q, Obat, Riwayat, TransaksiObat, Fisik) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            // inisialisasi $scope
            $scope.dataRiwayat = {};
            $scope.dataTransaksiObat = [];
            $scope.dataExamination = $stateParams.data;

            // proses untuk form obat
            Obat.getAllObatByIdDokter()
                .then((dataObat) => {
                    $scope.dataObat = dataObat;
                });
            $scope.addObat = (data) => {
                if (data !== null) {
                    $scope.dataTransaksiObat.push(angular.fromJson(data));
                }
            };
            $scope.deleteObat = (index) => {
                $scope.dataTransaksiObat.splice(index, 1);
            };
            $scope.$watchCollection('dataTransaksiObat', (newVal) => {
                let totalBiaya = 0;
                newVal.forEach((obat) => {
                    totalBiaya = totalBiaya + obat.harga;
                });
                $scope.dataRiwayat['totalBiaya'] = totalBiaya;
            });

            $scope.addExamination = (dataRiwayat, dataTransaksiObat, dataFisik) => {
                // cek dataRiwayat
                if (!checkParams(dataRiwayat, ['diagnosa', 'tindakan', 'biayaPemeriksaan', 'totalBiaya'])) {
                    alert('Please fill in correctly!');
                    return;
                }

                // cek dataFisik
                if (!checkParams(dataFisik, ['beratBadan', 'detakJantung', 'suhu', 'tanggalData', 'tekananDarah', 'tinggiBadan'])) {
                    alert('Please fill in correctly!');
                    return;
                }

                const TEMPLATE_DATA = {
                    idPasien: $scope.dataExamination.idPasien,
                    idDokter: $scope.dataExamination.idDokter,
                    idPendaftaran: $scope.dataExamination.id
                };

                // persiapan dataTransaksiObat
                let postDataTransaksiObat = [];
                dataTransaksiObat.forEach(_dataTransaksiObat => {
                    postDataTransaksiObat.push({ idObat: _dataTransaksiObat.id, idPendaftaran: TEMPLATE_DATA.idPendaftaran })
                });

                // persiapan dataRiwayat
                dataRiwayat = Object.assign(TEMPLATE_DATA, dataRiwayat);

                // persiapan dataFisik
                dataFisik = Object.assign(TEMPLATE_DATA, dataFisik);

                // tambah data ke TransaksiObat, Riwayat, dan Fisik
                let q = [];
                postDataTransaksiObat.forEach(_dataTransaksiObat => {
                    q.push(TransaksiObat.addRiwayat(_dataTransaksiObat));
                });
                q.push(Riwayat.addRiwayat(dataRiwayat));
                q.push(Fisik.addDataFisik(dataFisik));
                $q.all(q)
                    .then(() => {
                        $state.go('dokter.patients');
                    });

                /**
                 * Cek parameter di object.
                 * @param {Object} data - Data yang di cek.
                 * @param {Array} propertyCheckers - Parameter di object data.
                 * @returns {Boolean} - True jika seluruh parameter di object terpenuhi dan sebaliknya.
                 */
                function checkParams(data, propertyCheckers) {
                    if (typeof data !== 'undefined') {
                        for (const property of propertyCheckers) {
                            if (data.hasOwnProperty(property)) {
                                if (data[property] === '') {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            };

        };
    }
})();