angular.module('smartdokter')
    .service('adminService', ['$http', '$q', class api {
        constructor($http, $q) {
            this.http = $http;
            this.q = $q;
            this.urlServer = 'http://192.168.11.117:8082';
        }

        /**
         * Mengambil seluruh pasien.
         * @returns {Array} - Seluruh data pasien.
         */
        getAllDataPasiens() {
            var q = this.q.defer();
            this.http.get(`${this.urlServer}/pasien`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Menambah data pasien.
         * @param {Object} data - Data pasien.
         * @returns {Object} - Status.
         */
        addNewDataPasien(data) {
            var q = this.q.defer();
            this.http.post(`${this.urlServer}/pasien`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }
    }]);