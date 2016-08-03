(function() {
    'use strict';

    angular
        .module('app.todo')
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('todo',{
            url:'/todo',
            templateUrl:'app/features/todoList/views/todo-list.html',
            controller:'ToDoListController',
            controllerAs:'vm'
        }).state('viewTodo',{
            url:'/todo/:id/view',
            templateUrl:'app/features/todoList/views/todo-view.html',
            controller:'ToDoViewController',
            controllerAs: 'vm'
        }).state('newTodo',{
            url:'/todo/new',
            templateUrl:'app/features/todoList/views/todo-add.html',
            controller:'ToDoCreateController',
            controllerAs: 'vm'
        }).state('editTodo',{
            url:'/todo/:id/edit',
            templateUrl:'app/features/todoList/views/todo-edit.html',
            controller:'ToDoEditController',
            controllerAs: 'vm'
        });
    }


})();
