app.controller('AppCtrl',['$scope','orderService',function($scope,orderService) {
  $scope.menu_items = [
    {
      location : "app.menu",
      name : "SIDEMENU_MENU_LINK",
      icon : "ion-fork"
    },
    {
      location : "app.contact",
      name : "SIDEMENU_CONTACT_LINK",
      icon : "ion-ios-contact-outline"
    },
    {
      location : "app.menu.order",
      name : "SIDEMENU_ORDER_LINK",
      icon : "ion-android-cart"
    }

  ];

  $scope.toggleVisibility = function(item_name){
    if(item_name == "Order" && (orderService.totalOrder.length === 0)){
      return true;
    }
    return false;
  }
}]);

app.controller('foodMenuCtrl',[
  '$scope',
  'orderService',
  'menuService',
  '$ionicTabsDelegate',
  'menuService',
  'currencyService',

  function($scope,orderService,menuService,$ionicTabsDelegate,menuService,currencyService){



    Array.matrix = function(numx, numy, numz, initial){
      var final = []
      for (var f = 0; f < numz; ++f){
        var arr = [];
        for (var i = 0; i < numx; ++i){
          var columns = [];
          for (var j = 0; j < numy; ++j){
             columns[j] = [initial,0];
          }
          arr[i] = columns;
        }
        final[f] = arr;
      }
      return final;
    }

    $scope.title = "Our menu";
    $scope.mymenus = [];
    $scope.totalOrder = [];
    orderService.totalOrder = [];
    $scope.dollarCurrency = (currencyService.data.informations.currency == "dollar");
    console.log("isDollar : " + $scope.dollarCurrency);

    // we are using the index and the parent index because
    // the order items are in a nested ng-repeat --> [$parent.$index][$index]
    $scope.toggleObject = [-1]  //index of the clicked object in view (orders)
    $scope.parentToggleObject = [-1];  //index of the paretn of clicked object in view (orders)


    var tabNames = [];

    delegateTabs = function(){
      $ionicTabsDelegate.select(0);
      for (var i = 0; i < tabNames.length -1; i++) {
        if (!($scope.mymenus.indexOf(tabNames[i]) > -1)){
          $ionicTabsDelegate.select(i+1);
        }
      };
    }

    var createTabs = function(){
      for (var menuItem in $scope.menus){
        if(($scope.menus[menuItem].use === "true")){
          tabNames.push(menuItem);
        }
      }
    }

    var setCurrency = function(){

    }

    var data = menuService.data;
    $scope.menus = menuService.data.menus;
    for (var key in data.menus) {
        if (data.menus.hasOwnProperty(key)) {
          $scope.mymenus.push(key)
        }
      }
    setCurrency();
    console.log($scope.menus);
    createTabs();
    delegateTabs();

    $scope.selectedOrders = Array.matrix(5,3,tabNames.length,false);
    orderService.selectedOrders = Array.matrix(5,3,tabNames.length,false);

    var printArray = function(myarray){
      var string = "";
      for (var i = 0; i < tabNames.length; ++i){
        string += "\n";
        for (var j = 0; j < 5; ++j){
          string += "  ["
          for(var k = 0; k < 3; ++k){
            string += "["+myarray[i][j][k]+"]";
          }
          string += "]  "
        }
      }
      console.log(string);
    }


    printArray($scope.selectedOrders);

    //for checking if array contains obj
    Array.prototype.contains = function(obj) {
      var i = this.length;
      while (i--) {
          if (this[i] === obj) {
              return true;
          }
      }
      return false;
    }


    function arrayObjectIndexOf(myArray, searchTerm, proprety) {
      for(var i = 0; i < myArray.length; i++) {
          if (myArray[i][proprety] == searchTerm) return i;
      }
      return -1;
    }

    var createNewOrder = function(name,size,quantity,price,imageUrl,tabIndex,parentIndex,index){
      var newOrder =[name+size,name,size,quantity,price,imageUrl,tabIndex,parentIndex,index];
      var orderId = ""+name+size;
      var myindexScope = arrayObjectIndexOf($scope.totalOrder, orderId,0);
      var myIndexService = arrayObjectIndexOf(orderService.totalOrder, orderId,0);
      console.log(tabIndex+","+parentIndex+","+index);
      //console.log(myindex);
      if(myindexScope == -1){
        $scope.totalOrder.push(newOrder);
      }else{
        $scope.totalOrder[myindexScope] = [name+size,name,size,quantity,price,imageUrl,tabIndex,parentIndex,index];
      }

      if(myIndexService == -1){
        orderService.totalOrder.push(newOrder);
      }else{
        orderService.totalOrder[myIndexService] = [name+size,name,size,quantity,price,imageUrl,tabIndex,parentIndex,index];
      }
    }


    $scope.newOrder = function(tabIndex,parentIndex,index,dishName,size,price,imageUrl){
      $scope.selectedOrders[tabIndex][parentIndex][index][0] = true;
      orderService.selectedOrders[tabIndex][parentIndex][index][0] = true;

      orderService.selectedOrders[tabIndex][parentIndex][index][1] ++;
      $scope.selectedOrders[tabIndex][parentIndex][index][1] ++;;

      var quantity = $scope.selectedOrders[tabIndex][parentIndex][index][1];
      //console.log(dishName + " (" +size+ "g)" + " x" + quantity+ ", $" + price*quantity);
      createNewOrder(dishName,size,quantity,price,imageUrl,tabIndex,parentIndex,index);
      var string = "";
      for (var n = 0; n < $scope.totalOrder.length; n++){
        string += "["+$scope.totalOrder[n]+"]\n"
      }
      //console.log(string);
      //printArray($scope.selectedOrders);
    }

    $scope.toggleOrder = function(tabIndex,parentIndex,index){
      $scope.selectedOrders[tabIndex][parentIndex][index][0] =orderService.selectedOrders[tabIndex][parentIndex][index][0];
      return orderService.selectedOrders[tabIndex][parentIndex][index][0];

    }

    $scope.toggleOrderVisibility = function(tabIndex,parentIndex){
      $scope.selectedOrders[tabIndex][parentIndex][0][1] = orderService.selectedOrders[tabIndex][parentIndex][0][1];
      $scope.selectedOrders[tabIndex][parentIndex][1][1] = orderService.selectedOrders[tabIndex][parentIndex][1][1];
      $scope.selectedOrders[tabIndex][parentIndex][2][1] = orderService.selectedOrders[tabIndex][parentIndex][2][1];
      return (orderService.selectedOrders[tabIndex][parentIndex][0][0] ||
         orderService.selectedOrders[tabIndex][parentIndex][1][0] ||
         orderService.selectedOrders[tabIndex][parentIndex][2][0]);
    }

    $scope.tabappearAppetizers = function(){
      if ($scope.mymenus.indexOf(tabNames[0]) > -1){
        return "ng-show";
      }else{
        return "ng-hide";
      }
    }

    $scope.tabappearMenus = function(){
      if ($scope.mymenus.indexOf(tabNames[1]) > -1){
        return "ng-show";
      }else{
        return "ng-hide";
      }
    }

    $scope.tabappearDrinks = function(){
      if ($scope.mymenus.indexOf(tabNames[2]) > -1){
        return "ng-show";
      }else{
        return "ng-hide";
      }
    }

    $scope.tabappearDesserts = function(){
      if ($scope.mymenus.indexOf(tabNames[3]) > -1){
        return "ng-show";
      }else{
        return "ng-hide";
      }
    };

    $scope.tabappearSandwiches = function(){
      if ($scope.mymenus.indexOf(tabNames[4]) > -1){
        return "ng-show";
      }else{
        return "ng-hide";
      }
    }

}]);

