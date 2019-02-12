angular.module('smartdokter')
    .component('adminTablePatients', {
        template: require('./admin-table-patients.html'),
        controller: ['$scope', '$state', 'adminService', class adminTablePatients {
            constructor($scope, $state, adminService) {
                this.scope = $scope;
                this.state = $state;
                this.adminService = adminService;
            }

            updateData() {
                this.adminService.getAllDataPasiens()
                    .then((res) => {
                        this.scope.data = res;
                    });
            }

            $onInit() {
                this.updateData();

                this.scope.update = (data) => {
                    this.state.go('admin.updatePatient', { data });
                };

                this.scope.delete = (id) => {
                    if (confirm('Are you sure?')) {
                        this.adminService.deletePasienById(id)
                            .then(() => {
                                this.updateData();
                            });
                    }
                };
            }
        }]
    });