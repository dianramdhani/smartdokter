angular.module('smartdokter')
    .component('dokterAddTreatment', {
        template: require('./dokter-add-treatment.html'),
        controller: ['$scope', '$state', '$stateParams', 'dokterService', class dokterAddTreatment {
            constructor($scope, $state, $stateParams, dokterService) {
                this.scope = $scope;
                this.state = $state;
                this.stateParams = $stateParams;
                this.dokterService = dokterService;
            }

            $onInit() {
                this.scope.addTreatment = (data) => {
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
                        this.dokterService.addRiwayat(_data)
                            .then(() => {
                                this.state.go('dokter.patients');
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };
            }
        }]
    });