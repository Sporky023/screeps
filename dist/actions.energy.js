var map = require('map');
var expect_class = require('expect_class');
var distance_between = require('distance_between');
var Sources = require('sources');
var Structures = require('structures');

var ActionsEnergy = (function(){
  var pub = {};

  pub.acquire = function acquire(creep){
    expect_class(creep, Creep);

    get_energy_from_best(creep);
  }

  function get_energy_from_best(creep){
    var targets = Structures.of_types(creep.room,
      ['container', 'extension', 'spawn']);

    var target_values = map(targets, function(target){
      return {
        target: target,
        value: target_value_to_acquire_energy(creep, target)
      }
    });

    var best_target_expanded = target_values[0];

    for(var tv of target_values){
      if(tv.value > best_target_expanded.value){
        best_target_expanded = tv;
      }
    }

    go_and_withdraw_energy(creep, best_target_expanded.target);
  }

  function target_value_to_acquire_energy(creep, target){
    var type_score = {
      container: 5,
      extension: 2,
      extension: 2
    }[target.structureType];

    var distance_score = (40/distance_between(creep.pos, target.pos)) * 2;

    return type_score + distance_score;
  }

  function get_energy_from_nearest_spawn_or_source(creep){
    var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    var source = creep.pos.findClosestByPath(FIND_SOURCES);

    if(is_blank(spawn) && is_blank(source)){
      return false;

    } else if(is_blank(spawn)){
      go_and_harvest(creep, source);
      return false;

    } else if(is_blank(source)){
      go_and_withdraw_energy(creep, spawn);
      return false;

    }

    if(
      distance_between(creep.pos, spawn.pos) <
      distance_between(creep.pos, source.pos)
    ){
      go_and_withdraw_energy(creep, spawn);
    } else {
      go_and_harvest(creep, source);
    }
  }

  function is_blank(x){
    return x == undefined || x == null;
  }

  function get_energy_from_nearest_spawn(creep){

    var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);

    if(creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
      creep.moveTo(spawn);
    }
  }

  function go_and_withdraw_energy(creep, target){
    if(
      creep.withdraw(target, RESOURCE_ENERGY) ==
      ERR_NOT_IN_RANGE
    ){
      creep.moveTo(target);
    }
  }

  function go_and_harvest(creep, target){
    if(creep.harvest(target) == ERR_NOT_IN_RANGE){
      creep.moveTo(target);
    }
  }

  return pub;
}
    )();

module.exports = ActionsEnergy;
