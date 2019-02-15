angular.module('smartdokter')
    .component('dokterAddTreatment', {
        template: require('./dokter-add-treatment.html'),
        controller: ['$scope', '$state', '$stateParams', '$q', 'dokterService', 'adminService', class dokterAddTreatment {
            constructor($scope, $state, $stateParams, $q, dokterService, adminService) {
                this.scope = $scope;
                this.state = $state;
                this.stateParams = $stateParams;
                this.q = $q;
                this.dokterService = dokterService;
                this.adminService = adminService;
            }

            $onInit() {
                this.scope.addTreatment = (data) => {
                    data['totalBiaya'] = this.scope.totalBiaya;

                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['diagnosa', 'tindakan', 'totalBiaya'];
                        for (const property of dataPropertyChecker) {
                            if (!data.hasOwnProperty(property)) {
                                alert('Please fill in correctly!');
                                return;
                            } else {
                                if (data[property] === '') {
                                    alert('Please fill in correctly!');
                                    return;
                                }
                            }
                        }

                        // post ke server
                        let _data = Object.assign(data, {
                            idDokter: this.stateParams.data.idDokter,
                            idPasien: this.stateParams.data.idPasien,
                            idPendaftaran: this.stateParams.data.id
                        });

                        let qTemp = [
                            this.dokterService.addRiwayat(_data)
                        ];
                        this.scope.obatDipilih.forEach(obat => {
                            qTemp.push(this.dokterService.transaksiObat({
                                idObat: obat.id,
                                idPendaftaran: this.stateParams.data.id
                            }));
                        });
                        this.q.all(qTemp)
                            .then(() => {
                                this.state.go('dokter.patients');
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };

                this.adminService.getAllObatByIdDokter()
                    .then((res) => {
                        this.scope.obats = res;
                    });

                this.scope.obatDipilih = [];
                this.scope.tambahObat = (obat) => {
                    if (obat) {
                        this.scope.obatDipilih.push(angular.fromJson(obat));
                    }
                };

                this.scope.deleteObat = (index) => {
                    this.scope.obatDipilih.splice(index, 1);
                };

                this.scope.$watchCollection('obatDipilih', (newVal) => {
                    let temp = 0;
                    newVal.forEach((obat) => {
                        temp = temp + obat.harga;
                    });
                    this.scope.totalBiaya = temp;
                });
            }
        }]
    });