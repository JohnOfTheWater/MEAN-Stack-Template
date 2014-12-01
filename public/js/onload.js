$('document').ready(function(){

  var membershipType = 2,
    membershipId = '4611686018428410896',
    accountType = 'TigerPSN',
    characterId = '2305843009215383036', //titan
    url1 = 'http://www.bungie.net/Platform/Destiny/' + accountType + '/Account/' + membershipId + '/Character/' + characterId + '/Inventory/'
    url = 'http://www.bungie.net/en/Legend/' + membershipType + '/' + membershipId + '/' + characterId;

    console.log(url); // pretty bungie link
    console.log(url1); //inventory
});
