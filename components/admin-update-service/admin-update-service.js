angular.module('smartdokter')
    .component('adminUpdateService', {
        template: require('./admin-update-service.html'),
        controller: ['$scope', '$state', '$stateParams', 'Pasien', 'Pendaftaran', class adminUpdateService {
            constructor($scope, $state, $stateParams, Pasien, Pendaftaran) {
                console.log('adminUpdateService terbuka');
                this.scope = $scope;
                this.state = $state;
                this.stateParams = $stateParams;
                this.Pasien = Pasien;
                this.Pendaftaran = Pendaftaran;
            }

            $onInit() {
                this.Pasien.getAllDataPasiens()
                    .then((res) => {
                        this.scope.patients = res;
                    })
                    .then(() => {
                        this.scope.data = angular.fromJson(this.stateParams.data);
                        this.scope.data.tanggalKunjungan = new Date(this.scope.data.tanggalKunjungan);
                        this.scope.data.idPasien = this.scope.data.idPasien.toString();
                    });

                this.scope.updateService = (data) => {
                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['id', 'idDokter', 'idPasien', 'nomorAntrian', 'penyakit', 'tanggalKunjungan'];
                        for (const property of dataPropertyChecker) {
                            if (!data.hasOwnProperty(property)) {
                                alert('Please fill in correctly!');
                                return;
                            } else {
                                if (data[property] === '' || !data[property]) {
                                    alert('Please fill in correctly!');
                                    return;
                                }
                            }
                        }

                        // hapus beberapa parameter
                        let _data = {};
                        dataPropertyChecker.forEach(property => {
                            _data[property] = data[property];
                        });

                        // put ke server
                        this.Pendaftaran.updatePendaftaran(_data)
                            .then(() => {
                                this.state.go('admin.services');
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };
            }
        }]
    });