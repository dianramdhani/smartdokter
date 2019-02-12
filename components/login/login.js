angular.module('smartdokter')
    .component('login', {
        template: require('./login.html'),
        controller: ['$scope', '$state', 'adminService', class login {
            constructor($scope, $state, adminService) {
                this.scope = $scope;
                this.state = $state;
                this.adminService = adminService;
            }

            $onInit() {
                this.scope.login = (data) => {
                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['email', 'password'];
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

                        // login authentication
                        this.adminService.auth(data.email, data.password)
                            .then((res) => {
                                if (res) {
                                    this.state.go('admin.patients');
                                }
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };
            }
        }]
    });