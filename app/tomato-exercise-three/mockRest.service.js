(function() {
	"use strict";

	angular
		.module("app.shared-services")
		.factory("mockRestService", mockRestService);

	mockRestService.$inject = ["$http", "$q"];

	function mockRestService($http, $q) {

		var service = {
            getListItems: getListItems
		};

		return service;

		function getListItems(listTitle, queryParams) {
            var dfd = $q.defer();
            $http.defaults.headers.post['X-HTTP-Method'] = "";
            var restUrl = "../_api/web/lists/getbytitle('" + listTitle + "')/items" + queryParams;
            $http.get(restUrl).success(function(data) {
                dfd.resolve(data.d.results);
            }).error(function(data) {
                dfd.reject("error, cannot get items"); 
            });
            return dfd.promise;
		}

	}
})();


/* ************** PART II EXERCISE**************  */


//My sample Code here : : Excercise 1

 function getWorkPlan() {
            return restService.getListItems("Work Plan", {
                select: "ID,Status/ID,Function/ID,Owner,Function/Title,Title,Status/Title,Status/ColorCode,TaskType",
                expand: "Function,Status",
                top: 2000,
                orderby:"DueDate Asc"
            }).then(getWorkPlanComplete);

            function getWorkPlanComplete(response) {
                return response;
            }
        } 

function getRisknIssues() {
            return restService.getListItems("Risks and Issues", {
                select: "ID,Function/ID,Owner,Function/Title,Title,Status/ColorCode,Description",
                expand: "Function,Status",
                top: 500,
                filter: "Status eq 'High Risk'"
            }).then(getIssueComplete);

            function getIssueComplete(response) {
                return response;
            }
        } 

/*************** INSERT ANSWERS BELOW IN THE COMMENTED AREA**************
 
ANTICIPATED DATA FORMAT: Exercise 1 

Work plan--------------
results:[{__metadata: {id: "Web/Lists(guid'b68f5eb8-1359-44dd-9c2a-d042cee83dee')/Items(1023)",…},…}] 
0:{__metadata: {id: "Web/Lists(guid'b68f5eb8-1359-44dd-9c2a-d042cee83dee')/Items(1023)",…},…} 
"25" 
ID:1023 
Status_ID:{__deferred: {,…}} 
Fuction_ID:14
Owner:Dyuti
Function_Title:Test Function
Title:Sample data
Status/ColorCode:red
Function:{__deferred: {,…}} 
TaskType:Task
__metadata:{id: "Web/Lists(guid'b68f5eb8-1359-44dd-9c2a-d042cee83dee')/Items(1023)",…} 



Issues and Risks--------------
results:[{__metadata: {id: "Web/Lists(guid'b68f5eb8-1359-44dd-9c2a-d042cee83dee')/Items(1023)",…},…}] 
0:{__metadata: {id: "Web/Lists(guid'b68f5eb8-1359-44dd-9c2a-d042cee83dee')/Items(1023)",…},…} 
"25" 
ID:1023 
Fuction_ID:14
Owner:Dyuti
Function_Title:Test Function
Title:Sample data
Status/ColorCode:red
Description:What a Task...
__metadata:{id: "Web/Lists(guid'b68f5eb8-1359-44dd-9c2a-d042cee83dee')/Items(1023)",…} 





































 */