angular.module('smartdokter')
    .component('adminAddObat', {
        template: require('./admin-add-obat.html'),
        controller: ['$state', '$scope', 'adminService', class adminAddObat {
            constructor($state, $scope, adminService) {
                this.state = $state;
                this.scope = $scope;
                this.adminService = adminService;
            }

            $onInit() {
                this.scope.addObat = (data) => {
                    if (typeof data !== 'undefined') {
                        // check seluruh properti tidak boleh kosong
                        const dataPropertyChecker = ['namaObat', 'harga'];
                        for (const property of dataPropertyChecker) {
                            if (!data.hasOwnProperty(property)) {
                                alert('Please fill in correctly!');
                                return;
                            } else {
                                if (data[property] === '' || !data[property]) {
                                    alert('Please fill in correctly!');
                                    return;
                                }
                            }
                        }

                        // post ke server
                        this.adminService.addNewObat(data)
                            .then(() => {
                                this.state.go('admin.obats');
                            });
                    } else {
                        alert('Please fill in correctly!');
                    }
                };
            }
        }]
    });