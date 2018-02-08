// Add your code here, create additional directives if needed.
(function() {
    'use strict';
 
    angular
        .module('app')
        .directive('tomatoAnnouncementsFeed', tomatoAnnouncementsFeed);
 
    function tomatoAnnouncementsFeed() {
        var directive = {
            scope: {
                announcements: "<",
                owners: "<"
            },
            restrict: 'E',
            controller: TomatoAnnouncementsFeedController,
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: './app/shared-components/tomato-announcements-feed/tomato-announcements-feed.directive.html'
        };
 
        return directive;
    }
 
    TomatoAnnouncementsFeedController.$inject = ['tomatoAnnouncementsFeedService', '$sce'];
 
    function TomatoAnnouncementsFeedController(tomatoAnnouncementsFeedService, $sce) {
        var vm = this;
        vm.filteredData = [];
        vm.searchText = "";
        vm.maxPerPage = 15;
        vm.filterTableFunction=filterTableFunction;
        vm.AllType = "All";
        vm.selectedAnnouncementType = vm.AllType;
        activate(); 

        function activate() {
            getFilteredData(vm.announcements, vm.owners);
                                        
        }

        function getFilteredData(announcementsData, ownersData) {
            vm.filteredData = tomatoAnnouncementsFeedService.getOwnerInfo(announcementsData, ownersData);
         
        }
        
      function filterTableFunction(){
            vm.filterModel

            
      }
    };
//unique values in filter drop-down

    angular.module('app').filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      
      items = newItems;
         }
    return items;
  };
});
 })();
 