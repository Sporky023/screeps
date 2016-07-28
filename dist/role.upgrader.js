var withdrawEnergyFromNearestSpawn =
  require('action.withdraw_energy_from_nearest_spawn');
  
var roleUpgrader = {
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
      approachAndUpgradeController(creep);
    }
  }
}

function approachAndUpgradeController(creep){
  if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
    creep.moveTo(creep.room.controller);
  }
}

module.exports = roleUpgrader;
