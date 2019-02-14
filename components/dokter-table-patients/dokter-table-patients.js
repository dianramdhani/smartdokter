angular.module('smartdokter')
    .component('dokterTablePatients', {
        template: require('./dokter-table-patients.html'),
        controller: ['$scope', '$state', 'dokterService', 'adminService', class dokterTablePatients {
            constructor($scope, $state, dokterService, adminService) {
                this.scope = $scope;
                this.state = $state;
                this.dokterService = dokterService;
                this.adminService = adminService;
            }

            $onInit() {
                this.scope.data = [];
                this.dokterService.getPendaftaranByIdDokter()
                    .then((res) => {
                        res.forEach((antri) => {
                            this.adminService.getDataPasienById(antri.idPasien)
                                .then((_res) => {
                                    let temp = Object.assign(antri, {
                                        namaPasien: _res.nama,
                                        alamatPasien: _res.alamat,
                                        genderPasien: _res.gender,
                                        telefonPasien: _res.telefon,
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