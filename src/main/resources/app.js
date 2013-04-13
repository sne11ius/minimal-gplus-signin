/*******************************************************************************
 * Create the angular module `minimalgplussignin'.
 */
var app = angular.module( 'minimalgplussignin', [ ] );

/*******************************************************************************
* Controls the login/logout stuff.
*/
app.controller('LoginController', function($scope, $http) {
    /* Init scope-variables via freemarker, both will be either true or false
       after rendering. */
    $scope.isLoggedIn = ${loggedin?string};
    
    $scope.username = '${username}';
    
    /* Logout and update view */
    $scope.disconnectServer = function() {
        console.info('Disconnecting...');
        $http.post(window.location.href + '/session/disconnect').success(function() {
            console.log('Disconnected.');
            if(!$scope.$$phase) {
                $scope.$apply(function() {
                    $scope.isLoggedIn = false;
                });
            } else {
                $scope.isLoggedIn = false;
            }
        }).error(function(error) {
            console.error(error, 'Error during disconnect');
        });
    };

    /* This function will be called from the google api after the user clicks
       `accepd' or `cancel' in the popup window.
       The function will also be called if an already logged in user visits the
       page. */
    $scope.onSignInCallback = function(data) {
        /* User clicked `cancel' or simply closed the popup. */
        if ('undefined' != typeof data.error) {
            console.log('siginin canceled');
            return;
        }
        /* Init the javascript client, try to load user data and promote login
           to the server */
        gapi.client.load('plus', 'v1', function() {
            var request = gapi.client.plus.people.get({
                'userId' : 'me'
            });
            request.execute(function(profile) {
                if ('undefined' != typeof profile.error) {
                    console.log('this is not login you are looking for...');
                    return;
                }
                $http({
                    method: 'POST',
                    url: window.location.href + '/session/connect?state=${state}&gplus_id=' + profile.id,
                    headers: {'Content-Type': 'application/octet-stream; charset=utf-8'},
                    data: data.code 
                }).success(function(loginInfo) {
                    $scope.isLoggedIn = true;
                    $scope.username = loginInfo.user.firstname + ' ' + loginInfo.user.lastname;
                });
            });
        });
    };
    
    /* Get all the login stuff running. $scope.onSignInCallback will be called
       when google thinks the time is right */
    $scope.start = function() {
        gapi.signin.render(
           'g-signin', {
                'scope'                 : 'https://www.googleapis.com/auth/plus.login',
                'requestvisibleactions' : 'http://schemas.google.com/CommentActivity',
                'clientId'              : '${client_id}',
                'accesstype'            : 'offline',
                'callback'              : $scope.onSignInCallback,
                'theme'                 : 'light',
                'width'                 : 'medium',
                'cookiepolicy'          : 'single_host_origin'
            }
        );
    };
    
    $scope.start();
});

/*******************************************************************************
 * Define what we want to do if the app is `run'...
 */
app.run(function() {
    // nothing to do
});
