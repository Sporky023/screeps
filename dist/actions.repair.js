var order = require('order');

var ActionsRepair = (function(){
  var pub = {};

  pub.nearest_damaged = function nearest_damaged(creep){
    var target = creep.pos.findClosest(FIND_STRUCTURES, {
      filter: function(structure){
        return structure.structureType != STRUCTURE_ROAD;
      }
    });

    order(creep).to('repair', target);
  }
})();
