(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Pendaftaran', Pendaftaran);

    Pendaftaran.$inject = ['$http', '$q', 'Auth'];
    function Pendaftaran($http, $q, Auth) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // seluruh method di service
        this.getPendaftaranByIdDokter = getPendaftaranByIdDokter;
        this.addPendaftaran = addPendaftaran;
        this.updatePendaftaran = updatePendaftaran;
        this.deletePendaftaranById = deletePendaftaranById;

        /**
         * Ambil list pendaftaran berdasar id dokter yang disimpan di rootScope.
         * @returns {Array} - List pendaftaran.
         */
        function getPendaftaranByIdDokter() {
            var q = $q.defer();
            $http.get(`${URL_SERVER}/pendaftaran/idDokter/${Auth.getCurrentUser().id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Menambah data service (pendaftaran).
         * @param {Object} data - Data service (pendaftaran).
         */
        function addPendaftaran(data) {
            var q = $q.defer();
            data['idDokter'] = Auth.getCurrentUser().id;
            $http.post(`${URL_SERVER}/pendaftaran`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Update data service (pendaftaran).
         * @param {Object} data - Data pendaftaran.
         */
        function updatePendaftaran(data) {
            var q = $q.defer();
            $http.put(`${URL_SERVER}/pendaftaran/${data.id}`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Delete pendaftaran berdasar id.
         * @param {Number} id - Id pendaftaran
         */
        function deletePendaftaranById(id) {
            var q = $q.defer();
            $http.delete(`${URL_SERVER}/pendaftaran/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

    }
})();