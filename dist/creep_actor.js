var fail_early = require('fail_early');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var each = require('each');
var Creeps = require('creeps');

var CreepActor = {
  act: function(room){
    each(Creeps.in_room(room), function(creep){
      if(creep.memory.disabled){
        creep.say('disabled');
      } else {
        console.log('creep.pos', creep.pos);
        act_as_creep(creep);
      }
    });
  }
}

function act_as_creep(creep){
  var role = creep.memory.role;

  fail_early.on(function(){ 
    return ['harvester', 'upgrader', 'builder'].indexOf(role) < 0;
  }, 'CreepActor.act_as_creep: bad role name "'+role+'"');

  var roles = {
    harvester: roleHarvester,
    upgrader: roleUpgrader,
    builder: roleBuilder
  };

  var roleActor = roles[role];

  roleActor.run(creep);
}

module.exports = CreepActor;
