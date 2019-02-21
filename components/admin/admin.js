(function () {
    'use strict';

    // Usage:
    // Dipanggil setelah tampilan login dengan login admin.
    // Creates:
    // Container untuk tampilan admin berisi side bar dan content.

    angular
        .module('smartdokter')
        .component('admin', {
            template: require('./admin.html'),
            controller: adminController,
            controllerAs: '$ctrl'
        });

    adminController.$inject = ['$state', '$scope', '$rootScope', 'Auth', 'Dokter'];
    function adminController($state, $scope, $rootScope, Auth, Dokter) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $state.go('admin.patients');

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