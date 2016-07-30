var distance_between = require('distance_between');

var ActionsEnergy = (function(){
  var pub = {};

  pub.acquire = function acquire_energy(creep){
    get_energy_from_nearest_spawn_or_source(creep);
  }

  function get_energy_from_nearest_spawn_or_source(creep){
    var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    var source = creep.pos.findClosestByPath(FIND_SOURCES);

    if(
      distance_between(creep.pos, spawn.pos) <
      distance_between(creep.pos, source.pos)
    ){
      go_and_withdraw_energy(creep, spawn);
    } else {
      go_and_harvest(creep, source);
    }
  }

  function get_energy_from_nearest_spawn(creep){

    var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);

    if(creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
      creep.moveTo(spawn);
    }
  }

  function go_and_withdraw_energy(creep, target){
    if(creep.withdraw(target) == ERR_NOT_IN_RANGE){
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
