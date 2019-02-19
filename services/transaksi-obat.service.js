(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('TransaksiObat', TransaksiObat);

    TransaksiObat.$inject = ['$http', '$q'];
    function TransaksiObat($http, $q) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // seluruh method di service
        this.addRiwayat = addRiwayat;
        this.getTransaksiObatByIdAntrian = getTransaksiObatByIdAntrian;

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

        /**
         * Mengambil data transaksi obat berdasar id pendaftaran.
         * @param {Number} id - Id pendaftaran.
         */
        function getTransaksiObatByIdAntrian(id){
            let q = $q.defer();
            $http.get(`${URL_SERVER}/transaksiObat/idPendaftaran/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res)
                });
            return q.promise;
        }

    }
})();