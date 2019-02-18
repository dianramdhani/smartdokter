angular.module('smartdokter')
    .component('adminTableObat', {
        template: require('./admin-table-obat.html'),
        controller: ['$state', '$scope', 'Obat', class adminTableObat {
            constructor($state, $scope, Obat) {
                this.state = $state;
                this.scope = $scope;
                this.Obat = Obat;
            }

            $onInit() {
                this.Obat.getAllObatByIdDokter()
                    .then((res) => {
                        this.scope.data = res;
                    });
            }
        }]
    });