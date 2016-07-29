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

    spawn.createCreep(
      [WORK, CARRY, MOVE],
      role+Creeps.count(),
      { role: role, source_id: Assigner.next_source_id(spawn.room) }
    );
  }

  return output;
})();
