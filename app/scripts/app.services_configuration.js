/**
 * Created by lbecken on 8/3/2016.
 *
 * Define module with services configuration
 */
(function() {
  'use strict';

  angular
    .module('app.servicesConfiguration', []);

  angular
    .module('app.servicesConfiguration')
    .constant('SERVICES_CONFIG', {
      'serverUrl': 'localhost:9000'
    })
})();
