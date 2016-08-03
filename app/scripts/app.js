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
        'app.todo'
    ])
      .constant('$CONFIG', {
        'serverUrl': 'localhost:9000'
      })
    .run(function($state) {
      // go to "todo" page
      $state.go('todo');
    });

})();
