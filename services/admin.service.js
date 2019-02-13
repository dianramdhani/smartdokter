angular.module('smartdokter')
    .service('adminService', ['$http', '$q', '$rootScope', '$cookies', 'dokterService', class adminService {
        constructor($http, $q, $rootScope, $cookies, dokterService) {
            this.http = $http;
            this.q = $q;
            this.rootScope = $rootScope;
            this.cookies = $cookies;
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
         * Mengambil data pasien berdasarkan id.
         * @param {Number} id - Id pasien.
         */
        getDataPasienById(id) {
            var q = this.q.defer();
            this.getAllDataPasiens()
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
         * Autentikasi admin. Set email dan password ke cookie.
         * @param {String} email - Email admin.
         * @param {String} password - Password admin.
         * @returns {Boolean} - True jika berhasil login, dan sebaliknya.
         */
        auth(email, password) {
            var q = this.q.defer();
            this.http({
                url: `${this.urlServer}/securedPassword?plainPassword=${password}`,
                method: 'GET',
                transformResponse: [(resPass) => {
                    password = resPass;
                    this.dokterService.getDokterByEmail(email)
                        .then((res) => {
                            let _res = false;

                            if (res === '') {
                                alert('failed to login');
                            } else {
                                if (res.password === password) {
                                    _res = true;

                                    // set email dengan password ke cookie
                                    this.rootScope.globals = {
                                        currentUser: { email, password, emailDokter: res.email, role: 'admin' }
                                    };
                                    let cookieExp = new Date();
                                    cookieExp.setDate(cookieExp.getDate() + 7);
                                    this.cookies.putObject('globals', this.rootScope.globals, { expires: cookieExp });
                                } else {
                                    alert('failed to login');
                                }
                            }
                            q.resolve(_res);
                        });
                }]
            });
            return q.promise;
        }

        /**
         * Logout akun admin.
         */
        logout() {
            this.rootScope.globals = {};
            this.cookies.remove('globals');
        }

        /**
         * Menambah data service (pendaftaran).
         * @param {Object} data - Data service (pendaftaran).
         * @returns {Object} - Status.
         */
        addPendaftaran(data) {
            var q = this.q.defer();
            this.dokterService.getDokterByEmail(this.rootScope.globals.currentUser.emailDokter)
                .then((res) => {
                    data['idDokter'] = res.idDok;
                    this.http.post(`${this.urlServer}/pendaftaran`, data)
                        .then((res) => {
                            res = res.data;
                            q.resolve(res);
                        });
                });
            return q.promise;
        }

        /**
         * Menampilkan seluruh service (pendaftaran) berdasar id dokter.
         */
        getAllDaftarAntris() {
            var q = this.q.defer();
            this.dokterService.getDokterByEmail(this.rootScope.globals.currentUser.emailDokter)
                .then((res) => {
                    this.http.get(`${this.urlServer}/pendaftaran/idDokter/${res.idDok}`)
                        .then((res) => {
                            res = res.data;
                            q.resolve(res);
                        });
                });
            return q.promise;
        }

        /**
         * Update data service (pendaftaran).
         * @param {Object} data - Data pendaftaran.
         */
        updatePendaftaran(data) {
            var q = this.q.defer();
            this.http.put(`${this.urlServer}/pendaftaran/${data.id}`, data)
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
        deletePendaftaranById(id) {
            var q = this.q.defer();
            this.http.delete(`${this.urlServer}/pendaftaran/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }
    }]);