(function () {

    function service() {



        function _createTestData(item, branchLength, levelsLength) {
            item.items.length = 0;
            function step(level, parent) {
                level++;
                for (var i = 0; i < branchLength; i++) {
                    var tm = {};
                    var id = item.items.length + 1;
                    tm[item.idFieldName] = id;
                    tm[item.idpFieldName] = parent;
                    tm[item.nameFieldName] = item.nameFieldName + "_" + id;
                    item.items.push(tm);
                    if (level < levelsLength) {
                        step(level, id);
                    }
                }
            };

            step(0, 0);
        }

        function _setIndex(item) {
            var index = {};
            for (var i = 0; i < item.items.length; i++) {
                var id = item.items[i][item.idFieldName];
                index[id] = i;
            }
            item.index = index;
        }

        function _setBranches(item) {
            var branches = {};
            for (var i = 0; i < item.items.length; i++) {
                var idp = item.items[i][item.idpFieldName];
                var branch = branches[idp];
                if (!branch) {
                    branch = { items: [], opened: false, level: 0 };
                    branches[idp] = branch;
                }
                branch.items.push(item.items[i]);
            }
            item.branches = branches;
        }

        function _setLevels(item) {

            function step(id, level) {
                var branch = item.branches[id];
                if (branch) {
                    branch.level = level;
                    for (var i = 0; i < branch.items.length; i++) {
                        var idSub = branch.items[i][item.idFieldName];
                        step(idSub, level + 1);
                    }
                }
            }
            step(item.idRootBranch, 0);
        }

        function _open(item, id) {
            if (item.branches[id]) {
                item.branches[id].opened = true;
            }
            var parent = item.items[item.index[id]];
            if (parent) {
                var idp = parent[item.idpFieldName];
                if (idp != id) {
                    _open(item, idp);
                }
            }
        }


        function _close(item) {
            for (var i in item.branches) {
                item.branches[i].opened = false;
            }
        }

        this.items = [];

        this.get = function (id) {
            var self = this;
            if (!id) {
                id = self.items.length;
                self.items.push({
                    id: id, idFieldName: "id", idpFieldName: "idp", nameFieldName: "nm", idRootBranch: 0
                    , items: [], index: {}, branches: {}
                    , createTestData: function (branchLength, levelsLength) { _createTestData(this, branchLength, levelsLength); }
                    , setIndex: function () { _setIndex(this); }
                    , setBranches: function () { _setBranches(this); }
                    , setLevels: function () { _setLevels(this); }
                    , open: function (id) { _open(this, id); }
                    , close: function () { _close(this); }
                });
            }
            return self.items[id];

        };

        this.test = function () { return "treeServiceTest"; };

        this.parseBranches = function (items) {
            var branches = {};
            for (var i = 0; i < items.length; i++) {
                if (!branches[items[i].idp]) {
                    branches[items[i].idp] = { list: [], opened: false };
                }
                branches[items[i].idp].list.push(items[i]);
            }
            return branches;
        };

    }

    angular.module('app').service('TreeService', service);

})();