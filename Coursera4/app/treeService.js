(function () {

    /*  */
    function TreeService() {


        function _setIndex(item) {
            var _index = {};
            for (var i = 0; i < item.data.length; i++) {
                if (item.data[i][item.idFieldName]) {
                    var id = item.data[i][item.idFieldName];
                    _index[id] = i;
                }
            }
            item.dataIndex = _index;
        };

        function _setBranches(item) {
            var branches = {};
            var items = item.data;
            var parentIdFieldName = item.idpFieldName;
            for (var i = 0 ; i < items.length; i++) {
                var parent = items[i][parentIdFieldName];
                if (!branches[parent]) {
                    branches[parent] = { items: [], open: false, level: 0 };
                }
                branches[parent].items.push(items[i]);
            }
            item.branches = branches;
            item.branches[item.rootBranchId].opened = true;
        };

        function _setDisplayBranches(item, start, end) {
            var index = 0;
            item.displayBranches = {};
            function step(id) {
                var branch = item.branches[id];
                //console.log("setDisplayBranches branch:", branch);
                if (branch.opened) {
                    
                    var displayBranch = item.displayBranches[id];
                    if (!displayBranch) {
                        displayBranch = { items: [] };
                        item.displayBranches[id] = displayBranch;
                    }
                    
                    for(var i = 0; i < branch.items.length; i++){
                        index ++;
                        if (index > start && index < end) {
                            
                            var tm = branch.items[i];
                            displayBranch.items.push(tm);
                            var subBranchId = tm[item.idFieldName];
                            if (item.branches[subBranchId]) {
                                console.log("setDisplayBranches subBranchId:", subBranchId);
                                step(subBranchId);
                            }
                        }
                    }
                }
            }
            step(item.rootBranchId);
        }

        function _setLevel(item) {
            item.rendererAll.length = 0;
            function step(branch, level) {
                branch.level = level;
                for (var i = 0; i < branch.items.length; i++) {
                    var tm = branch.items[i];
                    tm.level = level;
                    item.rendererAll.push(tm);
                    var sub = item.branches[tm.id];
                    if (sub) {
                        step(sub, level + 1);
                    }
                }
            }
            var root = item.branches[item.rootBranchId];
            step(root, 0);
        }

        function _createTestData(item, branchLength, levelsLength) {
            function step(branchLength, levelsLength, parent, level) {
                level++;
                for (var i = 0; i < branchLength; i++) {
                    var id = item.data.length + 1;
                    item.data.push({ "id": id, "idp": parent, "nm": id + "nm" });
                    if (level < levelsLength) {
                        step(branchLength, levelsLength, id, level);
                    }
                }
            };
            step(branchLength, levelsLength, 0, 0);
        }

        function _closeAllBranches(item) {
            for (var i in item.branches) {
                item.branches[i].opened = false;
            }
        }

        function _openBranch(item, id) {
            var branch = item.branches[id];
            branch.opened = !branch.opened;

            /*
            _closeAllBranches(item);
            var branchesToOpen = [];
            function step(_id) {
                var branch = item.branches[_id];
                if (branch) {
                    branch.opened = true;
                    var ndx = item.index[_id];
                    if (ndx) {
                        var parentId = item.items[ndx][item.idpFieldName];
                        var parent = item.branches[parentId];
                        if (parent) {
                            console.log(parentId);
                            step(parentId);
                        }
                    }

                }

            }
            step(id);
             */

        }

        this.items = [];

        this.getItem = function (index) {
            var self = this;
            if (index == undefined) {
                index = self.items.length;
                self.items.push({
                    setIndex: function () { _setIndex(this); }
                    , setBranches: function () { _setBranches(this); }
                    , setLevel: function () { _setLevel(this); }
                    , setDisplayBranches: function(start, end){_setDisplayBranches(this, start, end); }
                    , createTestData: function (branchLength, levelsLength) { _createTestData(this, branchLength, levelsLength); }
                    , closeAllBranches: function () { _closeAllBranches(this); }
                    , openBranch: function (id) { _openBranch(this, id); }
                    , index: index, data: [], dataIndex: {}, branches: {}, displayBranches: {}, rendererAll: [], rendereWindow: []
                    , idFieldName: "id", idpFieldName: "idp", rootBranchId: 0
                });
            }
            return self.items[index];
        };

    }

    angular.module('app').service('TreeService', TreeService);

})();