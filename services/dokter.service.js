angular.module('smartdokter')
    .service('dokterService', ['$http', '$q', '$rootScope', '$cookies', 'md5', class dokterService {
        constructor($http, $q, $rootScope, $cookies, md5) {
            this.http = $http;
            this.q = $q;
            this.rootScope = $rootScope;
            this.cookies = $cookies;
            this.md5 = md5;
            this.urlServer = 'http://192.168.11.117:8082';
        }

        /**
         * Mengambil seluruh data dokter.
         */
        getAllDokters() {
            var q = this.q.defer();
            this.http.get(`${this.urlServer}/dokter`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        getDokterById(id) {
            var q = this.q.defer();
            this.getAllDokters()
                .then((res) => {
                    let _res = res.find((dataDokter) => {
                        return dataDokter.idDok === id;
                    });
                    q.resolve(_res);
                });
            return q.promise;
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

        /**
         * Menambah dokter.
         * @param {Object} data - Data dokter.
         * @returns {Object} - Status.
         */
        addNewDokter(data) {
            var q = this.q.defer();
            this.http.post(`${this.urlServer}/registrasi`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Autentikasi dokter. Set email dan password ke cookie.
         * @param {String} email - Email dokter.
         * @param {String} password - Password dokter.
         * @returns {Boolean} - True jika berhasil login, dan sebaliknya.
         */
        auth(email, password) {
            password = this.md5.createHash(password);

            let q = this.q.defer(),
                _res = false;
            this.http.post(`${this.urlServer}/login`, { email, password })
                .then((res) => {
                    res = res.data;

                    // set rootScope for default data
                    this.rootScope.globals = {
                        currentUser: {
                            id: res.id,
                            email: res.username,
                            token: res.token,
                            role: res.role
                        }
                    };

                    // set cookie for 1 week
                    let cookieExp = new Date();
                    cookieExp.setDate(cookieExp.getDate() + 7);
                    this.cookies.putObject('globals', this.rootScope.globals, { expires: cookieExp });

                    // set token for all http request
                    this.http.defaults.headers.common['token'] = res.token;

                    _res = true;
                    q.resolve(_res);
                });
            return q.promise;
        }

        /**
         * Logout akun dokter.
         */
        logout() {
            this.rootScope.globals = {};
            this.cookies.remove('globals');
            this.http.defaults.headers.common['token'] = '';
        }

        /**
         * Ambil list pendaftaran berdasar id dokter yang disimpan di rootScope.
         * @returns {Array} - List pendaftaran.
         */
        getPendaftaranByIdDokter() {
            var q = this.q.defer();
            this.http.get(`${this.urlServer}/pendaftaran/idDokter/${this.rootScope.globals.currentUser.id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Menambah data riwayat.
         * @param {Object} data - Data riwayat dari treatment.
         * @returns {Object} - Status.
         */
        addRiwayat(data) {
            var q = this.q.defer();
            this.http.post(`${this.urlServer}/riwayat`, data)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }

        /**
         * Mengambil data riwayat berdasar id pendaftaran.
         * @param {Number} id - Id pendaftaran.
         */
        getRiwayatByIdPendaftaran(id) {
            var q = this.q.defer();
            this.http.get(`${this.urlServer}/riwayat/idPendaftaran/${id}`)
                .then((res) => {
                    res = res.data;
                    q.resolve(res);
                });
            return q.promise;
        }
    }]);