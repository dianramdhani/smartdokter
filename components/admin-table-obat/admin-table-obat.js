angular.module('smartdokter')
    .component('adminTableObat', {
        template: require('./admin-table-obat.html'),
        controller: ['$state', '$scope', 'adminService', class adminTableObat {
            constructor($state, $scope, adminService) {
                console.log('adminTableObat terbuka');
                this.state = $state;
                this.scope = $scope;
                this.adminService = adminService;
            }

            $onInit() {
                this.adminService.getAllObat()
                    .then((res) => {
                        this.scope.data = res;
                    });
            }
        }]
    });