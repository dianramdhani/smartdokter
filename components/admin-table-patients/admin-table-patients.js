(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh komponen admin saat menekan a-href patient di side bar.
    // Creates:
    // Menghasilkan tabel pasien.

    angular
        .module('smartdokter')
        .component('adminTablePatients', {
            template: require('./admin-table-patients.html'),
            controller: adminTablePatientsController,
            controllerAs: '$ctrl'
        });

    adminTablePatientsController.$inject = ['$scope', '$state', 'Pasien'];
    function adminTablePatientsController($scope, $state, Pasien) {
        var $ctrl = this;

        function updateData() {
            Pasien.getAllDataPasiens()
                .then((res) => {
                    $scope.data = res;
                });
        }

        $ctrl.$onInit = function () {
            updateData();

            $scope.update = (data) => {
                $state.go('admin.updatePatient', { data });
            };

            $scope.delete = (id) => {
                if (confirm('Are you sure?')) {
                    Pasien.deletePasienById(id)
                        .then(() => {
                            updateData();
                        });
                }
            };
        };
    }
})();