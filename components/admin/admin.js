angular.module('smartdokter')
    .component('admin', {
        template: require('./admin.html'),
        controller: ['$state', '$scope', 'adminService', class admin {
            constructor($state, $scope, adminService) {
                this.state = $state;
                this.scope = $scope;
                this.adminService = adminService;
            }

            $onInit() {
                this.state.go('admin.patients');

                this.scope.logout = () => {
                    this.adminService.logout();
                    this.state.go('login');
                };
            }
        }]
    });