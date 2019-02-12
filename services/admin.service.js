angular.module('smartdokter')
    .service('adminService', ['$http', '$q', 'dokterService', class adminService {
        constructor($http, $q, dokterService) {
            this.http = $http;
            this.q = $q;
            this.dokterService = dokterService;
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

        /**
         * Update data pasien.
         * @param {Object} data - Data pasien.
         * @returns {Object} - Status
         */
        updatePasien(data) {
            var q = this.q.defer();
            this.http.put(`${this.urlServer}/pasien/${data.id}`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Menghapus data pasien.
         * @param {Number} id - Id pasien.
         * @returns {Object} - Status.
         */
        deletePasienById(id) {
            var q = this.q.defer();
            this.http.delete(`${this.urlServer}/pasien/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Autentikasi admin.
         * @param {String} email - Email admin.
         * @param {String} password - Password admin.
         * @returns {Boolean} - True jika berhasil login, dan sebaliknya.
         */
        auth(email, password) {
            var q = this.q.defer();
            this.dokterService.getDokterByEmail(email)
                .then((res) => {
                    let _res = false;

                    if (res === '') {
                        alert('failed to login');
                    } else {
                        if (res.password === password) {
                            _res = true;

                            /**
                             * @todo
                             * password dan email simpan ke cache
                             */
                        } else {
                            alert('failed to login');
                        }
                    }
                    q.resolve(_res);
                });
            return q.promise;
        }
    }]);