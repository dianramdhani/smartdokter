angular.module('smartdokter')
    .component('dokterTablePatients', {
        template: require('./dokter-table-patients.html'),
        controller: ['$scope', '$state', '$q', 'dokterService', 'adminService', class dokterTablePatients {
            constructor($scope, $state, $q, dokterService, adminService) {
                this.scope = $scope;
                this.state = $state;
                this.q = $q;
                this.dokterService = dokterService;
                this.adminService = adminService;
            }

            $onInit() {
                this.scope.data = [];
                this.dokterService.getPendaftaranByIdDokter()
                    .then((res) => {
                        res.forEach((antri) => {
                            this.q.all([
                                this.adminService.getDataPasienById(antri.idPasien),
                                this.dokterService.getRiwayatByIdPendaftaran(antri.id)
                            ])
                                .then((_res) => {
                                    let temp = Object.assign(antri, {
                                        namaPasien: _res[0].nama,
                                        alamatPasien: _res[0].alamat,
                                        genderPasien: _res[0].gender,
                                        telefonPasien: _res[0].telefon,
                                        status: _res[1].length === 0 ? 'Waiting' : 'Has Been Treatment'
                                    });
                                    this.scope.data.push(temp);
                                });
                        });
                    });

                this.scope.addTreatment = (data) => {
                    this.state.go('dokter.addTreatment', { data });
                };
            }
        }]
    });