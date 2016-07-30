var expect_class = require('expect_class');

var CreepPopulator = require('creep_populator');
var CreepActor = require('creep_actor');
var Construction = require('construction');
var Assigner = require('assigner');

module.exports.loop = function(){
  for(var key in Game.spawns){
    var spawn = Game.spawns[key];
    var room = spawn.room;


    expect_class(spawn, Spawn);
    expect_class(room, Room);

    Construction.plan(room);
    CreepPopulator.populate(room);
    CreepActor.act(room);
  }
}
