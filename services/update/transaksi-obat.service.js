(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('TransaksiObat', TransaksiObat);

    TransaksiObat.$inject = ['$http'];
    function TransaksiObat($http) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // seluruh method di service
        this.addRiwayat = addRiwayat;

        /**
         * Menyimpan data transaksi obat.
         * @param {Object} data - Data transaksi obat.
         */
        function addRiwayat(data) {
            var q = $q.defer();
            $http.post(`${URL_SERVER}/transaksiObat`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

    }
})();