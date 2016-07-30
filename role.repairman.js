var roleRepairman = (function(){
  var output = {};
  var acquire_energy = require('action.acquire_energy');
  var _creep;

  function acquire_energy(){
    actions.energy.acquire(_creep);
  }

  function repair_nearest_damaged(){
    actions.repair.nearest_damaged(_creep);
  }

  output.run = function(creep){
    _creep = creep;

    var modes = {
      'energy-empty' => acquire_energy,
      'energy-full' => repair_nearest_damaged
    }
  }

  return output;
})();


