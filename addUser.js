Adduser.js



/**
* @author: Ashutosh Behera
*/
(function() {
      'use strict';
      var app = angular.module('addUser', []);

      app
                  .controller(
                              'addUserController',
                              function($rootScope, $scope, $http, $filter, $location,
                                          LoadingService, ngDialog) {
                                    var user = $rootScope.user.empId;

                                    $scope.popupMsg = '';

                                    $scope.addedUser = function() {
                                          ngDialog.openConfirm({
                                                template : 'addedUser.html',
                                                scope : $scope
                                          // Pass the scope object if you need to access in
                                          // the template
                                          }).then(function(value) {
                                                // save the contact form
                                          }, function(value) {
                                                // Cancel or do nothing
                                          });
                                    };

                                    $scope.failedToAdd = function() {
                                          ngDialog.openConfirm({
                                                template : 'failedToAdd.html',
                                                scope : $scope
                                          // Pass the scope object if you need to access in
                                          // the template
                                          }).then(function(value) {
                                                // save the contact form
                                          }, function(value) {
                                                // Cancel or do nothing
                                          });
                                    };

                                    $scope.getAllTeams = function() {
                                          $rootScope.LoadingService = true;

                                          $http.get('../employee/getAllTeams').success(
                                                      function(response) {
                                                            console.log("Get All Teams");
                                                            $rootScope.LoadingService = false;
                                                            $scope.teamNameList = response;
                                                            console.log(response);
                                                      }).error(
                                                      function(data, status, headers, config) {
                                                            $rootScope.LoadingService = false;
                                                            console.log("Error event of ng-click");
                                                      });
                                    };

                                    $scope.getAllUserRoles = function() {
                                          $rootScope.LoadingService = true;

                                          $http.get('../employee/getAllUserRoles').success(
                                                      function(response) {
                                                            console.log("Get All User roles");
                                                            $rootScope.LoadingService = false;
                                                            $scope.userRoleList = response;
                                                            console.log(response);
                                                      }).error(
                                                      function(data, status, headers, config) {
                                                            $rootScope.LoadingService = false;
                                                            console.log("Error event of ng-click");
                                                      });
                                    };
                                    $scope.getAllUserAccounts = function() {
                                          $rootScope.LoadingService = true;

                                          $http.get('../employee/getAllUserAccount').success(
                                                      function(response) {
                                                            console.log("Get All User Account");
                                                            $rootScope.LoadingService = false;
                                                            $scope.userAccountList = response;
                                                            console.log(response);
                                                      }).error(
                                                      function(data, status, headers, config) {
                                                            $rootScope.LoadingService = false;
                                                            console.log("Error event of ng-click");
                                                      });
                                    };
                                    $scope.getAllUserLocation = function() {
                                          $rootScope.LoadingService = true;

                                          $http.get('../employee/getAllUserLocation').success(
                                                      function(response) {
                                                            console.log("Get All User Location");
                                                            $rootScope.LoadingService = false;
                                                            $scope.LocationList = response;
                                                            console.log(response);
                                                      }).error(
                                                      function(data, status, headers, config) {
                                                            $rootScope.LoadingService = false;
                                                            console.log("Error event of ng-click");
                                                      });
                                    };
                                    $scope.getAllUserBillable = function() {
                                          $rootScope.LoadingService = true;

                                          $http.get('../employee/getAllUserBillable').success(
                                                      function(response) {
                                                            console.log("Get All User Billable");
                                                            $rootScope.LoadingService = false;
                                                            $scope.BillableList = response;
                                                            console.log(response);
                                                      }).error(
                                                      function(data, status, headers, config) {
                                                            $rootScope.LoadingService = false;
                                                            console.log("Error event of ng-click");
                                                      });
                                    };
                                    $scope.addNewUser = function() {
                                          console.log($scope.selectedTeam);
                                          var parameters = {
                                                empId : $scope.empId,
                                                empADID : $scope.empADID,
                                                firstName : $scope.firstName,
                                                lastName : $scope.lastName,
                                                userRoleSeq : ($scope.selectedRole == undefined || $scope.selectedRole == 'All') ? "0"
                                                            :$scope.selectedRole,
                                                teamId : ($scope.selectedTeam == undefined || $scope.selectedTeam == 'All') ? "0"
                                                            : $scope.selectedTeam,
                                                AccountSeq : ($scope.selectedAccount == undefined || $scope.selectedAccount == 'All') ? "0"
                                                            : $scope.selectedAccount,
                                                LocationSeq : ($scope.selectedLocation == undefined || $scope.selectedLocation == 'All') ? "0"
                                                            : $scope.selectedLocation,
                                                BillableSeq : ($scope.selectedBillable == undefined || $scope.selectedBillable == 'All') ? "0"
                                                            : $scope.selectedBillable
                                                            
                                          };
                                          var config = {
                                                params : parameters
                                          };

                                          if ($scope.selectedTeam != undefined) {
                                                $rootScope.LoadingService = true;
                                                $http
                                                            .get('../employee/addUser', config)
                                                            .success(
                                                                        function(response) {
                                                                              $rootScope.LoadingService = false;
                                                                              $scope.popupMsg = $scope.empADID;
                                                                              console.log(response,
                                                                                          $scope.empId);
                                                                              $scope.resetAll();
                                                                              if (response == "User successfully added")
                                                                                    $scope.addedUser();
                                                                              else
                                                                                    $scope.failedToAdd();
                                                                        })
                                                            .error(
                                                                        function(data, status, headers,
                                                                                    config) {
                                                                              $rootScope.LoadingService = false;
                                                                              $scope.popupMsg = $scope.empId;
                                                                              console
                                                                                          .log("Error event of ng-click");
                                                                              $scope.failedToAdd();
                                                                        });
                                          } else {
                                                $scope.displayTeamLabel = true;
                                          }
                                    };
                                    if ($scope.selectedAccount != undefined) {
                                          $rootScope.LoadingService = true;
                                          $http
                                                      .get('../employee/addUser', config)
                                                      .success(
                                                                  function(response) {
                                                                        $rootScope.LoadingService = false;
                                                                        $scope.popupMsg = $scope.empADID;
                                                                        console.log(response,
                                                                                    $scope.empId);
                                                                        $scope.resetAll();
                                                                        if (response == "User successfully added")
                                                                              $scope.addedUser();
                                                                        else
                                                                              $scope.failedToAdd();
                                                                  })
                                                      .error(
                                                                  function(data, status, headers,
                                                                              config) {
                                                                        $rootScope.LoadingService = false;
                                                                        $scope.popupMsg = $scope.empId;
                                                                        console
                                                                                    .log("Error event of ng-click");
                                                                        $scope.failedToAdd();
                                                                  });
                                    } else {
                                          $scope.displayAccountLabel = true;
                                    }
                                    if ($scope.selectedRole != undefined) {
                                          $rootScope.LoadingService = true;
                                          $http
                                                      .get('../employee/addUser', config)
                                                      .success(
                                                                  function(response) {
                                                                        $rootScope.LoadingService = false;
                                                                        $scope.popupMsg = $scope.empADID;
                                                                        console.log(response,
                                                                                    $scope.empId);
                                                                        $scope.resetAll();
                                                                        if (response == "User successfully added")
                                                                              $scope.addedUser();
                                                                        else
                                                                              $scope.failedToAdd();
                                                                  })
                                                      .error(
                                                                  function(data, status, headers,
                                                                              config) {
                                                                        $rootScope.LoadingService = false;
                                                                        $scope.popupMsg = $scope.empId;
                                                                        console
                                                                                    .log("Error event of ng-click");
                                                                        $scope.failedToAdd();
                                                                  });
                                    } else {
                                          $scope.displayRoleLabel = true;
                                    }
                              
                                    $scope.empIdNo = false;
                                    $scope.isNumber = function($event) {
                                          if (isNaN(String.fromCharCode($event.keyCode))) {
                                                $event.preventDefault();
                                                $scope.empIdNo = true;
                                          } else {
                                                $scope.empIdNo = false;
                                          }
                                    };

                                    $scope.resetAll = function() {
                                          $scope.empId = "";
                                          $scope.empADID = "";
                                          $scope.firstName = "";
                                          $scope.lastName = "";
                                          $scope.selectedTeam = "";
                                          $scope.selectedRole = "";
                                          $scope.selectedAccount = "";
                                          $scope.selectedLocation = "";
                                          $scope.selectedBillable = "";
                                          $scope.empIdNo = false;
                                          this.myForm.$setPristine();
                                    };
                                    
                                    
                                    
                                    $scope.today = function() {
                                              $scope.dt = new Date();
                                            };
                                            $scope.today();

                                            $scope.clear = function() {
                                              $scope.dt = null;
                                            };

                                            $scope.inlineOptions = {
                                              customClass: getDayClass,
                                              minDate: new Date()
                                            };
//                                          $scope.inlineOptions1 = {
//                                              customClass: getDayClass,
//                                              minDate: new Date()
//                                          };
                                            $scope.dateOptions = {
                                              dateDisabled: disabled,
                                              formatYear: 'yy',
                                              maxDate: new Date(2020, 5, 22),
                                              minDate: new Date(),
                                              startingDay: 0
                                            };
//                                          $scope.dateOptions1 = {
//                                              dateDisabled: disabled,
//                                              formatYear: 'yy',
//                                              maxDate: new Date(2020, 5, 22),
//                                              minDate: new Date(),
//                                              startingDay: 0
//                                          };
//                                          $scope.dateOptions2 = {
//                                              dateDisabled: disabled,
//                                              formatYear: 'yy',
//                                              maxDate: new Date(2020, 5, 22),
//                                              minDate: new Date(),
//                                              startingDay: 0
//                                          };
                                            // Disable weekend selection
                                            function disabled(data) {
                                              var date = data.date,
                                                mode = data.mode;
                                              //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                                              return mode === 'day' && (date.getDay() === 10);
                                            }

                                            $scope.toggleMin = function() {
                                              $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                                              $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                                            };
//                                          $scope.toggleMin = function() {
//                                              $scope.inlineOptions1.minDate = $scope.inlineOptions1.minDate ? null : new Date();
//                                              $scope.dateOptions1.minDate = $scope.inlineOptions1.minDate;
//                                          };
                                          

                                            $scope.open1 = function() {
                                              $scope.popup1.opened = true;
                                            };

                                            $scope.open2 = function() {
                                              $scope.popup2.opened = true;
                                            };
                                            $scope.open3 = function() {
                                                    $scope.popup3.opened = true;
                                            };

                                            $scope.open4 = function() {
                                                    $scope.popup4.opened = true;
                                            };
                                            $scope.open5 = function() {
                                                    $scope.popup5.opened = true;
                                            };

                                            $scope.open6 = function() {
                                                    $scope.popup6.opened = true;
                                            };
                                            $scope.open7 = function() {
                                                    $scope.popup7.opened = true;
                                            };

                                            $scope.open8 = function() {
                                                    $scope.popup8.opened = true;
                                            };
                                            $scope.open9 = function() {
                                                    $scope.popup9.opened = true;
                                            };

                                            $scope.open10 = function() {
                                                    $scope.popup10.opened = true;
                                            };
                                            $scope.setDate = function(year, month, day) {
                                              $scope.startDate = new Date(year, month, day);
                                              $scope.endDate = new Date(year, month, day);
                                            };
                                            $scope.setDate = function(year, month, day) {
                                                $scope.startDate1 = new Date(year, month, day);
                                                $scope.endDate1 = new Date(year, month, day);
                                            };
                                            $scope.setDate = function(year, month, day) {
                                                $scope.startDate2 = new Date(year, month, day);
                                                $scope.endDate2 = new Date(year, month, day);
                                            };
                                            $scope.setDate = function(year, month, day) {
                                                $scope.startDate3 = new Date(year, month, day);
                                                $scope.endDate3 = new Date(year, month, day);
                                            };
                                            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                                            $scope.format = $scope.formats[0];
                                            $scope.altInputFormats = ['M!/d!/yyyy'];

                                            $scope.popup1 = {
                                              opened: false
                                            };

                                            $scope.popup2 = {
                                              opened: false
                                            };
                                            $scope.popup3 = {
                                                opened: false
                                            };

                                            $scope.popup4 = {
                                                opened: false
                                          };
                                            $scope.popup5 = {
                                                opened: false
                                          };

                                            $scope.popup6 = {
                                                opened: false
                                            };
                                            $scope.popup7 = {
                                                opened: false
                                            };

                                            $scope.popup8 = {
                                                opened: false
                                            };
                                            $scope.popup9 = {
                                                opened: false
                                            };

                                            $scope.popup10 = {
                                                opened: false
                                            };
                                            var tomorrow = new Date();
                                            tomorrow.setDate(tomorrow.getDate() + 1);
                                            var afterTomorrow = new Date();
                                            afterTomorrow.setDate(tomorrow.getDate() + 1);
                                            $scope.events = [
                                              {
                                                date: tomorrow,
                                                status: 'full'
                                              },
                                              {
                                                date: afterTomorrow,
                                                status: 'partially'
                                              }
                                            ];

                                            function getDayClass(data) {
                                              var date = data.date,
                                                mode = data.mode;
                                              if (mode === 'day') {
                                                var dayToCheck = new Date(date).setHours(0,0,0,0);

                                                for (var i = 0; i < $scope.events.length; i++) {
                                                  var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                                                  if (dayToCheck === currentDay) {
                                                    return $scope.events[i].status;
                                                  }
                                                }
                                              }

                                              return '';
                                            }

                              });

})();

