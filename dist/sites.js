var select = require('select');
var expect_class = require('expect_class');

var Sites = (function(){
  var pub = {};

  pub.by_structureType = function by_structureType(room, type){
    return select( pub.all(room), function(site){
      return site.structureType == type;
    });
  }

  pub.count_by_structureType = function count(room, type){
    return pub.by_structureType(room, type).length;
  }

  pub.count = function count(room){
    return pub.all(room).length;
  }

  pub.all = function all(room){
    expect_class(room, Room);

    return room.find(FIND_CONSTRUCTION_SITES);
  }

  return pub;
})();

module.exports = Sites;
