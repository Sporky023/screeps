var map = require('map');
var each = require('each');
var Sources = require('sources');
var Creeps = require('creeps');

var Assigner = {
  least_assigned_source_id: function(room){
    console.log('Assigner.least_assigned_source_id()');

    var stc = source_ids_to_creep_ids(room);
    console.log('Assigner.least_assigned_source_id / got stc');
    var source_ids = Sources.ids_in_room(room);
    console.log('Assigner.least_assigned_source_id / got source_ids');

    if(all_values_have_equal_length(stc)){

      return source_ids[0];
    } else {
      return key_where_min_value_length(stc);
    }
  }
}

function source_ids_to_creep_ids(room){
  console.log('Assigner.source_ids_to_creep_ids('+room+')');

  var output = {};

  var source_ids = Sources.ids_in_room(room);
  console.log(
    'Assigner.source_ids_to_creep_ids / Sources.in_room(room) = ',
    Sources.in_room(room)
  );

  // console.log('Assigner.source_ids_to_creep_ids / source_ids = ', source_ids);

  var creeps = Creeps.in_room(room);

  each(source_ids, function(source_id){
    output[source_id] = [];

    each(creeps, function(creep){
      if(creep.source_id == source_id){
        output[source_id].push(creep.name);
      }
    });
  });

  console.log('Assigner.source_ids_to_creep_ids / output = ', output);

  return output;
}

function all_values_have_equal_length(object){
  var seen = null;

  for(var propname in object){
    var value = object[propname];

    if(typeof(seen) == 'number' && value.length != seen){
      return false;
    } else {
      seen = value.length;
    }
  }

  return true;
}


// function sources_to_creeps(room){
//   var output = {};

//   each(Sources.in_room(room), function(source){
//     output[source.id] = [];

//     each(Creeps.in_room(room), function(creep){
//       if(creep.room.id == room.id){
//         output[source.id].push(creep);
//       }
//     })
//   });
// }

  // bestSpawnToMine: function(room){
  //   if( spawns_currently_assigned_equally ){
  //     return_first();
  //   }  else {
  //     return_one_with_lowest_assigned_count();
  //   }
  //   each(creeps_in_room(room), function(creep){

  //   });
  // }

// }

module.exports = Assigner;
