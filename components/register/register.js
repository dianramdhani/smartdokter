angular.module('smartdokter')
    .component('register', {
        template: require('./register.html'),
        controller: ['$scope', '$state', 'dokterService', class register {
            constructor($scope, $state, dokterService) {
                this.scope = $scope;
                this.dokterService = dokterService;
                this.state = $state;
            }

            $onInit() {
                this.scope.register = (data) => {
                    console.log(data);
                };

                this.scope.register = (data) => {
                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['nama', 'alamatDok', 'spesialis', 'email', 'password'];
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

                        // post ke server
                        this.dokterService.getDokterByEmail(data.email)
                            .then((res) => {
                                if (res === '') {
                                    this.dokterService.addNewDokter(data)
                                        .then(() => {
                                            alert('Registration Success');
                                            this.state.go('login');
                                        });
                                } else
                                    alert('Please fill in another e-mail!');
                            });
                    } else
                        alert('Please fill in correctly!');
                };

            }
        }]
    });