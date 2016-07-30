var ActionsEnergy = (function(){
  var pub = {};

  pub.acquire = function acquire_energy(creep){
    get_energy_from_nearest_spawn(creep);
  }

  function get_energy_from_nearest_spawn(creep){

    var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);

    if(creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
      creep.moveTo(spawn);
    }
  }

  function go_and_withdraw_energy(target){
    if(creep.withdraw(target) == ERR_NOT_IN_RANGE){
      creep.moveTo(target);
    }
  }

  return pub;
})();

module.exports = ActionsEnergy;
