(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Pasien', Pasien);

    Pasien.$inject = ['$http', '$q'];
    function Pasien($http, $q) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // Seluruh method di service
        this.getAllDataPasiens = getAllDataPasiens;
        this.getDataPasienById = getDataPasienById;
        this.addNewDataPasien = addNewDataPasien;
        this.updatePasien = updatePasien;
        this.deletePasienById = deletePasienById;

        /**
         * Mengambil seluruh pasien.
         * @returns {Array} - Seluruh data pasien.
         */
        function getAllDataPasiens() {
            var q = $q.defer();
            $http.get(`${URL_SERVER}/pasien`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil data pasien berdasarkan id.
         * @param {Number} id - Id pasien.
         * @returns {Object} - Data pasien.
         */
        function getDataPasienById(id) {
            var q = $q.defer();
            getAllDataPasiens()
                .then((res) => {
                    let _res = res.find((dataPatient) => {
                        return dataPatient.id === id;
                    });
                    q.resolve(_res);
                });
            return q.promise;
        }

        /**
         * Menambah data pasien.
         * @param {Object} data - Data pasien.
         */
        function addNewDataPasien(data) {
            var q = $q.defer();
            $http.post(`${URL_SERVER}/pasien`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Update data pasien.
         * @param {Object} data - Data pasien.
         */
        function updatePasien(data) {
            var q = $q.defer();
            $http.put(`${URL_SERVER}/pasien/${data.id}`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
        * Menghapus data pasien.
        * @param {Number} id - Id pasien.
        */
        function deletePasienById(id) {
            var q = $q.defer();
            $http.delete(`${URL_SERVER}/pasien/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

    }
})();