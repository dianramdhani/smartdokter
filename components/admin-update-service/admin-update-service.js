(function () {
    'use strict';

    // Usage:
    // Dibuka oleh admin-table-services saat panggil a-href update di tabel service.
    // Creates:
    // Membuat form update data service.

    angular
        .module('smartdokter')
        .component('adminUpdateService', {
            template: require('./admin-update-service.html'),
            controller: adminUpdateServiceController,
            controllerAs: '$ctrl'
        });

    adminUpdateServiceController.$inject = ['$scope', '$state', '$stateParams', 'Pasien', 'Pendaftaran'];
    function adminUpdateServiceController($scope, $state, $stateParams, Pasien, Pendaftaran) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            Pasien.getAllDataPasiens()
                .then((res) => {
                    $scope.patients = res;
                })
                .then(() => {
                    $scope.data = angular.fromJson($stateParams.data);
                    $scope.data.tanggalKunjungan = new Date($scope.data.tanggalKunjungan);
                    $scope.data.idPasien = $scope.data.idPasien.toString();
                });

            $scope.updateService = (data) => {
                if (typeof data !== 'undefined') {
                    // check seluruh properti tidak boleh kosong
                    const dataPropertyChecker = ['id', 'idDokter', 'idPasien', 'nomorAntrian', 'penyakit', 'tanggalKunjungan'];
                    for (const property of dataPropertyChecker) {
                        if (!data.hasOwnProperty(property)) {
                            alert('Please fill in correctly!');
                            return;
                        } else {
                            if (data[property] === '' || !data[property]) {
                                alert('Please fill in correctly!');
                                return;
                            }
                        }
                    }

                    // hapus beberapa parameter
                    let _data = {};
                    dataPropertyChecker.forEach(property => {
                        _data[property] = data[property];
                    });

                    // put ke server
                    Pendaftaran.updatePendaftaran(_data)
                        .then(() => {
                            $state.go('admin.services');
                        });
                } else {
                    alert('Please fill in correctly!');
                }
            };
        };
    }
})();