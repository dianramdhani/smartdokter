(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Fisik', Fisik);

    Fisik.$inject = ['$http', '$q'];
    function Fisik($http, $q) {
        const URL_SERVER = 'http://smartdoctor.tritronik.com/api';

        // Seluruh method di service
        this.addDataFisik = addDataFisik;
        this.getFisikByIdPendaftaran = getFisikByIdPendaftaran;

        /**
         * Menambah data fisik.
         * @param {Object} data - Data fisik
         */
        function addDataFisik(data) {
            let q = $q.defer();
            $http.post(`${URL_SERVER}/fisik`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil data fisik berdasar id pendaftaran.
         * @param {Number} id - Id pendaftaran.
         * @returns {Object} - Data fisik.
         */
        function getFisikByIdPendaftaran(id) {
            let q = $q.defer();
            $http.get(`${URL_SERVER}/fisik/pendaftaran/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

    }
})();