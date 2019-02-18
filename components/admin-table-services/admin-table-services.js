angular.module('smartdokter')
    .component('adminTableServices', {
        template: require('./admin-table-services.html'),
        controller: ['$scope', '$q', '$state', 'Pendaftaran', 'Pasien', 'Dokter', class adminTableServices {
            constructor($scope, $q, $state, Pendaftaran, Pasien, Dokter) {
                this.scope = $scope;
                this.q = $q;
                this.state = $state;
                this.Pendaftaran = Pendaftaran;
                this.Pasien = Pasien;
                this.Dokter = Dokter;
            }

            updateData() {
                this.scope.data = [];
                this.Pendaftaran.getAllDaftarAntris()
                    .then((res) => {
                        res.forEach((antri) => {
                            this.q.all([
                                this.Pasien.getDataPasienById(antri.idPasien),
                                this.Dokter.getDokterById(antri.idDokter)
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
                        this.Pendaftaran.deletePendaftaranById(id)
                            .then(() => {
                                this.updateData();
                            });
                    }
                }
            }
        }]
    });