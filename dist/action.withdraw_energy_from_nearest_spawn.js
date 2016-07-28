var withdrawEnergyFromNearestSpawn =
  function withdrawEnergyFromNearestSpawn(creep){

  var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);

  if(creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    creep.moveTo(spawn);
  }
}

module.exports = withdrawEnergyFromNearestSpawn;
