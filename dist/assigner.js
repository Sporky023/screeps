var fail_early = require('fail_early');
var map = require('map');
var each = require('each');
var Sources = require('sources');
var Creeps = require('creeps');

module.exports = (function(){
  var output = {};

  output.next_source_id = function next_source_id(room){
    fail_early.on(
      function(){ return !(room instanceof Room) },
      'Assigner.next_source_id / bad room, got '+room
    )

    return Sources.ids_in_room(room).sort()[next_source_index(room)];
  }

  var next_source_index = function next_source_index(room){
    var output;
    var last_source_index = get_last_source_index_from_spawn(room);

    if(typeof(last_source_index) == 'number'){
      if(last_source_index >= Sources.ids_in_room(room).length - 1){
        output = 0;
      } else {
        output = last_source_index + 1;
      }

    } else {
      output = 0;
    }

    set_last_source_index_to_spawn(room, output);

    return output;
  }

  return output;
})();

function get_last_source_index_from_spawn(room){
  var spawn = room.find(FIND_MY_SPAWNS)[0];

  return spawn.memory.assigner_last_source_index;
}

function set_last_source_index_to_spawn(room, value){
  var spawn = room.find(FIND_MY_SPAWNS)[0];

  spawn.memory.assigner_last_source_index = value;
}

