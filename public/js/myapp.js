angular.module('myApp',[])
    .controller('tableController',['$http', function ($http) {
        var vm = this;
        vm.words = [];
        vm.contains = '';
        vm.limit = 5;
        vm.skip = 0;
        vm.skipEnd = 0;
        vm.sortFields = ['Word', 'First', 'Last', 'Length',
            'Vowels', 'Consonants'];
        vm.sortField ="Word";
        vm.direction = "asc";
        vm.getWords = function() {
            $http({url: '/words', method:"GET",
                params: { limit: vm.limit,
                          skip:vm.skip,
                          sort:vm.sortField,
                          direction:vm.direction,
                          contains:vm.contains
                }})
            .success(function(data,status,headers,config) {
                vm.words = data;
                vm.skipEnd = vm.skip + vm.words.length;
            })
            .error(function(data,status,headers,config) {
                vm.words = [];
                vm.skipEnd = vm.skip + vm.words.length;
            });
        };
        vm.find = function(){
            vm.skip = 0;
            vm.getWords();
        };
        vm.next = function(){
            if(vm.words.length == vm.limit){
                vm.skip += parseInt(vm.limit);
                vm.getWords();
            }
        };
        vm.prev = function(){
            if(vm.skip > 0){
                if(vm.skip >= parseInt(vm.limit)){
                    vm.skip -= parseInt(vm.limit);
                } else{
                    vm.skip = 0;
                }
                vm.getWords();
            }
        };
        vm.getWords();
    }])
    .directive('myTabs', function() {
        // var vm = this;
        return { restrict: 'E', transclude: true,
            scope: {},
            controller: function($scope) {
                var panes = $scope.panes = [];
                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };
                this.addPane = function(pane) {
                    if (panes.length == 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                };
            },
            templateUrl: '/public/html/my_tabs.html'
        };
    })
    .directive('myPane', function() {
        // var vm = this;
        return { require: '^myTabs', restrict: 'E',
            templateUrl: '/public/html/my_pane.html',
            transclude: true, scope: { title: '@' },
            link: function(scope,element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            }
        };
    })