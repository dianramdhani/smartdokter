angular.module('smartdokter', ['ui.router']);

// config
require('../configs/app.config');
require('../configs/admin.config');

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
require('../components/dokter/dokter');