var sort_by = require('sort_by');
var expect_class = require('expect_class');
var map = require('map');
var Sources = require('sources');
var distance_between = require('distance_between');

var Quotas = (function(){
  var pub = {};

  pub.extensions = function extensions(room){
    if(room.controller.level >= 2){
      return { type: 'extension', min: 5 };
    } else {
      return { type: 'extension', min: 0 };
    }
  }

  pub.source_to_harvester_count =
    function source_to_harvester_count(spawn){

    expect_class(spawn, Spawn);

    var output = map( sources_for_quotas(spawn),
      function(source){
        var dist = distance_between(source.pos, spawn.pos);

        var output = {
          source_id: source.id,
          distance: dist,
          harvester_count: distance_to_harvester_quota(dist)
        };

        return output;
      }
    );

    return output;
  }

  function distance_to_harvester_quota(distance){
    return (distance / 5) + 1;
  }

  function sources_for_quotas(spawn){
    return sort_by(
      Sources.all(spawn.room),

      function(sourceA, sourceB){
        if(sourceB == undefined){ return true }

        return(
          distance_between(sourceA.pos, spawn.pos) <
          distance_between(sourceB.pos, spawn.pos)
        );
      } 
    );
  }

  return pub;

})();

module.exports = Quotas;
