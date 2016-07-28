var fail_early = require('fail_early');
var map = require('map');
var each = require('each');
var Creeps = require('creeps');
var CreateCreepService = require('service.create_creep');

module.exports = (function(){
  var roleDemand = { builder: 1, upgrader: 1, harvester: 2 };

  var output = {};

  output.populate = function populate(room){
    // console.log('CreepPopulator.populate()');

    fail_early.on(
      function(){ return !(room instanceof Room) },
      'CreepPopulator.populate / room is not a Room, got '+room
    );

    var spawns = room.find(FIND_MY_SPAWNS);

    each(spawns, populate_spawn);
  }

  function populate_spawn(spawn){
    var checklist = [
      { role: 'harvester', count: 3 },
      { role: 'upgrader', count : 1 },
      { role: 'builder', count: 1 }
    ];

    for(var i = 0; i < checklist.length; i++){
      var item = checklist[i];

      if( !checklist_item_fulfilled(spawn, item) ){
        // console.log(
        //   'CreepPopulator.populate_spawn / checklist item not fulfilled',
        //   spawn,
        //   item
        // );

        create_creep_for_checklist_item(spawn, item);

        return;
      }
    }
  }

  function checklist_item_fulfilled(spawn, item){
    var creeps = Creeps.in_room_in_role(spawn.room, item.role);

    var output = creeps.length >= item.count;

    return output;
  }

  function create_creep_for_checklist_item(spawn, item){
    CreateCreepService.create_creep(spawn, item.role);
  }

  return output
}
    )(); 


