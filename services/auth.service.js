(function () {
    'use strict';

    angular
        .module('smartdokter')
        .service('Auth', Auth);

    Auth.$inject = ['$http', '$q', '$rootScope', '$cookies', 'md5'];
    function Auth($http, $q, $rootScope, $cookies, md5) {
        const URL_SERVER = 'http://192.168.11.117:8082';

        // Seluruh method di service
        this.login = login;
        this.logout = logout;
        this.getCurrentUser = getCurrentUser;

        /**
         * Autentikasi dokter. Set email dan password ke cookie.
         * @param {String} email - Email dokter.
         * @param {String} password - Password dokter.
         * @returns {Boolean} - True jika berhasil login, dan sebaliknya.
         */
        function login(email, password) {
            password = md5.createHash(password);

            let q = $q.defer();
            $http.post(`${URL_SERVER}/login`, { email, password })
                .then((res) => {
                    res = res.data;

                    // set rootScope for default data
                    $rootScope.globals = {
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
                    $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });

                    // set token for all http request
                    $http.defaults.headers.common['token'] = res.token;

                    q.resolve(true);
                })
                .catch(() => {
                    alert('Login failed!');
                });
            return q.promise;
        }

        /**
         * Logout akun dokter.
         */
        function logout() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common['token'] = '';
        }

        /**
         * Mengambil data current user dari $rootScope.
         */
        function getCurrentUser() {
            if ($rootScope.globals.hasOwnProperty('currentUser')) {
                return $rootScope.globals.currentUser;
            } else {
                return {};
            }
        }

    }
})();