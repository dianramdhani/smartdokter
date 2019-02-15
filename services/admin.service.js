angular.module('smartdokter')
    .service('adminService', ['$http', '$q', '$rootScope', '$cookies', 'md5', 'dokterService', class adminService {
        constructor($http, $q, $rootScope, $cookies, md5, dokterService) {
            this.http = $http;
            this.q = $q;
            this.rootScope = $rootScope;
            this.cookies = $cookies;
            this.md5 = md5;
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
            password = this.md5.createHash(password);
            let q = this.q.defer(),
                _res = false;
            this.http.post(`${this.urlServer}/login`, { email, password })
                .then((res) => {
                    res = res.data;
                    this.rootScope.globals = {
                        currentUser: { email, password, emailDokter: res.username, token: res.token, role: 'admin' }
                    };
                    let cookieExp = new Date();
                    cookieExp.setDate(cookieExp.getDate() + 7);
                    this.cookies.putObject('globals', this.rootScope.globals, { expires: cookieExp });
                    this.http.defaults.headers.common['token'] = res.token;
                    _res = true;
                    q.resolve(_res);
                });
            return q.promise;
        }

        /**
         * Logout akun admin.
         */
        logout() {
            this.rootScope.globals = {};
            this.cookies.remove('globals');
            this.http.defaults.headers.common['token'] = '';
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

        /**
         * Menambah data obat.
         * @param {Object} data - Data obat.
         */
        addNewObat(data) {
            var q = this.q.defer();
            this.dokterService.getDokterByEmail(this.rootScope.globals.currentUser.emailDokter)
                .then((res) => {
                    data['idDokter'] = res.idDok;
                    this.http.post(`${this.urlServer}/obat`, data)
                        .then((res) => {
                            res = res.data;
                            q.resolve(res);
                        });
                });
            return q.promise;
        }

        /**
         * Mengambil seluruh data obat berdasar id dokter.
         * @returns {Array} - Seluruh data obat.
         */
        getAllObatByIdDokter() {
            var q = this.q.defer();
            this.q.all([
                this.http.get(`${this.urlServer}/obat`),
                this.dokterService.getDokterByEmail(this.rootScope.globals.currentUser.emailDokter)
            ])
                .then((res) => {
                    let resObats = res[0].data,
                        dataDokter = res[1];
                    q.resolve(resObats.filter(obat => obat.idDokter === dataDokter.idDok));
                })
            return q.promise;
        }
    }]);