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

// service
require('../services/admin.service');
require('../services/dokter.service');

// component
require('../components/login/login');
require('../components/register/register');
require('../components/admin/admin');
require('../components/admin-table-patients/admin-table-patients');
require('../components/admin-table-services/admin-table-services');
require('../components/admin-registration-patient/admin-registration-patient');
require('../components/admin-update-patient/admin-update-patient');
require('../components/admin-add-service/admin-add-service');
require('../components/admin-update-service/admin-update-service');
require('../components/dokter/dokter');
require('../components/dokter-table-patients/dokter-table-patients');