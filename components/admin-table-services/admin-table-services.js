(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh komponen admin saat menekan a-href service di side bar.
    // Creates:
    // Menghasilkan tabel service.

    angular
        .module('smartdokter')
        .component('adminTableServices', {
            template: require('./admin-table-services.html'),
            controller: adminTableServicesController,
            controllerAs: '$ctrl'
        });

    adminTableServicesController.$inject = ['$scope', '$q', '$state', 'Pendaftaran', 'Pasien', 'Dokter', 'Riwayat'];
    function adminTableServicesController($scope, $q, $state, Pendaftaran, Pasien, Dokter, Riwayat) {
        var $ctrl = this;

        function updateData() {
            $scope.data = [];
            Pendaftaran.getPendaftaranByIdDokter()
                .then((res) => {
                    res.forEach((pendaftaran) => {
                        $q.all([
                            Pasien.getDataPasienById(pendaftaran.idPasien),
                            Dokter.getDokterById(pendaftaran.idDokter),
                            Riwayat.getRiwayatByIdPendaftaran(pendaftaran.id)
                        ])
                            .then((res) => {
                                let temp = Object.assign(pendaftaran, {
                                    namaPasien: res[0].nama,
                                    alamatPasien: res[0].alamat,
                                    genderPasien: res[0].gender,
                                    telefonPasien: res[0].telefon,
                                    namaDokter: res[1].nama,
                                    status: res[2].length === 0 ? 'Waiting' : 'Has Been Examined'
                                });
                                $scope.data.push(temp);
                            });
                    });
                });
        }

        $ctrl.$onInit = function () {
            updateData();

            $scope.update = (data) => {
                $state.go('admin.updateService', { data });
            };

            $scope.delete = (id) => {
                if (confirm('Are you sure?')) {
                    Pendaftaran.deletePendaftaranById(id)
                        .then(() => {
                            updateData();
                        });
                }
            }
        };
    }
})();