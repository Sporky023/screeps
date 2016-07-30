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

    console.log(
      'Assigner.next_source_id2 = ',
      Assigner.next_source_id2(spawn)
    );

    // console.log(
    //   'Assigner.harvester_allocations = ',
    //   JSON.stringify(      Assigner.harvester_allocation(room) )
    // );

    // console.log(
    //   'AllCreepHarvesterIds = ',
    //   JSON.stringify( Assigner.all_creep_source_ids(room) )
    // );
    //
    Construction.plan(room);
    CreepPopulator.populate(room);
    CreepActor.act(room);
  }
}
