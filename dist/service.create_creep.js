var autoincrement = require('autoincrement');
var fail_early = require('fail_early');
var Creeps = require('creeps');
var Assigner = require('assigner');

module.exports = (function(){
  var output = {};

  output.create_creep = function create_creep(spawn, role){
    fail_early.on(
      function(){ return !(spawn instanceof Spawn) },
      'CreateCreepService.create_creep / bad spawn, got '+spawn
    );

    fail_early.on(
      function(){ return !(spawn.room instanceof Room) },
      'CreateCreepService.create_creep / bad spawn.room, got '+spawn.room
    )

    var mem = {
      role: role, source_id: Assigner.next_source_id2(spawn)
    };

    var body_parts = body_parts_for_budget(spawn.room.energyCapacityAvailable);
    // console.log('body_parts', JSON.stringify(body_parts));

    var result = spawn.createCreep(
      body_parts,
      role+'-'+autoincrement(),
      mem
    );


    // if(typeof(result) == 'string'){
    //   var creep = Game.creeps[result];
    //   console.log('creep.memory == ', creep.memory);
    //   console.log(
    //     'created_creep with source_id: '+creep.memory.source_id
    //   );
    // }

    return result;
  }

  var body_parts_for_budget = function body_parts_for_budget(energyCapacity){
    var thresholds = {
      300: [WORK, CARRY, CARRY, MOVE, MOVE],
      350: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
      400: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
      500: [WORK, WORK, CARRY, CARRY, CARRY,  MOVE, MOVE, MOVE],
      550: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
      600: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    }

    var output = thresholds[energyCapacity];
    if(!output){ output = thresholds[600]; }
    return output;
  }

  return output;
})();
