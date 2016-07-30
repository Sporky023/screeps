var actions = require('actions');
var Sites = require('sites');
var Structures = require('structures');
  
var roleBuilder = {
  run: function(creep){
    console.log('hello from a branch');

    if(creep.carry.energy == 0 || creep.memory.mode == undefined){
      creep.memory.mode = 'energy-empty';
    }

    if(creep.carry.energy == creep.carryCapacity){
      creep.memory.mode = 'energy-full';
    }

    if(creep.memory.mode == 'energy-empty'){
      actions.energy.acquire(creep);
    }

    if(creep.memory.mode == 'energy-full'){
      var target = best_target(creep.room);
      // var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

      if(target){
        approachAndBuild(creep, target);
      }
    }
  }
}

function best_target(room){
  var checklist = [
    { structureType: 'extension', quota: 5 },
    { structuretype: 'road', quota: 10 },
    { structuretype: 'road', quota: 100 },
  ];

  for(var item of checklist){
    if( !fulfilled(room, item) && ready_to_fulfill(room, item) ){
      if( sites_exist_to_fulfill(room, item) ){
        return Sites.by_structureType(room, item.structureType)[0]
      }
    }
  }
}

function fulfilled(room, item) {
  return Structures.by_type(room, item.type).length >= item.quota
}

function ready_to_fulfill(room, item){
  if(item.structureType == 'extension' && room.controller.level < 2){
    return false;
  }

  return true;
}

function sites_exist_to_fulfill(room, item){
  return Sites.by_structureType(room, item.structureType).length > 0;
}

function approachAndBuild(creep, target){
  if(creep.build(target) == ERR_NOT_IN_RANGE){
    creep.moveTo(target);
  }
}

module.exports = roleBuilder;
