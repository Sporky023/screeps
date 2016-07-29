var CreepPopulator = require('creep_populator');
var CreepActor = require('creep_actor');

module.exports.loop = function(){
  for(var key in Game.spawns){
    var spawn = Game.spawns[key];
    var room = spawn.room;

    console.log(
      'spawn "'+spawn.name+'",'+
      ' spawn.memory.assigner_last_source_index: '+
        spawn.memory.assigner_last_source_index
    );

    CreepPopulator.populate(room);
    CreepActor.act(room);
  }
}
