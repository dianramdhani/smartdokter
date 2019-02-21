(function () {
    'use strict';

    // Usage:
    // Dibuka oleh admin-table-patients dengan panggil a-href update di tabel pasien.
    // Creates:
    // Membuat form update data pasien.

    angular
        .module('smartdokter')
        .component('adminUpdatePatient', {
            template: require('./admin-update-patient.html'),
            controller: adminUpdatePatientController,
            controllerAs: '$ctrl'
        });

    adminUpdatePatientController.$inject = ['$scope', '$stateParams', '$state', 'Pasien'];
    function adminUpdatePatientController($scope, $stateParams, $state, Pasien) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.data = angular.fromJson($stateParams.data);
            $scope.data.tanggalDaftar = new Date($scope.data.tanggalDaftar);

            $scope.update = (data) => {
                if (typeof data !== 'undefined') {
                    // check seluruh properti tidak boleh kosong
                    const dataPropertyChecker = ['alamat', 'gender', 'nama', 'tanggalDaftar', 'telefon'];
                    for (const property of dataPropertyChecker) {
                        if (!data.hasOwnProperty(property)) {
                            return;
                        } else {
                            if (data[property] === '') {
                                return;
                            }
                        }
                    }

                    // put ke server
                    Pasien.updatePasien(data)
                        .then(() => {
                            $state.go('admin.patients');
                        });
                }
            };
        };
    }
})();