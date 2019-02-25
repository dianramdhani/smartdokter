(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Dokter', Dokter);

    Dokter.$inject = ['$http', '$q'];
    function Dokter($http, $q) {
        const URL_SERVER = 'http://smartdoctor.tritronik.com/api';

        // Seluruh method di service
        this.getAllDokters = getAllDokters;
        this.getDokterByEmail = getDokterByEmail;
        this.getDokterByNama = getDokterByNama;
        this.addNewDokter = addNewDokter;
        this.getDokterById = getDokterById;

        /**
         * Mengambil seluruh data dokter.
         * @returns {Array} - Seluruh data dokter.
         */
        function getAllDokters() {
            let q = $q.defer();
            $http.get(`${URL_SERVER}/dokter`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil data dokter berdasar parameter email.
         * @param {String} email - Email dokter.
         * @returns {Object} - Data dokter.
         */
        function getDokterByEmail(email) {
            let q = $q.defer();
            $http.get(`${URL_SERVER}/dokter/email`, { params: { email } })
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil beberapa data dokter berdasar nama yang sama.
         * @param {String} nama - Nama dokter.
         * @returns {Array} - Array dari object data dokter.
         */
        function getDokterByNama(nama) {
            let q = $q.defer();
            $http.get(`${URL_SERVER}/dokter/nama/${nama}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Menambah dokter.
         * @param {Object} data - Data dokter.
         * @returns {Object} - Status.
         */
        function addNewDokter(data) {
            let q = $q.defer();
            $http.post(`${URL_SERVER}/registrasi`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil data dokter berdasar id.
         * @param {Number} id - Id dokter.
         * @returns {Object} - Data dokter.
         */
        function getDokterById(id) {
            let q = $q.defer();
            getAllDokters()
                .then((res) => {
                    q.resolve(res.find(dataDokter => dataDokter.idDok === id));
                });
            return q.promise;
        }

    }
})();