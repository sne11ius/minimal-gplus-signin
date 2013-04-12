<!doctype html>
<html ng-app="minimalgplussignin">
<head>
    <meta charset="utf-8">
    <title>wasis.nu/mit/minimal-gplus-signin</title>
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.5/angular.min.js"></script>
    <script>
        <#include "app.js">
    </script>
    <script src='https://plus.google.com/js/client:plusone.js'>{"parsetags": "explicit"}</script>
</head>
<body>
    <div ng-controller="LoginController">
        <h1>wasis.nu/mit/minimal gplus signin?</h1>
        <div ng-show="isLoggedIn">{{username}} [ <a ng-click="disconnectServer()" href id="disconnect">logout</a> ]</div>
        <div ng-show="!isLoggedIn" id="gConnect" >
            <button id="g-signin" class="g-signin">
            </button>
        </div>
    </div>
</body>
</html>
