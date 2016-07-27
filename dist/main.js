var roleHarvester = require('role.harvester');

module.exports.loop = function(){
  for(creepName in Game.creeps){
    var c = Game.creeps[creepName];

    if(c.memory.role == 'harvester'){
      roleHarvester.run(creep);
    }
  }
}
