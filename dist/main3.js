var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function(){
  var spawn = Game.spawns['s1'];

  for(creepName in Game.creeps){
    var creep = Game.creeps[creepName];

    if(creep.memory.role == 'harvester'){
      roleHarvester.run(creep, spawn);
    }

    if(creep.memory.role == 'upgrader'){
      roleUpgrader.run(creep);
    }

    if(creep.memory.role == 'builder'){
      roleBuilder.run(creep);
    }
  }
}
