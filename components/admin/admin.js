angular.module('smartdokter')
    .component('admin', {
        template: require('./admin.html'),
        controller: ['$state', '$scope', '$rootScope', 'Auth', 'Dokter', class admin {
            constructor($state, $scope, $rootScope, Auth, Dokter) {
                this.state = $state;
                this.scope = $scope;
                this.rootScope = $rootScope;
                this.Auth = Auth;
                this.Dokter = Dokter;
            }

            $onInit() {
                this.state.go('admin.patients');

                this.Dokter.getDokterByEmail(this.rootScope.globals.currentUser.email)
                    .then((res) => {
                        this.scope.data = res;
                    });

                this.scope.logout = () => {
                    this.Auth.logout();
                    this.state.go('login');
                };
            }
        }]
    });