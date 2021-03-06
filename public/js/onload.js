$('document').ready(function(){


  var membershipType,
    $input = $('.search_input'),
    $button = $('.submit_search'),
    membershipId,
    accountType = 'TigerPSN',
    emblemPath,
    backgroundPath,
    $guardianWrapper = $('.guardian_wrapper'),
    $guardianStatsWrapper = $('.guardian_stats_wrapper'),
    $close = $('.close'),
    $burgerIcon = $('.burger_icon'),
    $gamertagTab = $('.gamertag_tab'),
    $gamertagsH1 = $('.jumbotron h1'),
    $xpStats,
    $gamertags = $('.gamertags');
    //url = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/',
    //url1 = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/Character/' + characterId + '/Inventory/',
    //url2 = 'http://www.bungie.net/en/Legend/' + membershipType + '/' + membershipId + '/' + characterId,
    //url3 = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/Character/' + characterId + '/Progression/';
    //http://static01.bungie.net 

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
      },
      progressions: {
        45089664: 'terminals',
        174528503: 'eris morn',
        452808717: 'queen faction',
        529303302: 'cryptarch',
        594203991: 'iron banner loss token',
        665638366: 'superior gear material source',
        691336206: 'pvp tournament',
        1357277120: 'crucible quartermaster',
        1424722124: 'future war cult',
        1707948164: 'chests on the moon',
        1716568313: 'character level',
        1774654531: 'chests on earth',
        2030054750: 'mote of light',
        2033897742: 'weekly vanguard marks',
        2033897755: 'weekly crucible marks',
        2060414935: 'base item level',
        2158037182: 'chests on venus',
        2161005788: 'iron banner',
        2193513588: 'chests mars',
        2318284751: 'bannerhammer pvp quitterness',
        2778795080: 'dead orbit',
        3122728759: 'pvp idleness',
        3233510749: 'vanguard quartermaster',
        3298204156: 'character xp',
        3467485450: 'pvp_tournament0.losses',
        3871980777: 'new monarchy',
        4106427035: 'death penalty'
      }
    };

   var selectedFactions = [
    {'faction':3233510749, icon:'http://evernode.delacqua.us/img/johngmailcom/john/530329-i3qvhr.jpg'},
    {'faction':1357277120, icon:'http://evernode.delacqua.us/img/johngmailcom/john/152329-5pza1k.jpeg'},
    {'faction':529303302, icon:'http://evernode.delacqua.us/img/johngmailcom/john/349329-bvfati.png'},
    {'faction':1424722124, icon:'http://evernode.delacqua.us/img/johngmailcom/john/286329-rdtb4c.jpeg'},
    {'faction':2778795080, icon:'http://evernode.delacqua.us/img/johngmailcom/john/388329-spvb5..jpeg'},
    {'faction':3871980777, icon:'http://evernode.delacqua.us/img/johngmailcom/john/529329-1cqef4.jpg'},
    {'faction':174528503, icon:'http://evernode.delacqua.us/img/johngmailcom/john/917329-zdpdjv.jpg'},
    {'faction':2033897742, icon:''},
    {'faction':2033897755, icon:''}
   ];

    $input.focus();
    $guardianWrapper.hide();
    $guardianStatsWrapper.hide();
    $gamertags.hide();


    function generateCharacters(res){
      res.characters.forEach(function(guardian){

        var gClass = guardian.characterBase.classHash,
            imgPath,
        emblemPath = 'http://static01.bungie.net/'+guardian.emblemPath,
        backgroundPath = 'http://static01.bungie.net/'+guardian.backgroundPath;
        console.log(emblemPath);
        console.log(backgroundPath);
        if(gClass === 3655393761){
          imgPath = '/img/destiny_titan.jpg';
        }else if(gClass === 2271682572){
          imgPath = '/img/destiny_warlock.jpg';
        }else if(gClass === 671679327){
          imgPath = '/img/destiny_hunter.jpg';
        }

        var $image = $('<div>'),
            $emblem = $('<div>'),
            $background = $('<div>'),
            $level = $('<h3>'),
            $grimoireIcon = $('<div>'),
            $grimoirePoints = $('<h3>'),
            $guardianProgressBar = $('<div>'),
            $guardianProgression = $('<div>'),
            $levelIcon = $('<div>');
            $moteProgressBar = $('<div>'),
            $moteProgression = $('<div>');
        var percentage = guardian.percentToNextLevel;
        var percentage2 = (guardian.levelProgression.progressToNextLevel/guardian.levelProgression.nextLevelAt)*100;

        $image.addClass('guardian_image').css('background', 'url("'+imgPath+'")').css('background-size', 'cover')
          .css('background-position','center')
          .attr('guardian-id', guardian.characterBase.characterId);
        $emblem.addClass('emblem').css('background', 'url("'+emblemPath+'")').css('background-size', 'cover');
        $background.addClass('emblem_background').css('background', 'url("'+backgroundPath+'")').css('background-size', 'cover');
        $level.addClass('level_class').text(guardian.characterLevel);
        $grimoireIcon.addClass('grimoire_icon').css('background', 'url("http://static01.bungie.net/img/theme/destiny/icons/icon_grimoire_lightgray.png")').css('background-size', 'cover');
        $levelIcon.addClass('level_icon').text('\u2726');
        $grimoirePoints.addClass('grimoire_points').text(guardian.characterBase.grimoireScore);
        $guardianProgressBar.addClass('guardian_progress_bar');
        $guardianProgression.addClass('guardian_progression').css('width', '0');//.css('width', percentage+'%');
        $moteProgressBar.addClass('mote_progress_bar');
        $moteProgression.addClass('mote_progression').css('width', '0');//.css('width', percentage+'%');

        $guardianProgressBar.append($guardianProgression)
        $moteProgressBar.append($moteProgression)
        $background
          .append($emblem)
          .append($level)
          .append($levelIcon)
          .append($grimoireIcon)
          .append($grimoirePoints)
          .append($guardianProgressBar)
          .append($moteProgressBar);
        $image.append($background);
        $guardianWrapper.append($image);

        $guardianProgression.velocity({width: percentage+'%'}, {duration: 1000});
        $moteProgression.velocity({width: percentage2+'%'}, {duration: 1000});

      });



      $guardianWrapper.fadeIn();
    }

    function appendData(res){
      console.dir(res);
      generateCharacters(res);
    }

    function displayStats(data){
      setTimeout(function(){

        console.log('now!!!');
        console.dir(data.progressions);
        data = data.progressions;
        var i = 1; 
        data.forEach(function(fact){

          _.find(selectedFactions, function(selectedFaction){
              if(selectedFaction.faction === fact.progressionHash){
                if(fact.progressionHash === 2033897742 ){
                  var $vanguardMarks = $('<h2>'),
                      $vanguardMarksIcon = $('<div>');

                  $vanguardMarks.addClass('vanguard_marks').text(fact.currentProgress+'/100');
                  $vanguardMarksIcon.addClass('vanguard_marks_icon').css('background', 'url("http://static01.bungie.net/img/theme/destiny/icons/sprite_destiny_currencies.png")');

                  $vanguardMarksIcon.append($vanguardMarks);
                  $guardianStatsWrapper.append($vanguardMarksIcon);

                }else if(fact.progressionHash === 2033897755){
                  var $crucibleMarks = $('<h2>'),
                      $crucibleMarksIcon = $('<div>');

                  $crucibleMarks.addClass('crucible_marks').text(fact.currentProgress+'/100');
                  $crucibleMarksIcon.addClass('crucible_marks_icon').css('background', 'url("http://static01.bungie.net/img/theme/destiny/icons/sprite_destiny_currencies.png")');

                  $crucibleMarksIcon.append($crucibleMarks);
                  $guardianStatsWrapper.append($crucibleMarksIcon);
                  //http://static01.bungie.net/img/theme/destiny/icons/sprite_destiny_currencies.png
                }else{

                  var percentage = (fact.progressToNextLevel/fact.nextLevelAt)*100;

                  console.log('percentage:');
                  console.log(percentage);
                  var $faction = $('<section>'),
                      $factionIcon = $('<div>'),
                      $factionProgressBar = $('<div>'),
                      $factionProgression = $('<div>'),
                      $numericProgression = $('<h4>'),
                      $rank = $('<h2>');

                  $faction.attr('data-id', fact.progressionHash).addClass('faction');
                  $factionIcon.addClass('faction_icon')
                    .css('background', 'url("'+selectedFaction.icon+'")')
                    .css('background-size', 'cover')
                    .attr('id', selectedFaction.faction);
                  $factionProgressBar.addClass('faction_progress_bar');
                  $factionProgression.addClass('faction_progression').css('width', '0');//.css('width', percentage+'%');
                  $numericProgression.addClass('numeric_progression').text(''+hashes.progressions[selectedFaction.faction]+': "'+fact.progressToNextLevel+'/'+fact.nextLevelAt+'"');
                  $rank.addClass('rank').text('Rank: '+fact.level);


                  $factionProgressBar.append($factionProgression);

                  $faction.append($factionIcon)
                    .append($factionProgressBar)
                    .append($rank)
                    .append($numericProgression);

                  $guardianStatsWrapper.append($faction);


                  $factionProgression.velocity({width: percentage+'%'}, {duration: 1000});
                }
              }

            });

        });
        var $close = $('<div>');
        $close.addClass('close_stats').text('x');
        $guardianStatsWrapper.append($close).fadeIn();

      }, 1500);
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

      var percentage = (res.data.levelProgression.progressToNextLevel/80000)*100;
      console.log(percentage);

      var $progressBar = $('<div>'),
          $progression = $('<div>'),
          $xpWrapper = $('<div>'),
          $xpTotal = $('<h3>'),
          $xpDaily = $('<h3>'),
          $xpWeekly = $('<h3>');

      $progressBar.addClass('progress_bar');
      $progression.addClass('progression').css('height', '0');//.css('width', percentage+'%');
      $xpWrapper.addClass('xp_wrapper').css('position', 'absolute');
      $xpTotal.addClass('xp_total').text('all time xp: '+totalXp);
      $xpDaily.addClass('xp_daily').text('daily xp: '+dailyXp);
      $xpWeekly.addClass('xp_weekly').text('weekly xp: '+weeklyXp);


      $xpWrapper.append($xpTotal).append($xpDaily).append($xpWeekly);
      setTimeout(function(){
        /*
        $progressBar.append($progression);
        $('.guardian_image[guardian-id="'+id+'"]')
          //.append($progressBar)
          .append($xpWrapper);

        $progression.velocity({height: percentage+'%'}, {duration: 1500, complete: displayStats(res.data)});
        */
        displayStats(res.data);
      }, 500);
    }

    function displayAggregateActivities(res, id){
      console.log('aggregated activities: ');
      console.dir(res);
      var i = 0;
      //console.log(res.definitions.activities[149381097].activityName);
      res.data.activities.forEach(function(){
        console.log('activity name: '+res.definitions.activities[res.data.activities[i].activityHash].activityName);
        console.log('kills:'+res.data.activities[i].values.activityKills.basic.displayValue);
          i+=1;
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

    function findInventory(id){
      $.ajax({
        type: 'GET',
        url: '/destinyINVENTORY/'+id+'/'+membershipId,
      }).done(function(data){
          if(data){
            data = jQuery.parseJSON(data)
            console.log('detailed inventory:');
            console.dir(data.Response.data);//to check detailed descriptors remove the last .data
          }else{
            console.log('nope');
          }
      });
    }

    function findActivities(id){
      $.ajax({
        type: 'GET',
        url: '/destinyACTIVITIES/'+id+'/'+membershipId,
      }).done(function(data){
          if(data){
            data = jQuery.parseJSON(data)
            console.log('detailed activities:');
            console.dir(data.Response.data);//to check detailed descriptors remove the last .data
          }else{
            console.log('nope');
          }
      });
    }

    function findProgression(id){
      $.ajax({
        type: 'GET',
        url: '/destinyPROGRESSION/'+id+'/'+membershipId,
      }).done(function(data){
          if(data){
            data = jQuery.parseJSON(data)
            console.log('detailed progression:');
            console.dir(data.Response);//to check detailed descriptors remove the last .data
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

      var url = 'http://www.bungie.net/Platform/Destiny/'+accountType+'/Account/'+membershipId+'/Character/'+id+'/Inventory/?definitions=true';
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

      var url = 'http://www.bungie.net/Platform/Destiny/'+accountType+'/Account/'+membershipId+'/Character/'+id+'/Progression/?definitions=true';
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

      var url = 'http://www.bungie.net/Platform/Destiny/'+accountType+'/Account/'+membershipId+'/Character/'+id+'/Activities/?definitions=true';
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

    function getAggregateActivities(id){
      // http://www.bungie.net/platform/Destiny/Stats/AggregateActivityStats/2/4611686018429149347/2305843009215132906/
      var url = 'http://www.bungie.net/Platform/Destiny/Stats/AggregateActivityStats/'+accountType+'/'+membershipId+'/'+id+'/?definitions=true';
      $.ajax({
        type: 'POST',
        url: '/proxyJSON',
        data: JSON.stringify({targetUrl: url}),
        contentType:'application/json; charset=utf-8',
        dataType: 'json'
      }).done(function(data) {
        if(data.Response) {
          console.log('retrieving aggregate activities.... '+data.ErrorStatus+'!');
          displayAggregateActivities(data.Response, id);
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

    $guardianStatsWrapper.on('click touchend', '.close_stats', function(){
      $guardianStatsWrapper.hide();
      $('.guardian_stats_wrapper *').remove();
    });

    $guardianWrapper.on('click', '.guardian_image', function(){
      var id = $(this).attr('guardian-id');
      console.log('guardian-id: '+id);
      //$('.guardian_image[guardian-id="'+id+'"] *').remove();
      if($guardianStatsWrapper.css('display') === 'block'){
        $guardianStatsWrapper.fadeOut();
        $('.guardian_stats_wrapper *').remove();
      }
      getInventory(id);
      getProgression(id);
      //getActivities(id);
      getAggregateActivities(id);
      //findInventory(id);
      //findActivities(id);
      //findProgression(id);
    });

    $guardianWrapper.on('click', '.progression', function(event){
      event.stopPropagation();
      $(this).parent().next().css('z-index', '2').velocity({opacity: 1});
    });

    $input.keypress(function (e) {
      if (e.which == 13 && $input.val() != '') {
        getMemberShipId();
      }
    }); 

    function showGamertags(e){
      if(!$gamertags.hasClass('open')){
        $gamertags.fadeIn();
        $gamertags.addClass('open');
      }else if($gamertags.hasClass('open')){
        $gamertags.fadeOut();
        $gamertags.removeClass('open');
      }
    }

    $burgerIcon.add($gamertagsH1).click(showGamertags);
    //other way
    //  $(document).on("click touchend", ".class1, .class2, .class3", function () {
    //    do stuff
    //  });

    $guardianWrapper.on('click', '.xp_wrapper', function(){
      $('.xp_wrapper').css('z-index','0').velocity({opacity: 0});
    });

    $gamertags.on('click', '.gamertag_tab', function(){
      var gamertag = $(this).find('h2').text();
      $input.val(gamertag);
      $gamertags.fadeOut();
      $gamertags.removeClass('open');
      getMemberShipId();
    });


    // http://www.bungie.net/Platform/Destiny/Manifest/inventoryItem/144553854/
});
