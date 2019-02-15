angular.module('smartdokter')
    .component('admin', {
        template: require('./admin.html'),
        controller: ['$state', '$scope', '$rootScope', 'adminService', 'dokterService', class admin {
            constructor($state, $scope, $rootScope, adminService, dokterService) {
                this.state = $state;
                this.scope = $scope;
                this.rootScope = $rootScope;
                this.adminService = adminService;
                this.dokterService = dokterService;
            }

            $onInit() {
                this.state.go('admin.patients');

                this.dokterService.getDokterByEmail(this.rootScope.globals.currentUser.email)
                    .then((res) => {
                        this.scope.data = res;
                    });

                this.scope.logout = () => {
                    this.adminService.logout();
                    this.state.go('login');
                };
            }
        }]
    });