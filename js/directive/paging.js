eApp.directive("paging", function($parse, $filter) {
    return {
        restrict: 'E',
        scope: {
            inputList: '=',
            outputList: '=',
            pageSize: '=?',
            trigger: '@?',
            buttons: '@?'
        },
        link: function(scope,elem,attrs) {
            
            var vm = scope;

            vm.$watch('currentPage + trigger', function(){
                compulateRange();
                vm.begin = (vm.currentPage-1) * vm.pageSize;
                vm.outputList = $filter('limitTo')(vm.inputList, vm.pageSize, vm.begin);
            });

            // 為了因應查詢結果監聽，但會導致記憶體爆掉
            // 有好的修改方案請提出
            // vm.$watchCollection('inputList',function() {
            //     vm.active(1);
            // });

            // 所以製造一個trigger讓使用者告知何時陣列內容改變
            if(vm.trigger) {
                vm.$watch('trigger',function() {
                    vm.active(1);
                });
            }
            

            vm.active = function(index) {
                vm.currentPage = index;
            };

            function compulateRange() {
                var size = vm.inputList.length;
                vm.total = Math.ceil(size/vm.pageSize);
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
            $scope.pageSize = parseInt($scope.pageSize) || 10;
            // $scope.$parse('trigger');
        },
        template: 
            '<div style="margin-top: 1rem;"> ' +
                '<nav aria-label="Page navigation example">' +
                    '<ul class="pagination pagination-lg text-center" style="justify-content: center">' +
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