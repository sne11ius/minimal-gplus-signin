Minimal GPlus Signin
====================

Simple gplus login. Works in Chrome & IE, but fails in Firefox.
Note that there is no indication of the reason of failure in Firefox - no JS error or anything like that.

The HTML can be found in https://github.com/sne11ius/minimal-gplus-signin/blob/master/src/main/resources/index.ftl

The JS can be found in https://github.com/sne11ius/minimal-gplus-signin/blob/master/src/main/resources/app.js.

Stack
=====
 - jersey
 - com.google.apis
 - angularjs

run
===
1. Try

        mvn compile package && java -jar target/minimalgplussignin-0.0.1-SNAPSHOT.jar
2. See it fail
3. Add proper `nu.wasis.minimalgplussignin.util.PrivateConstants.java`
4. ...
5. Profit
