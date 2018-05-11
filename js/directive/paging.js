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
            scope.currentPage = 1;
            scope.range = [];
            scope.$watch('currentPage',function(){
                scope.range = getRange();
            });
            scope.active = function(index) {
                scope.currentPage = index;
                scope.begin = (index-1) * scope.limit;
            };
            function getRange() {
                var start = (scope.currentPage - 2 > 0) ? scope.currentPage - 2 : 1;
                var end = (scope.currentPage + 2 < scope.total) ? scope.currentPage + 2 : scope.total;
                end = end - start < 5 ? start + 4 > scope.total ? scope.total : start + 4 : end;
                start = end - start < 5 ? end - 4 > 0 ? end - 4 : 1 : start;
                var range = [];
                for (var i = start; i <= end; i ++) {
                    range.push(i);
                }
                return range;
            };
        },
        controller: function($scope, $element) {
            if($scope.list instanceof Array) {
                $scope.size = $scope.list.length;
                $scope.limit = parseInt($scope.limit) || 10;
                $scope.total = Math.ceil($scope.size/$scope.limit);
            }
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