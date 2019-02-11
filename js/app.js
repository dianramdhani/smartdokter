angular.module('smartdokter', ['ui.router']);

require('../configs/app.config');
require('../configs/admin.config');
require('../components/login/login');
require('../components/register/register');
require('../components/admin/admin');
require('../components/admin-table-patients/admin-table-patients');
require('../components/admin-table-services/admin-table-services');
require('../components/dokter/dokter');