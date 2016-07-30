var expect_class = require('expect_class');
var select = require('select');
var distance_between = require('distance_between');
var sort_by = require('sort_by');
var fail_early = require('fail_early');
var map = require('map');
var each = require('each');
var Sources = require('sources');
var Creeps = require('creeps');
var Quotas = require('quotas');

module.exports = (function(){
  var output = {};

  output.all_creep_source_ids = function all_creep_source_ids(room){
    return map( Creeps.in_room(room), function(creep){
      return {
        creep_id: creep.id,
        source_id: creep.source_id == undefined ? '<undefined>' : creep.source_id
      };
    });
  }

  output.harvester_allocation = function harvester_allocation(room){
    return map( Sources.all(room), function(source){
      return {
        source_id: source.id,
        pos: source.pos,
        all_creeps_length: Creeps.all(room).length,

        allocated: select( Creeps.all(room), function(creep){
          return(
            creep.memory.role == 'harvester' &&
            creep.source_id == source.id
          );
        })
      };
    });
  }

  output.next_source_id2 = function next_source_id2(spawn){
    var quota_to_fill = next_unfilled_quota(spawn);
    var output;

    if(typeof(quota_to_fill) == 'object'){
      output = quota_to_fill.source_id;
    }

    return output;
  }

  function next_unfilled_quota(spawn){
    expect_class(spawn, Spawn);

    var source_quotas = Quotas.source_to_harvester_count(spawn)

    for(var quota of source_quotas){
      if(quota_unmet(spawn, quota) ){
        return quota;
      }
    }
  }

  function quota_unmet(spawn, quota){
    var creeps = Creeps.in_role(spawn.room, 'harvester');

    var harvester_count = select( creeps,
      function(creep){
        return creep.memory.source_id == quota.source_id;
      }
    ).length;

    var output = harvester_count < quota.harvester_count; 
    return output;
  }

  output.next_source_id = function next_source_id(spawn){
    fail_early.on(
      function(){ return !(spawn instanceof Spawn) },
      'Assigner.next_source_id / bad spawn, got '+spawn
    )

    var room = spawn.room;

    var sources = sort_by(Sources.in_room(room), function(source){
      return distance_between(spawn.pos, source.pos);
    });

    var source_ids = map(sources, 'id');
    var output = source_ids[next_source_index(spawn)];
    // console.log('Assigner.next_source_id2 / output = '+ output);
    return source_ids[next_source_index(spawn)];
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

