angular.module('smartdokter')
    .component('adminRegistrationPatient', {
        template: require('./admin-registration-patient.html'),
        controller: ['$scope', '$location', 'adminService', class adminRegistrationPatient {
            constructor($scope, $location, adminService) {
                this.scope = $scope;
                this.location = $location;
                this.adminService = adminService;
            }

            $onInit() {
                this.scope.register = (data) => {
                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['alamat', 'gender', 'nama', 'tanggalDaftar', 'telefon'];
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
                        this.adminService.addNewDataPasien(data)
                            .then(() => {
                                this.location.path('/admin/patient');
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };
            }
        }]
    });