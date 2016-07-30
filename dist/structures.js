var select = require('select');

var Structures = (function(){
  var pub = {};

  pub.of_types = function(room, types){
    return select( pub.all(room), function(structure){
      return types.indexOf(structure.structureType) > -1;
    });
  }

  pub.of_type = function(room, type){ return pub.by_type(room, type); }

  pub.by_type = function(room, type){
    return select( pub.all(room), function(structure){
      return structure.structureType == type;
    });
  }

  pub.all = function(room){
    return room.find(FIND_STRUCTURES);
  }
  return pub;
})();

module.exports = Structures;
