angular.module('smartdokter')
    .component('dokter', {
        template: require('./dokter.html'),
        controller: ['$scope', '$rootScope', '$state', 'Dokter', 'Auth', class dokter {
            constructor($scope, $rootScope, $state, Dokter, Auth) {
                this.scope = $scope;
                this.rootScope = $rootScope;
                this.state = $state;
                this.Dokter = Dokter;
                this.Auth = Auth;
            }

            $onInit() {
                this.state.go('dokter.patients');

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