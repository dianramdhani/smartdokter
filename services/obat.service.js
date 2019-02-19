(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Obat', Obat);

    Obat.$inject = ['$http', '$q', 'Auth'];
    function Obat($http, $q, Auth) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // seluruh method di service
        this.addNewObat = addNewObat;
        this.getAllObatByIdDokter = getAllObatByIdDokter;
        this.getObatById = getObatById;

        /**
         * Menambah data obat.
         * @param {Object} data - Data obat.
         */
        function addNewObat(data) {
            let q = $q.defer();
            data['idDokter'] = Auth.getCurrentUser().id;
            $http.post(`${URL_SERVER}/obat`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil seluruh data obat berdasar id dokter.
         * @returns {Array} - Seluruh data obat.
         */
        function getAllObatByIdDokter() {
            let q = $q.defer();
            $http.get(`${URL_SERVER}/obat`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res.filter(obat => obat.idDokter === Auth.getCurrentUser().id));
                });
            return q.promise;
        }

        /**
         * Mengambil data obat berdasar id obat.
         * @param {Number} id - Id obat.
         */
        function getObatById(id) {
            let q = $q.defer();
            getAllObatByIdDokter()
                .then((res) => {
                    q.resolve(res.find(obat => obat.id === id));
                });
            return q.promise;
        }

    }
})();