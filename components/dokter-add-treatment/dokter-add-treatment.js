(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh a-href add treatment di tabel patient list dokter.
    // Creates:
    // Menampilkan form add treatment.

    angular
        .module('smartdokter')
        .component('dokterAddTreatment', {
            template: require('./dokter-add-treatment.html'),
            controller: dokterAddTreatmentController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    dokterAddTreatmentController.$inject = ['$scope', '$state', '$stateParams', '$q', 'Obat', 'Riwayat', 'TransaksiObat', 'Fisik'];
    function dokterAddTreatmentController($scope, $state, $stateParams, $q, Obat, Riwayat, TransaksiObat, Fisik) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            // inisialisasi $scope
            $scope.dataRiwayat = {};
            $scope.dataTransaksiObat = [];

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

            $scope.addTreatment = (dataRiwayat, dataTransaksiObat, dataFisik) => {
                // cek dataRiwayat
                if (!checkParams(dataRiwayat, ['diagnosa', 'tindakan', 'totalBiaya'])) {
                    alert('Please fill in correctly!');
                    return;
                }

                // cek dataFisik
                if (!checkParams(dataFisik, ['beratBadan', 'detakJantung', 'suhu', 'tanggalData', 'tekananDarah', 'tinggiBadan'])) {
                    alert('Please fill in correctly!');
                    return;
                }

                const TEMPLATE_DATA = {
                    idPasien: $stateParams.data.idPasien,
                    idDokter: $stateParams.data.idDokter,
                    idPendaftaran: $stateParams.data.id
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