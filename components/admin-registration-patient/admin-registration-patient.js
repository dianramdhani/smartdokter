(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh admin-table-patients saat menambah pasien.
    // Creates:
    // Menghasilkan form untuk menambah pasien.

    angular
        .module('smartdokter')
        .component('adminRegistrationPatient', {
            template: require('./admin-registration-patient.html'),
            controller: adminRegistrationPatientController,
            controllerAs: '$ctrl'
        });

    adminRegistrationPatientController.$inject = ['$scope', '$state', 'Pasien'];
    function adminRegistrationPatientController($scope, $state, Pasien) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.register = (data) => {
                if (typeof data !== 'undefined') {
                    // check seluruh properti tidak boleh kosong
                    const dataPropertyChecker = ['alamat', 'gender', 'nama', 'tanggalDaftar', 'telefon'];
                    for (const property of dataPropertyChecker) {
                        if (!data.hasOwnProperty(property)) {
                            alert('Please fill in correctly!');
                            return;
                        } else {
                            if (data[property] === '') {
                                alert('Please fill in correctly!');
                                return;
                            }
                        }
                    }

                    // post ke server
                    Pasien.addNewDataPasien(data)
                        .then(() => {
                            $state.go('admin.patients');
                        });
                } else {
                    alert('Please fill in correctly!');
                }
            };
        };
    }
})();