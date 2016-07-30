var autoincrement = function(){
  var spawn = get_autoincrement_spawn();

  var output;

  if(typeof(spawn.memory.autoincrement) == 'number'){
    output = spawn.memory.autoincrement;
  } else {
    output = 0;
  }

  spawn.memory.autoincrement = output + 1;

  return output;
}

function get_autoincrement_spawn(){
  var output;

  for(var name in Game.spawns){
    output = Game.spawns[name];

    if(typeof(output.memory.autoincrement) == 'number'){
      return output;
    }
  }

  return output;
}

module.exports = autoincrement;
