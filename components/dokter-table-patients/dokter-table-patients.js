angular.module('smartdokter')
    .component('dokterTablePatients', {
        template: require('./dokter-table-patients.html'),
        controller: ['$scope', '$state', 'adminService', class dokterTablePatients {
            constructor($scope, $state, adminService) {
                console.log('dokterTablePatients terbuka');
                this.scope = $scope;
                this.state = $state;
                this.adminService = adminService;
            }
        }]
    });