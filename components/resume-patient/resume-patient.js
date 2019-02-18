angular.module('smartdokter')
    .component('resumePatient', {
        template: require('./resume-patient.html'),
        controller: ['$state', '$scope', '$stateParams', 'Riwayat', class resumePatient {
            constructor($state, $scope, $stateParams, Riwayat) {
                this.state = $state;
                this.scope = $scope;
                this.stateParams = $stateParams;
                this.Riwayat = Riwayat;
            }

            $onInit() {
                /**
                 * ada masalah method yang ambigu
                 */
                this.Riwayat.getRiwayatByIdPasien(this.stateParams.id)
                    .then((res) => {
                        console.log(res);
                    });
            }
        }]
    });