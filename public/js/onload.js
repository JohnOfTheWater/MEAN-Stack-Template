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

    function displayInventory(res, id){
      console.dir(res);
      var glimmerPath = '/img/glimmer.png',
          vanguardMarksPath = '/img/vanguard_marks.png',
          crucibleMarksPath = 'img/crucible_marks.png';

      res.data.currencies.forEach(function(curr){
        var currency = curr.itemHash;
        console.log(hashes[currency] + ' ' + curr.value);

        var currencyType = hashes[currency],
            imgPath

        if(currencyType === 'glimmer'){
          imgPath = glimmerPath;
        }else if(currencyType === 'crucible marks'){
          imgPath = crucibleMarksPath;
        }else if(currencyType === 'vanguard marks'){
          imgPath = vanguardMarksPath;
        }
        
        var $img = $('<div>'),
            $value = $('<h3>');

        $img.addClass('currency_image').css('background', 'url("'+imgPath+'")').css('background-size', 'cover');
        $value.addClass('currency_text').text(curr.value);

        $img.append($value);
        $('.guardian_image[guardian-id="'+id+'"]').append($img);


      });
    }

    function displayProgression(res, id){
      console.log('progression: ');
      console.dir(res);
      var totalXp = res.data.levelProgression.currentProgress,
          dailyXp = res.data.levelProgression.dailyProgress,
          weeklyXp = res.data.levelProgression.weeklyProgress;

      var percentage = res.data.percentToNextLevel;
      console.log(percentage);

      var $progressBar = $('<div>'),
          $progression = $('<div>'),
          $xpWrapper = $('<div>'),
          $xpTotal = $('<h3>'),
          $xpDaily = $('<h3>'),
          $xpWeekly = $('<h3>');

      $progressBar.addClass('progress_bar');
      $progression.addClass('progression').css('width', '0');//.css('width', percentage+'%');
      $xpWrapper.addClass('xp_wrapper').css('position', 'absolute');
      $xpTotal.addClass('xp_total').text('all time xp: '+totalXp);
      $xpDaily.addClass('xp_daily').text('daily xp: '+dailyXp);
      $xpWeekly.addClass('xp_weekly').text('weekly xp: '+weeklyXp);


      $xpWrapper.append($xpTotal).append($xpDaily).append($xpWeekly);
      $progressBar.append($progression);
      $('.guardian_image[guardian-id="'+id+'"]')
        .append($progressBar)
        .append($xpWrapper);

      $progression.velocity({width: percentage+'%'}, {duration: 1500});

    }

    function displayActivities(res, id){
      console.log('activities: ');
      console.dir(res);
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
      }).done(function(data){
          if(data.Response.length > 0){
            membershipId = data.Response[0].membershipId;
            console.log('membershipId: '+membershipId);
            membershipType = (data.Response[0].membershipType);
            console.log('membershipId retrieved');
            findGuardian();
          }else{
            console.log('please enter a valid gamertag');
          }
      });
    }

    function xxx(){
      $.ajax({
        type: 'GET',
        url: '/destinyCLIENT',
      }).done(function(data){
          if(data){
            data = jQuery.parseJSON(data)
            console.log('more detailed data');
            console.dir(data);
          }else{
            console.log('nope');
          }
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
          displayInventory(data.Response, id);
        } else {
          console.log('failure');
        }
      }).fail(function () {
        console.log('errUnableToConnect');
      });
    }

    function getProgression(id){

      var url = 'http://www.bungie.net/Platform/Destiny/'+accountType+'/Account/'+membershipId+'/Character/'+id+'/Progression/';
      $.ajax({
        type: 'POST',
        url: '/proxyJSON',
        data: JSON.stringify({targetUrl: url}),
        contentType:'application/json; charset=utf-8',
        dataType: 'json'
      }).done(function(data) {
        if(data.Response) {
          console.log('retrieving progression.... '+data.ErrorStatus+'!');
          displayProgression(data.Response, id);
        } else {
          console.log('failure');
        }
      }).fail(function () {
        console.log('errUnableToConnect');
      });
    }

    function getActivities(id){

      var url = 'http://www.bungie.net/Platform/Destiny/'+accountType+'/Account/'+membershipId+'/Character/'+id+'/Activities/';
      $.ajax({
        type: 'POST',
        url: '/proxyJSON',
        data: JSON.stringify({targetUrl: url}),
        contentType:'application/json; charset=utf-8',
        dataType: 'json'
      }).done(function(data) {
        if(data.Response) {
          console.log('retrieving activities.... '+data.ErrorStatus+'!');
          displayActivities(data.Response, id);
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
      getProgression(id);
      getActivities(id);
      xxx();
    });

    $guardianWrapper.on('click', '.progression', function(event){
      event.stopPropagation();
      console.log('ciao');
      $(this).parent().next().css('z-index', '2').velocity({opacity: 1});
    });


});
