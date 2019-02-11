angular.module('smartdokter')
    .component('adminTablePatients', {
        template: require('./admin-table-patients.html'),
        controller: ['$scope', 'adminService', class adminTablePatients {
            constructor($scope, adminService) {
                console.log('adminTablePatients terbuka');
                this.scope = $scope;
                this.adminService = adminService;
            }

            $onInit() {
                this.adminService.getAllDataPasiens()
                    .then((res) => {
                        this.scope.data = res;
                    });
            }
        }]
    });