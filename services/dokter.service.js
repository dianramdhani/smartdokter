angular.module('smartdokter')
    .service('dokterService', ['$http', '$q', class dokterService {
        constructor($http, $q) {
            this.http = $http;
            this.q = $q;
            this.urlServer = 'http://192.168.11.117:8082';
        }

        /**
         * Mengambil data dokter berdasar parameter email.
         * @param {String} email - Email dokter.
         * @returns {Object} - Data dokter.
         */
        getDokterByEmail(email) {
            var q = this.q.defer();
            this.http.get(`${this.urlServer}/dokter/email`, { params: { email } })
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
        getDokterByNama(nama) {
            var q = this.q.defer();
            this.http.get(`${this.urlServer}/dokter/nama/${nama}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }
    }]);