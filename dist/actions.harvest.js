module.exports = (function(){
  var output = {}

  output.approach_and_harvest = function approach_and_harvest(creep, source){
    if(creep.harvest(source) == ERR_NOT_IN_RANGE){
      creep.moveTo(source);
    }
  }

  output.approach_and_harvest_nearest =
    function approach_and_harvest_nearest(creep){
    
    faile_early.on(
      function(){ return !(creep instanceof Creep); },
      'HarvestActions.approach_and_harvest / bad creep, got '+creep
    );


    var source = nearest(creep, creep.room.find(FIND_SOURCES));

    output.approach_and_harvest(creep, source);
  }

  function nearest(creep, room_objects){
    var output = room_objects[0];

    for(var i = 1; i < room_objects.length; i++){
      var object = room_objects[i];

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

  return output;
}
    )();
