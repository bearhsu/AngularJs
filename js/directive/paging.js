/**
 * 1. 因inputList配合filter常常變動造成系統不穩定 必須解決(console 錯誤一堆、修改資料時網頁當機)
 * https://code.angularjs.org/1.4.6/docs/error/$rootScope/infdig
 * 
 * (目前方案是外界必須準備已filter後的陣列)
 * 
 * 2. buttons功能待完成
 * 
 * 3. 優化效能
 * 
 */
eApp.directive("paging",function($parse, $filter) {
    return {
        restrict: 'E',
        transclude: 'true',
        scope: {
            inputList: '=',
            showPageSize: '=?',
            outputList: '=',
            pageSize: '=',
            trigger: '@?',
            buttons: '@?'
        },
        link: function(scope,elem,attrs) {
            
            var vm = scope;
            
            vm.$watchGroup(['currentPage', 'trigger','pageSize'], function(){
                compulateRange();
                vm.begin = (vm.currentPage-1) * vm.pageSize;
                vm.outputList = $filter('limitTo')(vm.inputList, vm.pageSize, vm.begin);
            });

            // 製造一個trigger讓使用者告知何時陣列內容改變
            vm.$watchGroup(['trigger', 'pageSize'],function() {
                vm.active(1);
            });
            
            vm.active = function(index) {
                vm.currentPage = index;
            };

            function compulateRange() {
                var size = vm.inputList.length;
                //vm.pageSize 會莫名其妙undefined
                vm.total = Math.ceil(size/vm.pageSize) || 1;
                // 待修改 (利用buttons數來計算該顯示的buttons數)
                var start = (vm.currentPage - 2 > 0) ? vm.currentPage - 2 : 1;
                var end = (vm.currentPage + 2 < vm.total) ? vm.currentPage + 2 : vm.total;
                end = end - start < 5 ? start + 4 > vm.total ? vm.total : start + 4 : end;
                start = end - start < 5 ? end - 4 > 0 ? end - 4 : 1 : start;
                
                vm.range = [];
                for (var i = start; i <= end; i ++) {
                    vm.range.push(i);
                }
            };
        },
        controller: function($scope, $element) {
            $scope.currentPage = 1;
            $scope.begin = 0;
            $scope.pageSize = parseInt($scope.pageSize);
        },
        template: 
            '<div ng-if="showPageSize" style="font-size: 14px;">' +
                '<lebel for="pageSize">每頁資料數：</lebel>' +                                    /* 觀念待釐清 */
                '<input name="pageSize" type="number" max="{{inputList.length}}" min="1" ng-model="$parent.pageSize"></input>' +
            '</div>' +
            '<div ng-transclude></div>' + 
            '<div style="margin-top: 1rem;"> ' +
                '<nav aria-label="Page navigation example">' +
                    '<ul class="pagination pagination-lg justify-content-center">' +
                        '<li class="page-item" ng-click="active(1)">' +
                            '<a class="page-link" aria-label="Previous">' +
                                '<span aria-hidden="true">&laquo;</span>' +
                                '<span class="sr-only">Previous</span>' +
                            '</a>' +
                        '</li>' +
                        '<li class="page-item" ng-class="{active: n==currentPage}" ng-repeat="n in range" ng-click="active(n)"><div class="page-link">{{n}}</div></li>' +
                        '<li class="page-item" ng-click="active(total)">' +
                            '<a class="page-link" aria-label="Next">' +
                                '<span aria-hidden="true">&raquo;</span>' +
                                '<span class="sr-only">Next</span>' +
                            '</a>' +
                        '</li>' +
                    '</ul>' +
                '</nav>' +
            '</div>'
    };
});