var app = angular.module('starter', [
  'ionic',
  'ionic-timepicker',
  'firebase',
  'pascalprecht.translate'
]);



app.constant('firebaseRef','YOUR_FIREBASE_URL_HERE');

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$translateProvider) {
  'use strict';

    defineLanguage($translateProvider,$ionicConfigProvider);

    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    if(isSafari) {
        $provide.decorator('$rootScope', ['$delegate', function($rootScope) {
            var scopePrototype = Object.getPrototypeOf($rootScope);
            var originalScopeNew = scopePrototype.$new;
            scopePrototype.$new = function () {
                try {
                    return originalScopeNew.apply(this, arguments);
                } catch(e) {
                    console.error(e);
                    throw e;
                }
            };
            return $rootScope;
        }]);
    }
  if (!ionic.Platform.isIOS()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

  $urlRouterProvider.otherwise('/app/menu');
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.menu', {
      url: '/menu',
      views: {
        'menuContent': {
          templateUrl: 'templates/foodMenu.html',
          controller: 'foodMenuCtrl',
          resolve: {
            menuService : function(menuService){
                return menuService.getMenu();
            },
            currencyService : function(currencyService){
                return currencyService.isDollarCurrency();
            }
          }
        }
      }
    })
    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html',
          controller: 'contactCtrl',
          resolve: {
            information : function(informationService){
                return informationService.getInformations();
            }
          }
        }
      }
    })

    .state('app.takeout', {
      url: '/takeout',
      views: {
        'menuContent': {
          templateUrl: 'templates/takeout.html',
          controller: 'takeoutCtrl',
          resolve: {
            information : function(informationService){
                return informationService.getInformations();
            },
            currencyService : function(currencyService){
                return currencyService.isDollarCurrency();
            }
          }
        }
      }
    })

    .state('app.eatin', {
      url: '/eatin',
      views: {
        'menuContent': {
          templateUrl: 'templates/eatin.html',
          controller: 'eatinCtrl',
          resolve: {
            information : function(informationService){
                return informationService.getInformations();
            },
            currencyService : function(currencyService){
                return currencyService.isDollarCurrency();
            }
          }
        }
      }
    })

    .state('app.delivery', {
      url: '/delivery',
      views: {
        'menuContent': {
          templateUrl: 'templates/delivery.html',
          controller: 'deliveryCtrl',
          resolve: {
            information : function(informationService){
                return informationService.getInformations();
            },
            currencyService : function(currencyService){
                return currencyService.isDollarCurrency();
            }
          }
        }
      }
    })

    .state('app.menu.order', {
      url : '/order',
      views: {
        'menuContent@app' : {
          templateUrl : 'templates/order.html',
          controller : 'orderCtrl',
          resolve: {
            information : function(informationService){
                return informationService.getInformations();
            },
            menuService : function(menuService){
                return menuService.getMenu();
            },
            currencyService : function(currencyService){
                return currencyService.isDollarCurrency();
            }
          }
        }
      }
    })

});


app.filter('hoursToDateTime', [function() {
    return function(hours) {
        if (parseInt(hours < 10)){
          hours = "0" + hours.toString();
        }
        return hours.toString();
    };
}])


app.filter('minutesToDateTime', [function() {
    return function(minutes) {
        return new Date(1970, 0, 1).setMinutes(minutes);
    };
}])
