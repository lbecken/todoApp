/**
 * Created by lbecken on 8/2/2016.
 * 
 * Implements REST services (CRUD) for ToDo resource 
 */
(function() {
    'use strict';

    angular
        .module('app.todo')
        .factory('ToDo', ToDo);
    
    ToDo.$inject = ['$resource','SERVICES_CONFIG'];
    function ToDo($resource, SERVICES_CONFIG) {
        return $resource('http://' + SERVICES_CONFIG['serverUrl'] + '/todo/:id',{id:'@id'},{
            update: {
                method: 'PUT'
            }
        });
    }
})();
