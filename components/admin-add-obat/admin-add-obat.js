angular.module('smartdokter')
    .component('adminAddObat', {
        template: require('./admin-add-obat.html'),
        controller: ['$state', '$scope', 'Obat', class adminAddObat {
            constructor($state, $scope, Obat) {
                this.state = $state;
                this.scope = $scope;
                this.Obat = Obat;
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
                        this.Obat.addNewObat(data)
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