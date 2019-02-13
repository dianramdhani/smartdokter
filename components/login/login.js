angular.module('smartdokter')
    .component('login', {
        template: require('./login.html'),
        controller: ['$scope', '$state', 'adminService', 'dokterService', class login {
            constructor($scope, $state, adminService, dokterService) {
                this.scope = $scope;
                this.state = $state;
                this.adminService = adminService;
                this.dokterService = dokterService;
            }

            $onInit() {
                this.scope.loginAdmin = (data) => {
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
                                    this.state.go('admin');
                                }
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };

                this.scope.loginDoctor = (data) => {
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
                        this.dokterService.auth(data.email, data.password)
                            .then((res) => {
                                if (res) {
                                    this.state.go('dokter');
                                }
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };
            }
        }]
    });