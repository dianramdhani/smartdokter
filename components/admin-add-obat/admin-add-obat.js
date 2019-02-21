(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh a-href saat menambah obat di admin-table-obat.
    // Creates:
    // Membuat form untuk menambah data obat.

    angular
        .module('smartdokter')
        .component('adminAddObat', {
            template: require('./admin-add-obat.html'),
            controller: adminAddObatController,
            controllerAs: '$ctrl'
        });

    adminAddObatController.$inject = ['$state', '$scope', 'Obat'];
    function adminAddObatController($state, $scope, Obat) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.addObat = (data) => {
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
                    Obat.addNewObat(data)
                        .then(() => {
                            $state.go('admin.obats');
                        });
                } else {
                    alert('Please fill in correctly!');
                }
            };
        };
    }
})();