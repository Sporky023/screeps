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

    var result = spawn.createCreep(
      [WORK, CARRY, MOVE],
      role+'-'+autoincrement(),
      mem
    );


    if(typeof(result) == 'string'){
      var creep = Game.creeps[result];
      console.log('creep.memory == ', creep.memory);
      console.log(
        'created_creep with source_id: '+creep.memory.source_id
      );
    }

    return result;
  }

  return output;
})();
