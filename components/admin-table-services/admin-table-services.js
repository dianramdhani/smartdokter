angular.module('smartdokter')
    .component('adminTableServices', {
        template: require('./admin-table-services.html'),
        controller: ['$scope', '$q', '$state', 'adminService', 'dokterService', class adminTableServices {
            constructor($scope, $q, $state, adminService, dokterService) {
                this.scope = $scope;
                this.q = $q;
                this.state = $state;
                this.adminService = adminService;
                this.dokterService = dokterService;
            }

            updateData() {
                this.scope.data = [];
                this.adminService.getAllDaftarAntris()
                    .then((res) => {
                        res.forEach((antri, i) => {
                            this.q.all([
                                this.adminService.getDataPasienById(antri.idPasien),
                                this.dokterService.getDokterById(antri.idDokter)
                            ])
                                .then((res) => {
                                    let temp = Object.assign(antri, {
                                        namaPasien: res[0].nama,
                                        alamatPasien: res[0].alamat,
                                        genderPasien: res[0].gender,
                                        telefonPasien: res[0].telefon,
                                        namaDokter: res[1].nama
                                    });
                                    this.scope.data.push(temp);
                                });
                        });
                    });
            }

            $onInit() {
                this.updateData();

                this.scope.update = (data) => {
                    this.state.go('admin.updateService', { data });
                };

                this.scope.delete = (id) => {
                    if (confirm('Are you sure?')) {
                        this.adminService.deletePendaftaranById(id)
                            .then(() => {
                                this.updateData();
                            });
                    }
                }
            }
        }]
    });