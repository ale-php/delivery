app.factory('orderService',function(){
    var orderData = {};
    orderData.message = '';
    orderData.totalOrder;
    orderData.totalPrice;
    orderData.day;
    orderData.selectedOrders;

    return orderData;
});

app.factory('currencyService',['$http',function($http){
  return {
    isDollarCurrency : function(){
      return $http.get('api/api.json').success(function(data){
        return data.informations.currency;
      });
    }
  }
}]);

app.factory('menuService',['$http',function($http){
  return {
    getMenu : function (){
      return $http.get('api/api.json')
      .success(function (data) {
        return data;
      })
      .error(function (error) {
        return error;
      });
    }
  }
}]);

app.factory('informationService',['$http',function($http){
  return {
    getInformations : function(){
      return $http.get('api/api.json')
        .success(function (data) {
          return data;
        })
        .error(function (error) {
          return error;
        });
      }
  }
}]);


app.factory('firebaseOrderService', [
  'firebaseRef',
  '$firebaseArray',

  function (firebaseRef,$firebaseArray) {

    var fbRef = new Firebase(firebaseRef);
    var orderService = {};
    orderService.orders = $firebaseArray(fbRef);

    orderService.newOrder = function(time,option,orders,adress){
      var orderString = '{"option" : "' + option + '",' +
      '"time" : "' + time + '",';
      if(adress != null){
        var adress_name = adress[0];
        var adress_street = adress[1];
        var adress_city = adress[2];
        var phone_number = adress[3];
        var orderAdress = adress_street + ", " + adress_city;
        orderString += '"client_name" : "' + adress_name + '",';
        orderString += '"delivery_address" : "' + orderAdress + '",';
        orderString += '"phone_number"  : "' + phone_number + '",';
      }
      orderString += '"items" : {';
      for (var i = 0; i < orders.length; i++){
        var name = orders[i][1];
        var size = orders[i][2];
        var quantity = orders[i][3];
        orderString += '"'+(i+1)+'" : {'+'"name" : "' + name + '",';
        if(size != ""){
          orderString += '"size" : "' + size + '",';
        }
        orderString += '"quantity" : "' + quantity + '"';
        if (i == orders.length-1){
          orderString += '}';
        }else{
          orderString += '},';
        }
      }
      orderString += '}}';
      var json = JSON.parse(orderString);
      orderService.orders.$add(json).then(function(ref){
        var id = ref.key();
        console.log("added record with id " + id);
      });
    }

  return orderService;
}])

