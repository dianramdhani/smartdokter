(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Riwayat', Riwayat);

    Riwayat.$inject = ['$http', '$q'];
    function Riwayat($http, $q) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // seluruh method di service
        this.addRiwayat = addRiwayat;
        this.getRiwayatByIdPendaftaran = getRiwayatByIdPendaftaran;

        /**
         * Menambah data riwayat.
         * @param {Object} data - Data riwayat dari treatment.
         * @returns {Object} - Status.
         */
        function addRiwayat(data) {
            var q = $q.defer();
            $http.post(`${URL_SERVER}/riwayat`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil data riwayat berdasar id pendaftaran.
         * @param {Number} id - Id pendaftaran.
         */
        function getRiwayatByIdPendaftaran(id) {
            var q = $q.defer();
            $http.get(`${URL_SERVER}/riwayat/idPendaftaran/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

    }
})();