var distance_between = require('distance_between');
var map = require('map');
var select = require('select');
var fail_early = require('fail_early');
var each = require('each');
var sort_by_closest = require('sort_by_closest');
var HarvestActions = require('actions.harvest');
var Sources = require('sources');
var Structures = require('structures');
var is_blank = require('is_blank');

var roleHarvester = {
  run: function(creep){
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];

    if(
      creep.carry.energy == creep.carryCapacity &&
      creep.memory.mode != 'delivering' &&
      spawn.energy < spawn.energyCapacity
    ){
      creep.say('delivering');
      creep.memory.mode = 'delivering';
    }

    if(
      creep.carry.energy == creep.carryCapacity &&
      creep.memory.mode != 'make space' &&
      creep.room.availableEnergy >= creep.room.energyCapacityAvailable
    ){
      creep.say('make space');
      creep.memory.mode = 'make space';
    }

    if(creep.carry.energy == 0 && creep.memory.mode != 'harvesting'){
      creep.say('harvesting');
      creep.memory.mode = 'harvesting';
    }

    if(creep.memory.mode == 'delivering'){
      deliverEnergy(creep);
    }

    if(creep.memory.mode == 'harvesting'){
      approachAndHarvestAssignedOrNearest(creep);
    }

    if(creep.memory.mode == 'make space'){
      if(distance_between(creep.pos, spawn.pos) < 4){
        creep.moveTo(creep.pos.x + 1, creep.pos.y + 1);
      }
    }
  }
}

function approachAndHarvestAssignedOrNearest(creep){
  if(typeof(creep.memory.source_id) == 'string'){
    HarvestActions.approach_and_harvest(
      creep,
      Sources.find(creep.memory.source_id, creep.room)
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

  var spawns = Structures.of_type(creep.room, 'spawn');
  var extensions = Structures.of_type(creep.room, 'extension');

  var targets = spawns.concat(extensions);
  var targets = select( targets, function(target){
    return target.energy < target.energyCapacity;
  });

  var targets_expanded = map( targets, function(target){
    return {
      target: target,
      distance: distance_between(target.pos, creep.pos)
    };
  } );

  var closest_expanded = null;
  each( targets_expanded, function(target_expanded){
    if(
      closest_expanded == null ||
      target_expanded.distance < closest_expanded.distance
    ){

      closest_expanded = target_expanded;
    }
  } );

  if(targets.length > 0){
    var closest_target = closest_expanded.target;
  }

  if(!is_blank(closest_target) ){
    approachAndTransferEnergy(creep, closest_target);
  } else {
    creep.moveTo(creep.room.controller);
  }
}

function approachAndTransferEnergy(creep, target){
  if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    creep.moveTo(target);
  }
}


module.exports = roleHarvester
