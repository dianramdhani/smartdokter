angular.module('smartdokter')
    .component('login', {
        template: require('./login.html'),
        controller: ['$scope', '$state', 'Auth', class login {
            constructor($scope, $state, Auth) {
                this.scope = $scope;
                this.state = $state;
                this.Auth = Auth;
            }

            login(data, state) {
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
                    this.Auth.login(data.email, data.password)
                        .then((res) => {
                            if (res) {
                                this.state.go(state);
                            }
                        });
                } else {
                    alert('Please fill in correctly!');
                }
            }

            $onInit() {
                this.scope.loginAdmin = (data) => {
                    this.login(data, 'admin');
                };

                this.scope.loginDoctor = (data) => {
                    this.login(data, 'dokter');
                };
            }
        }]
    });