var map = require('map');
var each = require('each');
var fail_early = require('fail_early');

var Sources = {
  ids_in_room: function(room){
    // console.log('Sources.ids_in_room('+room+')');

    fail_early.on(
      function(){ return !(room instanceof Room) },
      'Sources.ids_in_room / bad room, got '+room
    );

    var sources = Sources.in_room(room);

    var output = map(
      sources,
      function(source){ return source.id; } 
    );

    // console.log('Sources.ids_in_room / finished with output = ', output);

    return output;
  },

  find: function find(id, creep){
    fail_early.on(
      function(){ return !(creep instanceof Creep) },
      'Sources.find / creep is not a Creep; got '+creep
    );

    var output;

    each(creep.room.find(FIND_SOURCES), function(source){
      if(source.id == id){
        output = source 
      }
    });
    
    return output;
  },

  in_room: function in_room(room){
    // console.log('Sources.in_room('+room+')');

    fail_early.on(
      function(){
        var output = !(room instanceof Room);
        // return !(room instanceof Room);
        return output;
      },
      'Sources.in_room / room is not a Room; got '+room
    );

    return room.find(FIND_SOURCES);
  }
}

module.exports = Sources;
