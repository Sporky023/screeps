var CreepPopulator = require('creep_populator');
var CreepActor = require('creep_actor');
var Assigner = require('assigner');

var pepstin = {
  roles: ['builder', 'upgrader', 'spawnfiller']
}

module.exports.loop = function(){
  // console.log(JSON.stringify(Game.spawns));

  for(var key in Game.spawns){
    var spawn = Game.spawns[key];
    var room = spawn.room;

    // Assigner.assignCreepsToEnergySources(room);
    CreepPopulator.populate(room);
    CreepActor.act(room);
  }
}
