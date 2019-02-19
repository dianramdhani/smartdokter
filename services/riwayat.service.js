(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Riwayat', Riwayat);

    Riwayat.$inject = ['$http', '$q', 'Auth'];
    function Riwayat($http, $q, Auth) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // seluruh method di service
        this.addRiwayat = addRiwayat;
        this.getRiwayatByIdPendaftaran = getRiwayatByIdPendaftaran;
        this.getRiwayatByIdPasien = getRiwayatByIdPasien;
        this.getRiwayatByIdDokter = getRiwayatByIdDokter;

        /**
         * Menambah data riwayat.
         * @param {Object} data - Data riwayat dari treatment.
         * @returns {Object} - Status.
         */
        function addRiwayat(data) {
            let q = $q.defer();
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
         * @returns {Object} - Data riwayat.
         */
        function getRiwayatByIdPendaftaran(id) {
            let q = $q.defer();
            $http.get(`${URL_SERVER}/riwayat/idPendaftaran/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil seluruh riwayat pasien.
         * @returns {Array} - Seluruh data pasien.
         */
        function getAllRiwayats() {
            let q = $q.defer();
            $http.get(`${URL_SERVER}/riwayat`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res)
                });
            return q.promise;
        }

        /**
         * Mengambil seluruh data riwayat berdasar id dokter yang di ambil dari Auth.
         * @returns {Array} - Seluruh data riwayat.
         */
        function getRiwayatByIdDokter() {
            let q = $q.defer();
            getAllRiwayats()
                .then((res) => {
                    q.resolve(res.filter(riwayat => riwayat.idDokter === Auth.getCurrentUser().id))
                });
            return q.promise;
        }

        /**
         * Mengambil data riwayat berdasar id pasien.
         * @param {Number} id - Id pasien.
         * @returns {Object} - Data riwayat.
         */
        function getRiwayatByIdPasien(id) {
            let q = $q.defer();
            getRiwayatByIdDokter()
                .then((res) => {
                    q.resolve(res.filter(riwayat => riwayat.idPasien === Number(id)));
                });
            return q.promise;
        }

    }
})();