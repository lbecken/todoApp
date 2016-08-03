/**
 * Created by lbecken on 7/29/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.todo')
        .controller('ToDoListController', ToDoListController)
        .controller('ToDoViewController', ToDoViewController)
        .controller('ToDoCreateController', ToDoCreateController)
        .controller('ToDoEditController', ToDoEditController);

    /** 
     * Controller for list view
     */
    ToDoListController.$inject = ['ToDo'];
    function ToDoListController( ToDo) {
        var self = this;
        this.todoList = ToDo.query();

        this.remove = function(todoItem) {
            todoItem.$delete({id:todoItem._id},function(){
                Materialize.toast("Todo item deleted", 1000);
                self.todoList = ToDo.query();
            });
        }
    }

  /**
   * Controller for details view
   */
    ToDoViewController.$inject = ['$stateParams', 'ToDo'];
    function ToDoViewController($stateParams, ToDo) {
        this.todo = ToDo.get({id:$stateParams.id});
    }

  /**
   * Controller for add view
   */
    ToDoCreateController.$inject = ['$state','ToDo'];
    function ToDoCreateController($state,ToDo) {
        var self = this;
        this.todo = new ToDo();

        this.add = function(){
            self.todo.$save(function(){
                Materialize.toast("Todo item added", 1000);
                $state.go('todo');
            });
        }
    }

  /**
   * Controller for edit view
   */
  ToDoEditController.$inject = ['$state', '$stateParams', 'ToDo'];
    function ToDoEditController($state, $stateParams, ToDo) {
        var self = this;

        this.update = function(){
            self.todo.$update(function(){
                Materialize.toast("Todo item updated", 1000);
                $state.go('todo');
            });
        };

        this.load = function(){
            self.todo = ToDo.get({id:$stateParams.id});
        };

        this.load();
    }

})();
