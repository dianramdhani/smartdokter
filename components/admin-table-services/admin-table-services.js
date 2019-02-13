angular.module('smartdokter')
    .component('adminTableServices', {
        template: require('./admin-table-services.html'),
        controller: ['$scope', '$q', 'adminService', 'dokterService', class adminTableServices {
            constructor($scope, $q, adminService, dokterService) {
                this.scope = $scope;
                this.q = $q;
                this.adminService = adminService;
                this.dokterService = dokterService;
            }

            $onInit() {
                this.scope.data = [];
                this.adminService.getAllDaftarAntris()
                    .then((res) => {
                        res.forEach((antri, i) => {
                            this.q.all([
                                this.adminService.getDataPasienById(antri.idPasien),
                                this.dokterService.getDokterById(antri.idDokter)
                            ])
                                .then((res) => {
                                    let temp = {
                                        id: antri.id,
                                        penyakit: antri.penyakit,
                                        nomorAntrian: antri.nomorAntrian,
                                        tanggalKunjungan: antri.tanggalKunjungan,
                                        namaPasien: res[0].nama,
                                        alamatPasien: res[0].alamat,
                                        genderPasien: res[0].gender,
                                        telefonPasien: res[0].telefon,
                                        namaDokter: res[1].nama
                                    };
                                    this.scope.data.push(temp);
                                });
                        });
                    });
            }
        }]
    });