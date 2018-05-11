eApp.directive("paging", function($parse) {
    return {
        restrict: 'E',
        scope: {
            list: '=',
            begin: '=',
            limit: '=?',
            buttons: '@?'
        },
        link: function(scope,elem,attrs) {
            
            var vm = scope;

            vm.$watch('currentPage', function(){
                getRange();
                vm.begin = (vm.currentPage-1) * vm.limit;
            });

            vm.$watch('list.length',function() {
                vm.active(1);
            });

            vm.active = function(index) {
                vm.currentPage = index;
            };

            function getRange() {
                vm.size = vm.list.length;
                vm.total = Math.ceil(vm.size/vm.limit);
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
            $scope.limit = parseInt($scope.limit) || 10;
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