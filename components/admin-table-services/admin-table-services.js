angular.module('smartdokter')
    .component('adminTableServices', {
        template: require('./admin-table-services.html'),
        controller: ['$scope', '$q', '$state', 'Pendaftaran', 'Pasien', 'Dokter', 'Riwayat', class adminTableServices {
            constructor($scope, $q, $state, Pendaftaran, Pasien, Dokter, Riwayat) {
                this.scope = $scope;
                this.q = $q;
                this.state = $state;
                this.Pendaftaran = Pendaftaran;
                this.Pasien = Pasien;
                this.Dokter = Dokter;
                this.Riwayat = Riwayat;
            }

            updateData() {
                this.scope.data = [];
                this.Pendaftaran.getPendaftaranByIdDokter()
                    .then((res) => {
                        res.forEach((pendaftaran) => {
                            this.q.all([
                                this.Pasien.getDataPasienById(pendaftaran.idPasien),
                                this.Dokter.getDokterById(pendaftaran.idDokter),
                                this.Riwayat.getRiwayatByIdPendaftaran(pendaftaran.id)
                            ])
                                .then((res) => {
                                    let temp = Object.assign(pendaftaran, {
                                        namaPasien: res[0].nama,
                                        alamatPasien: res[0].alamat,
                                        genderPasien: res[0].gender,
                                        telefonPasien: res[0].telefon,
                                        namaDokter: res[1].nama,
                                        status: res[2].length === 0 ? 'Waiting' : 'Has Been Treatment'
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