var fail_early = require('fail_early');
var Assigner = require('assigner');
var Creeps = require('creeps');

module.exports = (function(){
  var output = {};
  var create_creep_with_energy;

  output.create_creep = function(spawn, role){
    // console.log('CreateCreepService', spawn.name);

    fail_early.on(
      function(){ return !(spawn instanceof Spawn); },
      'CreateCreepService.create_creep: spawn is not a Spawn, got: '+spawn
    );

    fail_early.on(function(){
      return ['harvester', 'builder', 'upgrader'].indexOf(role) < 0;
    }, 'CreateCreepService.create_creep / bad role: '+role);

    output.create_creep_with_energy(spawn, role, spawn.energy);
  }

  function bodyParts(role, energy_budget){
    return [WORK, CARRY, MOVE];
  }

  output.create_creep_with_energy = function create_creep_with_energy(
    spawn, role
  ){

    console.log(
      'CreateCreepService.create_creep_with_energy()',
      spawn, role
    );


    var room = spawn.room;

    var parts = bodyParts(role, spawn.energy);
    var name = role+(Creeps.count() + 1);

    console.log('CreateCreepService.create_creep_with_energy 2');

    var memory = {};
    console.log('CreateCreepService.create_creep_with_energy 3');
    memory.role = role;
    console.log('CreateCreepService.create_creep_with_energy 4');
    memory.source_id = Assigner.least_assigned_source_id(room);
    console.log('CreateCreepService.create_creep_with_energy 5');

    // var memory = {
    //   role: role,
    //   source_id: Assigner.least_assigned_source_id(room)
    // };

    console.log('CreateCreepService.create_creep_with_energy 3');

    console.log('CreateCreepService.create_creep_with_energy / canceling just before spawn.createCreep()');

    var result = spawn.createCreep(parts, name, memory);

    if(result == ERR_NOT_ENOUGH_ENERGY){ }
  }

  return output;
})();
