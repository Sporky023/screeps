var select = require('select');

var Structures = (function(){
  var pub = {};

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
