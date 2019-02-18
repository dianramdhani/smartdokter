angular.module('smartdokter')
    .component('adminAddService', {
        template: require('./admin-add-service.html'),
        controller: ['$scope', '$state', 'Pasien', 'Pendaftaran', class adminAddService {
            constructor($scope, $state, Pasien, Pendaftaran) {
                this.scope = $scope;
                this.state = $state;
                this.Pasien = Pasien;
                this.Pendaftaran = Pendaftaran;
            }

            $onInit() {
                this.Pasien.getAllDataPasiens()
                    .then((res) => {
                        this.scope.patients = res;
                    });

                this.scope.addService = (data) => {
                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['idPasien', 'nomorAntrian', 'tanggalKunjungan', 'penyakit'];
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

                        // post ke server
                        this.Pendaftaran.addPendaftaran(data)
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