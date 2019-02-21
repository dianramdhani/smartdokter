(function () {
    'use strict';

    // Usage:
    // Dipanggil setelah tampilan login dengan login dokter.
    // Creates:
    // Container untuk tampilan dokter berisi side bar dan content.

    angular
        .module('smartdokter')
        .component('dokter', {
            template: require('./dokter.html'),
            controller: dokterController,
            controllerAs: '$ctrl'
        });

    dokterController.$inject = ['$scope', '$rootScope', '$state', 'Dokter', 'Auth'];
    function dokterController($scope, $rootScope, $state, Dokter, Auth) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $state.go('dokter.patients');

            Dokter.getDokterByEmail($rootScope.globals.currentUser.email)
                .then((res) => {
                    $scope.data = res;
                });

            $scope.logout = () => {
                Auth.logout();
                $state.go('login');
            };
        };
    }
})();