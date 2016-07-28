var fail_early = require('fail_early');
var fail_without_class = require('fail_without_class');
var each = require('each');

var Creeps = {
  first: function(){
    return creeps_as_list()[0];
  },

  count: function(){
    return creeps_as_list().length;
  },

  in_room: function(room){
    fail_without_class(room, Room);

    var output = [];

    for(var creepName in Game.creeps){
      var creep = Game.creeps[creepName];

      if( creep.room.name == room.name ){
        output.push(creep);
      }
    }

    return output;
  },

  in_room_in_role: function(room, role){
    fail_early.on(
      function(){ return !(room instanceof Room); },
      'Creeps.in_room_in_role: room is not a Room, got: '+room
    );

    var output = [];

    each(Creeps.in_room(room), function(creep){
      if(creep.memory.role == role){
        output.push(creep);
      }
    });

    return output;
  }
}

function creeps_as_list(){
  var output = [];
  for(var name in Game.creeps){ output.push(Game.creeps[name]) };
  return output;
}


function number_in_role(roleName){
  return creeps_in_role(roleName).length;
}

function creeps_in_role(roleName){
  var output = [];

  each(Game.creeps, function(creep){
    if(creep.memory.role == roleName){
      output.push(creep);
    }
  });

  return output;
}




module.exports = Creeps;
