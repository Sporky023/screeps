var withdrawEnergyFromNearestSpawn =
  require('action.withdraw_energy_from_nearest_spawn');
  
var roleBuilder = {
  run: function(creep){
    if(creep.carry.energy == 0 || creep.memory.mode == undefined){
      creep.memory.mode = 'energy-empty';
    }

    if(creep.carry.energy == creep.carryCapacity){
      creep.memory.mode = 'energy-full';
    }

    if(creep.memory.mode == 'energy-empty'){
      withdrawEnergyFromNearestSpawn(creep);
    }

    if(creep.memory.mode == 'energy-full'){
      var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

      if(target){
        approachAndBuild(creep, target);
      }
    }
  }
}

function approachAndBuild(creep, target){
  if(creep.build(target) == ERR_NOT_IN_RANGE){
    creep.moveTo(target);
  }
}

module.exports = roleBuilder;
