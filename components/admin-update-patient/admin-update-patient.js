angular.module('smartdokter')
    .component('adminUpdatePatient', {
        template: require('./admin-update-patient.html'),
        controller: ['$scope', '$stateParams', '$state', 'Pasien', class adminUpdatePatient {
            constructor($scope, $stateParams, $state, Pasien) {
                this.scope = $scope;
                this.state = $state;
                this.Pasien = Pasien;
                this.scope.data = angular.fromJson($stateParams.data);
                this.scope.data.tanggalDaftar = new Date(this.scope.data.tanggalDaftar);
            }

            $onInit() {
                this.scope.update = (data) => {
                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['alamat', 'gender', 'nama', 'tanggalDaftar', 'telefon'];
                        for (const property of dataPropertyChecker) {
                            if (!data.hasOwnProperty(property)) {
                                return;
                            } else {
                                if (data[property] === '') {
                                    return;
                                }
                            }
                        }

                        // put ke server
                        this.Pasien.updatePasien(data)
                            .then(() => {
                                this.state.go('admin.patients');
                            });
                    }
                };
            }
        }]
    });