app.controller('orderCtrl',[
  '$scope',
  '$state',
  'orderService',
  '$ionicModal',
  'menuService',
  'information',
  '$timeout',
  'currencyService',

  function($scope,$state,orderService,$ionicModal,menuService,information,$timeout,currencyService){

    var opening_hours = information.data.informations.opening_hours;

    //console.log(opening_hours);
    $scope.title = "Your order";
    $scope.test = orderService.message;
    $scope.orders = orderService.totalOrder;
    //console.log("debug");
    //console.log($scope.orders[0]);
    $scope.configOptions = [];
    $scope.optionNames = [];

    $scope.dollarCurrency = (currencyService.data.informations.currency == "dollar");
    console.log("isDollar : " + $scope.dollarCurrency);

    $scope.toggleOrderButton = function(){
      return (typeof $scope.orders === 'undefined');
    }


    var myTotalPrice = 0;
    if(typeof $scope.orders != 'undefined'){
      for (var i = 0; i < $scope.orders.length; i++) {
        myTotalPrice += parseInt($scope.orders[i][4])
        * parseInt($scope.orders[i][3]);
      }
    }
    orderService.orderPrice = myTotalPrice;

    var findIndex = function(item){
      for (var i = 0; i < $scope.orders.length; i++) {
        if($scope.orders[i][0] === item){
          //console.log(i);
          return i;
        }
      }
    }

    $scope.onItemDelete = function(item) {
      var index = findIndex(item[0]);
      $scope.totalPrice -= item[4] * item[3];
      orderService.orderPrice = $scope.totalPrice;
      $timeout(function() {
        $scope.orders.splice(index, 1);
      },150);

      //change the menu view
      orderService.selectedOrders[item[6]][item[7]][item[8]][1] = 0;
      orderService.selectedOrders[item[6]][item[7]][item[8]][0] = false;
      //console.log(item[6]+","+item[7]+","+item[8]);
    };

    var setOptionItems = function(){
      var date = new Date();
      var day = date.getDay();
      day = (day == 0) ?  7 : day;
      orderService.day = day;
      var opening_hours_array = [];
      var options_hours_array = [];
      options_hours_array.push(99);
      opening_hours_array.push(99);
      //console.log(opening_hours[day]);

      //creating a 3d array of the opening hours of every day --> opening_hours_array.
      for(var i = 1; i < 8; i++){
        var day_hours_array = [];
        for (var obj in opening_hours[i.toString()]){
          if(obj == "first_part" || obj == "second_part"){
            var current_opening_hours = opening_hours[i][obj].time.split("-");
            current_opening_hours[0] = parseInt(current_opening_hours[0]);
            current_opening_hours[1] = ( parseInt(current_opening_hours[1]) < parseInt(current_opening_hours[0])) ? 24 + parseInt(current_opening_hours[1]) : parseInt(current_opening_hours[1]);
            day_hours_array.push(current_opening_hours);
          }
        }
        opening_hours_array.push(day_hours_array);
      }


      //creatong a 3d array of the options array
      for(var i = 1; i < 8; i++){
        var day_options_array = [];
        for (var obj in opening_hours[i.toString()]){
          if(obj == "first_part" || obj == "second_part"){
            var max_delivery = parseInt(opening_hours[i][obj].max_delivery_time);
            var max_eatin = parseInt(opening_hours[i][obj].max_eatin_time);
            var max_takeout = parseInt(opening_hours[i][obj].max_takeout_time);
            max_delivery = (max_delivery < opening_hours[i][obj].time.split("-")[0]) ? 24 + max_delivery : max_delivery;
            max_eatin = (max_eatin < opening_hours[i][obj].time.split("-")[0]) ? 24 + max_eatin : max_eatin;
            max_takeout = (max_takeout < opening_hours[i][obj].time.split("-")[0]) ? 24 + max_takeout : max_takeout;
            var currentOptionArray = [max_eatin,max_takeout,max_delivery];
            day_options_array.push(currentOptionArray);
          }
        }
        options_hours_array.push(day_options_array);
      }

      //printing  options_hours_array
      // var string = "";
      // for (var i = 1; i < 8; i++){
      //   string += "[[" + options_hours_array[i][0][0] + "," + options_hours_array[i][0][1] + "," + options_hours_array[i][0][2] + "]," +
      //     "[" + options_hours_array[i][1][0] + "," + options_hours_array[i][1][1] + "," + options_hours_array[i][1][2] + "]]\n";
      // }
      // console.log(string);


      //START OVER HERE ---- find a way to see if
      // delivery time for today is still ok, if not,
      // check if the one of the last day is stil on
      //console.log("day : " + day);
      var currentTime = date.getHours();
      var dayPart = "noPart";
      //console.log(day);
      //console.log(currentTime);
      //console.log(opening_hours_array[day][1][1]);
      var currentDayOpenAm = false;
      var currentDayOpenPm = false;
      var beforeDayOpenPm = false;
      var dayBefore = (day != 1) ? day - 1 : 7;
      if(currentTime >= opening_hours_array[day][0][0] &&
        currentTime < opening_hours_array[day][0][1]){
        dayPart = "first_part";
        dayPartInt = 0;
        //console.log("---1");
        currentDayOpenAm = true;
      }else if(currentTime >= opening_hours_array[day][0][0] - 24 &&
        currentTime < opening_hours_array[day][0][1] -24){
        dayPart = "first_part";
        dayPartInt = 0;
        var max_delivery = opening_hours[day][dayPart].max_delivery_time;
        opening_hours[day][dayPart].max_delivery_time = (max_delivery < opening_hours_array[day][0][0])? max_delivery : max_delivery-24;
        var max_eatin = opening_hours[day][dayPart].max_eatin_time
        opening_hours[day][dayPart].max_eatin_time = (max_eatin < opening_hours_array[day][0][0])? max_eatin : max_eatin-24;
        var max_takeout = opening_hours[day][dayPart].max_takeout_time;
        opening_hours[day][dayPart].max_takeout_time = (max_takeout < opening_hours_array[day][0][0])? max_takeout : max_takeout-24;
        //console.log("---2");
        currentDayOpenAm = true;
      }
      else if (currentTime >= opening_hours_array[day][1][0] &&
        currentTime < opening_hours_array[day][1][1]){
        dayPart = "second_part";
        dayPartInt = 1;
        //console.log("---3");
        currentDayOpenPm = true;
      }
      else if (currentTime >= opening_hours_array[day][1][0]-24 &&
        currentTime < opening_hours_array[day][1][1]-24){
        dayPart = "second_part";
        dayPartInt = 1;
        var max_delivery = opening_hours[day][dayPart].max_delivery_time;
        opening_hours[day][dayPart].max_delivery_time = (max_delivery < opening_hours_array[day][1][0])? max_delivery : max_delivery-24;
        var max_eatin = opening_hours[day][dayPart].max_eatin_time
        opening_hours[day][dayPart].max_eatin_time = (max_eatin < opening_hours_array[day][1][0])? max_eatin : max_eatin-24;
        var max_takeout = opening_hours[day][dayPart].max_takeout_time;
        opening_hours[day][dayPart].max_takeout_time = (max_takeout < opening_hours_array[day][1][0])? max_takeout : max_takeout-24;
        //console.log("---4");
        currentDayOpenPm = true;
      }
      else if (currentTime >= (opening_hours_array[dayBefore][1][0] - 24) &&
        currentTime < (opening_hours_array[dayBefore][1][1] - 24)){
        dayPart = "second_part";
        orderService.day = dayBefore;
        dayPartInt = 1;
        //console.log("---5");
        beforeDayOpenPm = true;
      }


      if(dayPart != 'noPart'){
        // console.log("----- delivery ------");
        // console.log("currentTime : " + currentTime);
        // console.log("opening_hours[dayBefore][dayPart].max_delivery_time - 24 : " + parseInt(opening_hours[dayBefore][dayPart].max_delivery_time));
        if(currentTime < options_hours_array[day][dayPartInt][2] && (currentDayOpenAm || currentDayOpenPm)){
          //console.log("delivery ok current day " + day);
        }else if(currentTime+24 < (options_hours_array[dayBefore][1][2]) && beforeDayOpenPm) {
          //console.log("delivery ok day before : " + dayBefore)
        }else{
          //console.log("no delivery");
          delete $scope.configOptions['delivery'];
        }



        // console.log("----- eatin ------");
        // console.log("currentTime : " + currentTime);
        // console.log("opening_hours[dayBefore][dayPart].max_eatin_time -24 : " + parseInt(opening_hours[dayBefore][dayPart].max_eatin_time));
        if(currentTime < options_hours_array[day][dayPartInt][0] && (currentDayOpenAm || currentDayOpenPm)){
          //console.log("eatin ok current day " + day);
        }else if(currentTime+24 < (options_hours_array[dayBefore][1][0]) && beforeDayOpenPm) {
          //console.log("eatin ok day before : " + dayBefore)
        }else{
          //console.log("no eatin");
          delete $scope.configOptions['eatin'];
        }

        // console.log("----- takeout ------");
        // console.log("currentTime : " + currentTime);
        // console.log("opening_hours[dayBefore][dayPart].max_takeout_time : " + parseInt(opening_hours[dayBefore][dayPart].max_takeout_time));
        if(currentTime < options_hours_array[day][dayPartInt][1] && (currentDayOpenAm || currentDayOpenPm)){
          //console.log("takeout ok current day " + day);
        }else if(currentTime+24 < (options_hours_array[dayBefore][1][1]) && beforeDayOpenPm) {
          //console.log("takeout ok day before : " + dayBefore)
        }else{
          //console.log("no takeout")
          delete $scope.configOptions['takeout'];
        }
      }else{
        //console.log("closed");
        delete $scope.configOptions['takeout'];
        delete $scope.configOptions['eatin'];
        delete $scope.configOptions['delivery'];
      }
    }


    var data = menuService.data;
    // /console.log(data.configuration.options);
    $scope.configOptions = data.configuration.options;
    setOptionItems();
    for (var key in data.configuration.options) {
      if (data.configuration.options.hasOwnProperty(key)) {
        $scope.optionNames.push(key);
      }
    }


    $scope.totalPrice = myTotalPrice;

    $ionicModal.fromTemplateUrl('templates/orderModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    var showModal = function(){
      $scope.modal.show();
    }

    $scope.openModal = function() {
      if(parseInt($scope.orders.length) > 0){
        if(parseInt($scope.optionNames.length) == 1){
          // for (var x in $scope.configOptions) {
          //   var url = $scope.configOptions[x].stateName;
          //   $state.go("app."+url);
          // }
        }else if(parseInt($scope.optionNames.length) == 0){
          $scope.noOrderMessage = "OPTION_CLOSED_MESSAGE";
        }
        showModal();
      }else{
        $scope.noOrderMessage = "OPTION_NO_ORDER_MESSAGE";
        $scope.configOptions = [];
        $scope.modal.show();
      }
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };



    $scope.redirectTo = function(url){
      $state.go("app."+url);
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

}]);

app.controller('takeoutCtrl',[
  '$scope',
  'menuService',
  'information',
  'orderService',
  'currencyService',
  '$translate',
  'firebaseOrderService',

  function($scope,menuService,information,orderService,currencyService,$translate,firebaseOrderService){

  $scope.title = "Take out";
  $scope.informationData = information.data.informations;
  $scope.totalPrice = orderService.orderPrice;
  $scope.email = information.data.informations.contact_informations.email;
  var date = new Date();
  var day = orderService.day;
  console.log("day : " + day);
  $scope.hours = date.getHours();
  $scope.minutes = date.getMinutes();
  console.log($scope.informationData);
  console.log($scope.informationData.opening_hours[day]);
  $scope.timeFormat = parseInt($scope.informationData.format);
  $scope.emailSent = false;
  $scope.dollarCurrency = (currencyService.data.informations.currency == "dollar");
  console.log("isDollar : " + $scope.dollarCurrency);

  $scope.sendOrder= function() {
    var orders = orderService.totalOrder;
    var option = "Take out";
    var time = "" + $scope.hours + ":" + $scope.minutes;
    firebaseOrderService.newOrder(time,option,orders,null);
    $scope.emailSent = true;
    $scope.$apply();
  }


  //Seting the maxTime
  for (var obj in $scope.informationData.opening_hours[day]){
    if(obj == "first_part" || obj == "second_part"){
      var opening_hours = $scope.informationData.opening_hours[day][obj].time.split("-");
      console.log(opening_hours);
      opening_hours[1] = ( parseInt(opening_hours[1]) < parseInt(opening_hours[0])) ? 24 + parseInt(opening_hours[1]) : parseInt(opening_hours[1]);
      console.log(".." + opening_hours[1] + "..");
      if($scope.hours >= opening_hours[0] && $scope.hours <= opening_hours[1]){
        $scope.maxTime = parseInt($scope.informationData.opening_hours[day][obj].max_eatin_time);
        console.log("maxTime : " + $scope.maxTime);
      }
    }
  }
  //console.log($scope.maxTime);

  var hoursMinString = ($scope.hours < 10) ? "0" + $scope.hours.toString() + ":00" : $scope.hours.toString() + ":00";
  var hoursMaxString = ($scope.maxTime < 10) ? "0" + $scope.maxTime.toString() +":00" : $scope.maxTime.toString() + ":00";


  $scope.timePickerObject = {
    inputEpochTime: ($scope.hours * 60 * 60),  //Optional
    step: 5,  //Optional
    format: $scope.timeFormat,  //Optional
    maxTime : $scope.maxTime,
    subTitleLabel : hoursMinString + " - " + hoursMaxString,
    titleLabel: $translate.instant('TIMEPICKER_HEADER'),  //Optional
    setLabel: $translate.instant('TIMEPICKER_CHOOSE_BUTTON'),  //Optional
    closeLabel: $translate.instant('TIMEPICKER_CLOSE_BUTTON'),  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.hours = selectedTime.getUTCHours();
        $scope.minutes = selectedTime.getUTCMinutes();
        //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }
  }


}]);



app.controller('eatinCtrl',[
  '$scope',
  'menuService',
  'information',
  'orderService',
  'currencyService',
  '$translate',
  'firebaseOrderService',

  function($scope,menuService,information,orderService,currencyService,$translate,firebaseOrderService){

  $scope.informationData = information.data.informations;
  $scope.totalPrice = orderService.orderPrice;
  $scope.email = information.data.informations.contact_informations.email;
  var date = new Date();
  var day = orderService.day;
  console.log("day : " + day);
  $scope.hours = date.getHours();
  $scope.minutes = date.getMinutes();
  console.log($scope.informationData);
  console.log($scope.informationData.opening_hours[day]);
  $scope.timeFormat = parseInt($scope.informationData.format);
  $scope.emailSent = false;
  $scope.dollarCurrency = (currencyService.data.informations.currency == "dollar");
  console.log("isDollar : " + $scope.dollarCurrency);


  $scope.sendOrder= function() {
    var orders = orderService.totalOrder;
    var option = "Eat in";
    var time = "" + $scope.hours + ":" + $scope.minutes;
    firebaseOrderService.newOrder(time,option,orders,null);
    $scope.emailSent = true;
    $scope.$apply();
  }


  //Seting the maxTime
  for (var obj in $scope.informationData.opening_hours[day]){
    if(obj == "first_part" || obj == "second_part"){
      var opening_hours = $scope.informationData.opening_hours[day][obj].time.split("-");
      console.log(opening_hours);
      opening_hours[1] = ( parseInt(opening_hours[1]) < parseInt(opening_hours[0])) ? 24 + parseInt(opening_hours[1]) : parseInt(opening_hours[1]);
      console.log(".." + opening_hours[1] + "..");
      if($scope.hours >= opening_hours[0] && $scope.hours <= opening_hours[1]){
        $scope.maxTime = parseInt($scope.informationData.opening_hours[day][obj].max_eatin_time);
        console.log("maxTime : " + $scope.maxTime);
      }
    }
  }
  //console.log($scope.maxTime);

  var hoursMinString = ($scope.hours < 10) ? "0" + $scope.hours.toString() + ":00" : $scope.hours.toString() + ":00";
  var hoursMaxString = ($scope.maxTime < 10) ? "0" + $scope.maxTime.toString() +":00" : $scope.maxTime.toString() + ":00";

  $scope.title = "Eat in";

  $scope.timePickerObject = {
    inputEpochTime: ($scope.hours * 60 * 60),  //Optional
    step: 5,  //Optional
    format: $scope.timeFormat,  //Optional
    maxTime : $scope.maxTime,
    subTitleLabel : hoursMinString + " - " + hoursMaxString,
    titleLabel: $translate.instant('TIMEPICKER_HEADER'),  //Optional
    setLabel: $translate.instant('TIMEPICKER_CHOOSE_BUTTON'),  //Optional
    closeLabel: $translate.instant('TIMEPICKER_CLOSE_BUTTON'),  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.hours = selectedTime.getUTCHours();
        $scope.minutes = selectedTime.getUTCMinutes();
        //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }
  }


}]);

app.controller('deliveryCtrl',[
  '$scope',
  'menuService',
  'information',
  'orderService',
  'currencyService',
  '$translate',
  'firebaseOrderService',

  function($scope,menuService,information,orderService,currencyService,$translate,firebaseOrderService){

  $scope.title = "Delivery";
  $scope.totalPrice = orderService.orderPrice;
  $scope.informationData = information.data.informations;
  $scope.email = information.data.informations.contact_informations.email;
  var date = new Date();
  var day = orderService.day;
  console.log("day : " + day);
  $scope.hours = date.getHours();
  $scope.minutes = date.getMinutes();
  console.log($scope.informationData);
  console.log($scope.informationData.opening_hours[day]);
  $scope.timeFormat = parseInt($scope.informationData.format);
  $scope.emailSent = false;
  $scope.address_name = "";
  $scope.address_street = "";
  $scope.address_city = "";
  $scope.address_phone_number = "";
  $scope.dollarCurrency = (currencyService.data.informations.currency == "dollar");
  console.log("isDollar : " + $scope.dollarCurrency);

  var isComplete = function(adress){
    return (adress[0].length > 0 &&
        adress[1].length > 0 &&
        adress[2].length > 0 &&
        adress[3].toString().length > 0);
  }

  $scope.sendOrder= function(name, street, city, number) {
    var orders = orderService.totalOrder;
    var option = "Delivery";
    var time = "" + $scope.hours + ":" + $scope.minutes;
    var adress = [name,street,city,number];
    if(isComplete(adress)){
      firebaseOrderService.newOrder(time,option,orders,adress);
      $scope.emailSent = true;
      $scope.$apply();
    }else{
      console.log('order not complete');
    }
  }


  //Seting the maxTime
  for (var obj in $scope.informationData.opening_hours[day]){
    if(obj == "first_part" || obj == "second_part"){
      var opening_hours = $scope.informationData.opening_hours[day][obj].time.split("-");
      console.log(opening_hours);
      opening_hours[1] = ( parseInt(opening_hours[1]) < parseInt(opening_hours[0])) ? 24 + parseInt(opening_hours[1]) : parseInt(opening_hours[1]);
      console.log(".." + opening_hours[1] + "..");
      if($scope.hours >= opening_hours[0] && $scope.hours <= opening_hours[1]){
        $scope.maxTime = parseInt($scope.informationData.opening_hours[day][obj].max_eatin_time);
        console.log("maxTime : " + $scope.maxTime);
      }
    }
  }
  //console.log($scope.maxTime);

  var hoursMinString = ($scope.hours < 10) ? "0" + $scope.hours.toString() + ":00" : $scope.hours.toString() + ":00";
  var hoursMaxString = ($scope.maxTime < 10) ? "0" + $scope.maxTime.toString() +":00" : $scope.maxTime.toString() + ":00";

  $scope.timePickerObject = {
    inputEpochTime: ($scope.hours * 60 * 60),  //Optional
    step: 5,  //Optional
    format: $scope.timeFormat,  //Optional
    maxTime : $scope.maxTime,
    subTitleLabel : hoursMinString + " - " + hoursMaxString,
    titleLabel: $translate.instant('TIMEPICKER_HEADER'),  //Optional
    setLabel: $translate.instant('TIMEPICKER_CHOOSE_BUTTON'),  //Optional
    closeLabel: $translate.instant('TIMEPICKER_CLOSE_BUTTON'),  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.hours = selectedTime.getUTCHours();
        $scope.minutes = selectedTime.getUTCMinutes();
        //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }
  }


}]);

app.controller('contactCtrl',['$scope','information',function($scope,information) {
  var contactInfos = information.data.informations.contact_informations;
  $scope.adress_p1 = contactInfos.adress.first_part;
  $scope.adress_p2 = contactInfos.adress.second_part;
  $scope.email = contactInfos.email;
  $scope.phone = contactInfos.phone;
  var lat = contactInfos.geolocalisation.latitude;
  var lon = contactInfos.geolocalisation.longitude;
  console.log(contactInfos);
  $scope.initialize = function() {
    var myLatlng = new google.maps.LatLng(parseFloat(lat),parseFloat(lon));

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);


    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }

  $scope.sendEmail= function() {
    if(window.plugins && window.plugins.emailComposer) {
      window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
      },
      "customer message",           // Subject
      "",                           // Body
      [$scope.email],               // To
      null,                         // CC
      null,                         // BCC
      false,                        // isHTML
      null,                         // Attachments
      null);                        // Attachment Data
    }
  }

  $scope.phoneCall = function(){
    console.log("phoneCall");
    var number = $scope.phone;
    window.open('tel:' + number, '_system');
  }
  //google.maps.event.addDomListener(window, 'load', initialize);
}]);