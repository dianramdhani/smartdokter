angular.module('smartdokter')
    .component('adminTablePatients', {
        template: require('./admin-table-patients.html'),
        controller: ['$scope', '$state', 'adminService', class adminTablePatients {
            constructor($scope, $state, adminService) {
                this.scope = $scope;
                this.state = $state;
                this.adminService = adminService;
            }

            $onInit() {
                this.adminService.getAllDataPasiens()
                    .then((res) => {
                        this.scope.data = res;
                    });

                this.scope.update = (data) => {
                    this.state.go('admin.updatePatient', { data });
                };
            }
        }]
    });