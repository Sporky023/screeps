var roleHarvester = {
  run: function(creep){
    if(creep.carry.energy == creep.carryCapacity){
      creep.say('delivering');
      creep.memory.mode = 'delivering';
    }

    if(creep.carry.energy == 0){
      creep.say('harvesting');
      creep.memory.mode = 'harvesting';
    }

    if(creep.mode == 'delivering'){
      deliverEnergyToSpawn(creep);
    }

    if(creep.mode == 'harvesting'){
      approachAndHarvestNearest(creep);
    }
  }
}

function approachAndHarvestNearest(creep){
  var source = nearest(creep, creep.room.find(FIND_SOURCE));

  approachAndHarvest(creep, source);
}

function nearest(creep, room_objects){
  var output = room_objects[0];

  for(var i = 1; i < room_objects.length; i++){
    var output = room_objects[i];

    if( distance(creep, object) < distance(creep, output) ){
      output = object;
    }

    return output;
  }
}

function distance(obj1, obj2){
  return Math.sqrt(
    Math.pow( (obj1.pos.x - obj2.pos.x), 2 ) +
    Math.pow( (obj1.pos.y - obj2.pos.y), 2 )
  );
}

module.exports = roleHarvester
