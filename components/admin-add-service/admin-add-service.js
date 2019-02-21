(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh admin-table-services saat menambah data service dengan a-href.
    // Creates:
    // Membuat form untuk menambah service.

    angular
        .module('smartdokter')
        .component('adminAddService', {
            template: require('./admin-add-service.html'),
            controller: adminAddServiceController,
            controllerAs: '$ctrl'
        });

    adminAddServiceController.$inject = ['$scope', '$state', 'Pasien', 'Pendaftaran'];
    function adminAddServiceController($scope, $state, Pasien, Pendaftaran) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            Pasien.getAllDataPasiens()
                .then((res) => {
                    $scope.patients = res;
                });

            $scope.addService = (data) => {
                if (typeof data !== 'undefined') {
                    // check seluruh properti tidak boleh kosong
                    const dataPropertyChecker = ['idPasien', 'nomorAntrian', 'tanggalKunjungan', 'penyakit'];
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

                    // post ke server
                    Pendaftaran.addPendaftaran(data)
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