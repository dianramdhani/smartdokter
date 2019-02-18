angular.module('smartdokter')
    .component('dokterTablePatients', {
        template: require('./dokter-table-patients.html'),
        controller: ['$scope', '$state', '$q', 'Riwayat', 'Pasien', 'Pendaftaran', class dokterTablePatients {
            constructor($scope, $state, $q, Riwayat, Pasien, Pendaftaran) {
                this.scope = $scope;
                this.state = $state;
                this.q = $q;
                this.Riwayat = Riwayat;
                this.Pasien = Pasien;
                this.Pendaftaran = Pendaftaran;
            }

            $onInit() {
                this.scope.data = [];
                this.Pendaftaran.getPendaftaranByIdDokter()
                    .then((res) => {
                        res.forEach((pendaftaran) => {
                            this.q.all([
                                this.Pasien.getDataPasienById(pendaftaran.idPasien),
                                this.Riwayat.getRiwayatByIdPendaftaran(pendaftaran.id)
                            ])
                                .then((_res) => {
                                    let temp = Object.assign(pendaftaran, {
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