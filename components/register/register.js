(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh komponen login saat menekan a-href register.
    // Creates:
    // Menghasilkan form register dokter.

    angular
        .module('smartdokter')
        .component('register', {
            template: require('./register.html'),
            controller: registerController,
            controllerAs: '$ctrl'
        });

    registerController.$inject = ['$scope', '$state', 'Dokter'];
    function registerController($scope, $state, Dokter) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.register = (data) => {
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
                    Dokter.addNewDokter(data)
                        .then(() => {
                            alert('Registration Success');
                            $state.go('login');
                        });
                } else {
                    alert('Please fill in correctly!');
                }
            };
        };
    }
})();