$('document').ready(function(){


  var membershipType,
    input = $('.search_input'),
    button = $('.submit_search'),
    membershipId,
    accountType = 'TigerPSN',
    characterId = '2305843009215383036', //titan
    guardianWrapper = $('.guardian_wrapper'),
    username = 'IBlackGolemI';
    //url = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/',
    //url1 = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/Character/' + characterId + '/Inventory/',
    //url2 = 'http://www.bungie.net/en/Legend/' + membershipType + '/' + membershipId + '/' + characterId,
    //url3 = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/Character/' + characterId + '/Progression/';
  
    //console.log(url2); // pretty bungie link
    //console.log(url1); //inventory
    //console.log(url3); // progression


    
    guardianWrapper.hide();

    function appendData(res){
      console.dir(res);
    }

    function getMemberShipId(){
      var gamertag = input.val();
      console.log(gamertag);
      var url5 = 'http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/'+accountType+'/'+gamertag
      $.ajax({
        type: 'POST',
        url: '/proxyJSON',
        data: JSON.stringify({targetUrl: url5}),
        contentType:'application/json; charset=utf-8',
        dataType: 'json'
      }).done(function(data) {
          membershipId = data.Response[0].membershipId;
          membershipType = (data.Response[0].membershipType);
          findGuardian();
      });
    }

    function findGuardian(){

      var url = 'http://www.bungie.net/Platform/Destiny/'+accountType+'/Account/'+membershipId+'/';
      $.ajax({
        type: 'POST',
        url: '/proxyJSON',
        data: JSON.stringify({targetUrl: url}),
        contentType:'application/json; charset=utf-8',
        dataType: 'json'
      }).done(function(data) {
        if(data.Response) {
          console.log(data.ErrorStatus);
          appendData(data.Response.data);
        } else {
          console.log('failure');
        }
      }).fail(function () {
        console.log('errUnableToConnect');
      });
    }


    button.click(function(){
      getMemberShipId();
    });


    

});
