angular.module('smartdokter')
    .component('dokter', {
        template: require('./dokter.html'),
        controller: ['$scope', '$rootScope', '$state', 'dokterService', class dokter {
            constructor($scope, $rootScope, $state, dokterService) {
                this.scope = $scope;
                this.rootScope = $rootScope;
                this.dokterService = dokterService;
                this.state = $state;
            }

            $onInit() {
                this.state.go('dokter.patients');

                this.dokterService.getDokterByEmail(this.rootScope.globals.currentUser.email)
                    .then((res) => {
                        this.scope.data = res;
                    });

                this.scope.logout = () => {
                    this.dokterService.logout();
                    this.state.go('login');
                };
            }
        }]
    });