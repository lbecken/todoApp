/**
 * Created by lbecken on 7/28/2016.
 *
 * @ngdoc overview
 * @name todoApp
 * @description
 * # Todo app to manage a list of todo tasks. Implements the CRUD oparations.
 *
 * Main module of the application.
 */

(function() {
    'use strict';

    angular.module('app',[
        // Angular modules
        'ngResource',

        // Third-party modules
        'ui.materialize',
        'ui.router',

        // Custom application modules
        'app.servicesConfiguration',
        'app.todo'
    ])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push(['$q', function($q) {
        return {
          'responseError': function(rejection) {
            // reject
            Materialize.toast('response error', 1000, 'red');
            return $q.reject(rejection);
          }
        }
      }]);
    }])
    .run(['$state', function($state) {
        // go to "todo" page
        $state.go('todo');
    }]);

})();
