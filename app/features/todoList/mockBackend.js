/**
 * Created by lbecken on 8/1/2016.
 *
 * Mocks data returned by the server. Client uses $resource (REST API)
 * Mock ToDo data returned by REST service ($resource). 
 * Transparent to client.
 */
(function() {
    'use strict';

    angular.module('app.todo.data',['ngMockE2E']);

    angular
        .module('app.todo.data')
        .run(TodoBackend);

    TodoBackend.$inject = ['$httpBackend', 'ServerModel'];
    function TodoBackend($httpBackend, ServerModel) {

        // ------------------------------------------------------------------
        // Define URL patterns for mock data
        // NOTE: Order matters: from more specific to more generic
        // ------------------------------------------------------------------


        // templates: pass through
        $httpBackend.whenGET(/views\//).passThrough(); // handled by web server: templates

        // GET /todo/123
        $httpBackend.whenGET(/\/todo\/\d+/).respond(function (method, url, data) {
            // parse the matching URL to pull out the id (eg: http://localhost:8080/todo/:id)
            var id = url.split('/')[4];

            var todo = ServerModel.findOne(id);

            return [200, todo, {}];
        });

        // GET /todo
        $httpBackend.whenGET(/\/todo/).respond(function (method, url, data) {
            var todoList = ServerModel.findAll();
            return [200, todoList, {}];
        });


        // Add new todo
        // POST /todo
        $httpBackend.whenPOST(/\/todo/).respond(function (method, url, data) {
            var params = angular.fromJson(data);

            var todo = ServerModel.addOne(params);

            // get the id of the new resource to populate the Location field
            var id = todo._id;

            return [201, todo, {Location: '/todo/' + id}];
        });

        // this is the update of an existing resource (ngResource does not send PUT for update)
        $httpBackend.whenPOST(/\/todo\/\d+/).respond(function (method, url, data) {
            var params = angular.fromJson(data);

            // parse the matching URL to pull out the id (/todo/:id)
            var id = url.split('/')[4];

            var todo = ServerModel.updateOne(id, params);

            return [201, todo, {Location: '/todo/' + id}];
        });

        // this is the update of an existing resource (sending PUT for update)
        // PUT /todo
        $httpBackend.whenPUT(/\/todo/).respond(function (method, url, data) {
            var params = angular.fromJson(data);

            var todo = ServerModel.updateOne(params._id, params);

            return [201, todo, {Location: '/todo/' + params._id}];
        });

        // this is the delete of an existing resource
        // DELETE /todo/123
        $httpBackend.whenDELETE(/\/todo\/\d+/).respond(function (method, url, data) {
            // parse the matching URL to pull out the id (/todo/:id)
            var id = url.split('/')[4];

            ServerModel.deleteOne(id);

            return [204, {}, {}];
        });

    };

})();
