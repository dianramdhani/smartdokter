angular.module('smartdokter', ['ui.router', 'ngCookies', 'angular-md5'])
    .run(['$rootScope', '$cookies', '$location', '$http', function ($rootScope, $cookies, $location, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = angular.fromJson($cookies.get('globals')) || {};

        // jika telah login
        if ($rootScope.globals.currentUser)
            $http.defaults.headers.common['token'] = $rootScope.globals.currentUser.token;

        $rootScope.$on('$locationChangeStart', () => {
            let restrictedPage = ['/login', '/register'].find((path) => {
                return $location.path() === path;
            }),
                loggedIn = $rootScope.globals.currentUser;
            if (typeof restrictedPage === 'undefined' && !loggedIn) {
                $location.path('/login');
            }
        });
    }]);

// config
require('../configs/app.config');
require('../configs/admin.config');
require('../configs/dokter.config');

// update service
require('../services/auth.service');
require('../services/dokter.service');
require('../services/obat.service');
require('../services/pasien.service');
require('../services/pendaftaran.service');
require('../services/riwayat.service');
require('../services/transaksi-obat.service');

// component
require('../components/login/login');
require('../components/register/register');
require('../components/admin/admin');
require('../components/resume-patient/resume-patient');
require('../components/admin-table-patients/admin-table-patients');
require('../components/admin-table-services/admin-table-services');
require('../components/admin-registration-patient/admin-registration-patient');
require('../components/admin-update-patient/admin-update-patient');
require('../components/admin-add-service/admin-add-service');
require('../components/admin-update-service/admin-update-service');
require('../components/admin-table-obat/admin-table-obat');
require('../components/admin-add-obat/admin-add-obat');
require('../components/admin-table-payments/admin-table-payments');
require('../components/admin-payment-detail/admin-payment-detail');
require('../components/dokter/dokter');
require('../components/dokter-table-patients/dokter-table-patients');
require('../components/dokter-add-treatment/dokter-add-treatment');