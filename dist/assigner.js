var distance_between = require('distance_between');
var sort_by = require('sort_by');
var fail_early = require('fail_early');
var map = require('map');
var each = require('each');
var Sources = require('sources');
var Creeps = require('creeps');

module.exports = (function(){
  var output = {};

  output.next_source_id = function next_source_id(spawn){
    fail_early.on(
      function(){ return !(spawn instanceof Spawn) },
      'Assigner.next_source_id / bad spawn, got '+spawn
    )

    var room = spawn.room;

    var sources = sort_by(Sources.in_room(room), function(source){
      return distance_between(spawn.pos, source.pos);
    });

    // console.log('spawn', spawn.pos);

    // console.log(
    //   'sources', JSON.stringify(
    //     map(sources, function(source){
    //       return [source.id, source.pos, distance_between(spawn.pos, source.pos)];
    //     })
    //   ) 
    // );

    var source_ids = map(sources, 'id');
    // var source_ids = map(sources, function(source){ return source.id});

    // console.log('source_ids', JSON.stringify(source_ids));
    return source_ids[next_source_index(spawn)];
    // return Sources.ids_in_room(room).sort()[next_source_index(room)];
  }

  output.increment_next_source_id = function increment_next_source_id(spawn){
    var room = spawn.room;
    var output;
    var last_source_index = next_source_index(spawn);

    if(last_source_index >= Sources.ids_in_room(room).length - 1){
      output = 0;
    } else {
      output = last_source_index + 1;
    }

    console.log('setting to '+output);
    set_last_source_index(spawn, output);
  }

  function next_source_index(spawn){
    var old_value = read_last_source_index(spawn);

    if(typeof(old_value) == 'number'){
      return old_value;
    } else {
      return 0;
    }
  }

  function read_last_source_index(spawn){
    return spawn.memory.assigner_last_source_index;
  }

  function set_last_source_index(spawn, value){
    spawn.memory.assigner_last_source_index = value;
  }

  return output;
})();

