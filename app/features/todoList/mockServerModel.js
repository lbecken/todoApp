/**
 * Created by lbecken on 8/2/2016.
 * 
 * Helper class.
 * Service to manage the API (CRUD) to access mocked data on client side
 */
(function() {
    'use strict';

    angular
        .module('app.todo.data')
        .service('ServerModel', ServerModel);

    function ServerModel() {

        // initial data set
        this.data = [
            {_id: 0, title: 'Mow lawn', description: 'Should be done by 13th May.'},
            {_id: 1, title: 'Wash car', description: 'Use MkUiars wax!'},
            {_id: 2, title: 'Buy groceries', description: 'Apples, Bananas and some tomatoes.'}
        ];


        this.getData = function() {
            return this.data;
        };

        this.setData = function(data) {
            this.data = data;
        };

        /**
         * find an item for a given id
         * @param id
         * @returns {*}
         */
        this.findOne = function(id) {
            var list = $.grep(this.getData(), function(element, index) {
                return (element._id == id);
            });
            if(list.length === 0) {
                return {};
            }
            // even if list contains multiple items, just return first one
            return list[0];
        };

        /**
         * Return all items
         */
        this.findAll = function() {
            return this.getData();
        };

        // add a new data item that does not exist already
        // must compute a new unique id and backfill in
        this.addOne = function(dataItem) {
            // must calculate a unique ID to add the new data
            var newId = this._nextId();
            dataItem._id = newId;
            this.data.push(dataItem);
            return dataItem;
        };

        /**
         * Return next available id
         */
        this._nextId = function() {
            // list is empty
            if(this.getData().length === 0) {
              return 0;
            }

            // find all current ids
            var currentIds = $.map(this.getData(), function(dataItem) { return dataItem._id; });
            // since id is numeric, and we will treat like an autoincrement field, find max
            var maxId = Math.max.apply(Math, currentIds);
            // increment by one
            return maxId + 1;
        };

        /**
         * Update item in list
         * @param id data item id
         * @param dataItem
         * @returns true - item was updated, false - item was not updated
         */
        this.updateOne = function(id, dataItem) {
            // find the data item that matches that id
            var dataList = this.getData();
            var match = null;
            for (var i=0; i < dataList.length; i++) {
                if(dataList[i]._id == id) {
                    match = dataList[i];
                    break;
                }
            }
            if(!angular.isObject(match)) {
                return {};
            }
            angular.extend(match, dataItem);
            return match;
        };

        /**
         * Delete item in list
         * @param id data item id
         * @returns true - item was deleted, false - item was not deleted
         */
        this.deleteOne = function(id) {
            // find the data item that matches that id
            var dataList = this.getData();
            var match = false;
            for (var i=0; i < dataList.length; i++) {
                if(dataList[i]._id == id) {
                    match = true;
                    dataList.splice(i, 1);
                    break;
                }
            }
            return match;
        };

    };
})();
