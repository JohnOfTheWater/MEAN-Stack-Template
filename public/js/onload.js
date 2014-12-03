$('document').ready(function(){


  var membershipType,
    $input = $('.search_input'),
    $button = $('.submit_search'),
    membershipId,
    accountType = 'TigerPSN',
    characterId = '2305843009215383036', //titan
    $guardianWrapper = $('.guardian_wrapper'),
    username = 'IBlackGolemI';
    //url = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/',
    //url1 = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/Character/' + characterId + '/Inventory/',
    //url2 = 'http://www.bungie.net/en/Legend/' + membershipType + '/' + membershipId + '/' + characterId,
    //url3 = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/Character/' + characterId + '/Progression/';
  
    //console.log(url2); // pretty bungie link
    //console.log(url1); //inventory
    //console.log(url3); // progression
    
   var hashes = {
      3159615086: 'glimmer',
      1415355184: 'crucible marks',
      1415355173: 'vanguard marks',
      898834093: 'exo',
      3887404748: 'human',
      2803282938: 'awoken',
      3111576190: 'male',
      2204441813: 'female',
      671679327: 'hunter',
      3655393761: 'titan',
      2271682572: 'warlock',
      3871980777: 'New Monarchy',
      529303302: 'Cryptarch',
      2161005788: 'Iron Banner',
      452808717: 'Queen',
      3233510749: 'Vanguard',
      1357277120: 'Crucible',
      2778795080: 'Dead Orbit',
      1424722124: 'Future War Cult',
      weeklyMarks: {
        2033897742: 'Weekly Vanguard Marks',
        2033897755: 'Weekly Crucible Marks'
      }
    };

    $input.focus();
    $guardianWrapper.hide();

   
    function generateCharacters(res){
      res.characters.forEach(function(guardian){

        var gClass = guardian.characterBase.classHash,
            imgPath;
        if(gClass === 3655393761){
          imgPath = '/img/destiny_titan.jpg';
        }else if(gClass === 2271682572){
          imgPath = '/img/destiny_warlock.jpg';
        }else if(gClass === 671679327){
          imgPath = '/img/destiny_hunter.jpg';
        }

        var $image = $('<div>'),
            $level = $('<h3>');

        $image.addClass('guardian_image').css('background', 'url("'+imgPath+'")').css('background-size', 'cover')
          .attr('guardian-id', guardian.characterBase.characterId);
        $level.addClass('level_class').text(guardian.characterLevel);

        $image.append($level);
        $guardianWrapper.append($image);
        
      });



      $guardianWrapper.fadeIn();
    }

    function appendData(res){
      console.dir(res);
      generateCharacters(res);
    }

    function displayInventory(res){
      res.data.currencies.forEach(function(curr){
        var currency = curr.itemHash;
        console.log(hashes[currency] + ' ' + curr.value);
      });
    }

    function getMemberShipId(){
      var gamertag = $input.val();
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
          console.log('membershipId retrieved');
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
          console.log('searching for Guardian.... '+data.ErrorStatus+'!');
          appendData(data.Response.data);
        } else {
          console.log('failure');
        }
      }).fail(function () {
        console.log('errUnableToConnect');
      });
    }

    function getInventory(id){

      var url = 'http://www.bungie.net/Platform/Destiny/'+accountType+'/Account/'+membershipId+'/Character/'+id+'/Inventory/';
      $.ajax({
        type: 'POST',
        url: '/proxyJSON',
        data: JSON.stringify({targetUrl: url}),
        contentType:'application/json; charset=utf-8',
        dataType: 'json'
      }).done(function(data) {
        if(data.Response) {
          console.log('retrieving inventory.... '+data.ErrorStatus+'!');
          displayInventory(data.Response);
        } else {
          console.log('failure');
        }
      }).fail(function () {
        console.log('errUnableToConnect');
      });
    }


    $button.click(function(){
      getMemberShipId();
    });

    $guardianWrapper.on('click', '.guardian_image', function(){
      var id = $(this).attr('guardian-id');
      console.log('guardian-id: '+id);
      getInventory(id);
    });


    

});
