(function () {
    'use strict';

    // Usage:
    // Dibuka oleh komponen admin saat menekan a-href drug di side bar. 
    // Creates:
    // Menghasilkan tabel obat.

    angular
        .module('smartdokter')
        .component('adminTableObat', {
            template: require('./admin-table-obat.html'),
            controller: adminTableObatController,
            controllerAs: '$ctrl'
        });

    adminTableObatController.$inject = ['$scope', 'Obat'];
    function adminTableObatController($scope, Obat) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            Obat.getAllObatByIdDokter()
                .then((res) => {
                    $scope.data = res;
                });
        };
    }
})();