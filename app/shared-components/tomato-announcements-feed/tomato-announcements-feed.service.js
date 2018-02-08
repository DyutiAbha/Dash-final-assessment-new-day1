//Add your code here.
(function() {
    'use strict';

    angular
        .module('app')
        .factory('tomatoAnnouncementsFeedService', tomatoAnnouncementsFeedService);

    tomatoAnnouncementsFeedService.$inject = [];

    function tomatoAnnouncementsFeedService() {
        var service = {
            getOwnerInfo: getOwnerInfo
        };

        return service; 

        function getOwnerInfo(announcementsData, ownersData) {
            _(announcementsData).map(function(item, itemId) {
                item['Owner'] = _(ownersData).filter({ID: item.OwnerID}).value()[0].Title;
            }).value();
            
            return announcementsData;
        }
    }
})();
