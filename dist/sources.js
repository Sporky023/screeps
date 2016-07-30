var Sources = (function(){
  var map = require('map');
  var each = require('each');
  var fail_early = require('fail_early');

  var sources_by_room = {};

  var output = {};

  output.closest_to_creep = function closest_to_creep(creep){
    var output = creep.pos.findClosestByPath(FIND_SOURCES);

    if( output == undefined || output == null ) {
      output = output.closest_to_creep_crow(creep);
    }

    return output;
  }

  function closest_to_creep_crow(creep){
    return sort_by(
      creep.room.find(FIND_SOURCES),

      function(sourceA, sourceB){
        if(sourceB == undefined){ return true; }

        return(
          distance_between(sourceA.pos, creep.pos) >
          distance_between(sourceB.pos, creep.pos)
        );
      }
    );
  }

  function all(room){
    var sources = sources_by_room[room.name];

    if(typeof(sources) == 'object'){
      return sources_by_room[room.name];
    } else {
      var output = room.find(FIND_SOURCES);
      sources_by_room[room.name] = output;
      return output;
    }
  }

  output.ids_in_room = function ids_in_room(room){
    fail_early.on(
      function(){ return !(room instanceof Room) },
      'Sources.ids_in_room / bad room, got '+room 
    );

    return map( Sources.in_room(room), 'id');
  }

  output.find = function find(id, room){
    var output;

    each(all(room), function(source){
      if(source.id == id){
        output = source 
      }
    });
    
    return output;
  }

  output.all = function all(room){ return output.in_room(room); }

  output.in_room = function in_room(room){
    fail_early.on(
      function(){
        var output = !(room instanceof Room);
        return output;
      },
      'Sources.in_room / room is not a Room; got '+room
    );

    return room.find(FIND_SOURCES);
  }

  return output;
}
    )();

module.exports = Sources;
