var CreepPopulator = require('creep_populator');
var CreepActor = require('creep_actor');
var Assigner = require('assigner');

module.exports.loop = function(){
  for(var key in Game.spawns){
    var spawn = Game.spawns[key];
    var room = spawn.room;

    CreepPopulator.populate(room);
    CreepActor.act(room);
  }
}
