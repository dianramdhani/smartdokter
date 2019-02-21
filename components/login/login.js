(function () {
    'use strict';

    // Usage:
    // Kondisi awal web.
    // Creates:
    // Mengasilkan form login.

    angular
        .module('smartdokter')
        .component('login', {
            template: require('./login.html'),
            controller: loginController,
            controllerAs: '$ctrl'
        });

    loginController.$inject = ['$scope', '$state', 'Auth'];
    function loginController($scope, $state, Auth) {
        var $ctrl = this;

        function login(data, state) {
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
                Auth.login(data.email, data.password)
                    .then((res) => {
                        if (res) {
                            $state.go(state);
                        }
                    });
            } else {
                alert('Please fill in correctly!');
            }
        }

        $ctrl.$onInit = function () {
            $scope.loginAdmin = (data) => {
                login(data, 'admin');
            };

            $scope.loginDoctor = (data) => {
                login(data, 'dokter');
            };
        };
    }
})();