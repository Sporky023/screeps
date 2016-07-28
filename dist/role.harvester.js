var each = require('each');
var HarvestActions = require('actions.harvest');
var Sources = require('sources');
// var approachAndHarvestNearest = require('action.approach_and_harvest_nearest');

var roleHarvester = {
  run: function(creep, spawn){
    if(creep.carry.energy == creep.carryCapacity){
      creep.say('delivering');
      creep.memory.mode = 'delivering';
    }

    if(creep.carry.energy == 0 || creep.memory.mode == undefined){
      creep.say('harvesting');
      creep.memory.mode = 'harvesting';
    }

    if(creep.memory.mode == 'delivering'){
      deliverEnergy(creep);
    }

    if(creep.memory.mode == 'harvesting'){
      approachAndHarvestAssignedOrNearest(creep);
    }
  }
}

function approachAndHarvestAssignedOrNearest(creep){
  if(typeof(creep.memory.source_id) == 'string'){
    HarvestActions.approach_and_harvest(
      creep, Sources.find(creep.memory.source_id, creep)
    );

  } else {
    HarvestActions.approach_and_harvest_nearest(creep);
  }
}

function deliverEnergy(creep){
  fail_early.on(
    function(){ return !(creep instanceof Creep) },
    'roleHarvester.deliverEnergy / creep is not a Creep; got '+creep
  );

  var structures = creep.room.find(FIND_MY_STRUCTURES);

  var targets = [];
  each(structures, function(s){
    if(
      s.structureType == STRUCTURE_SPAWN ||
      s.structureType == STRUCTURE_EXTENSION
    ){

      targets.push(s);
    }
  });
  
  // , function(structure){
  //   return(
  //     structure.structureType == STRUCTURE_EXTENSION ||
  //     structure.structureType == STRUCTURE_SPAWN &&
  //     structure.energyAvailable < structure.energyCapacity
  //   );
  // });


  if(targets[0]){
    approachAndTransferEnergy(creep, targets[0]);
  } else {
    moveTo(creep.room.controller);
  }
}

function approachAndTransferEnergy(creep, target){
  if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    creep.moveTo(target);
  }
}


module.exports = roleHarvester
