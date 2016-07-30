// var expect_class = require('expect_class');
var select = require('select');
var each = require('each');

var ConstructionFulfillment = require('construction_fulfillment');
var Creeps = require('creeps');
var Sites = require('sites');
var Quotas = require('quotas');

var Construction = (function(){
  var pub = {};

  var min_road_sites = 2;
  var max_road_sites = 4;

  pub.plan = function plan(room){
    // if( should_build_roads(room) ){
    //   make_road_for_every_creep(room);
    // }

    // if(true){
    // // if( too_many_road_sites(room) ){
    //   destroy_a_road_site(room);
    // }

    var quota = Quotas.extensions(room);
    var quota_fulfiller = ConstructionFulfillment.fulfill(room, quota);

  }

  function too_many_road_sites(room){
    return road_sites(room).length > man_road_sites;
  }

  function destroy_a_road_site(room){ road_sites(room)[0].remove(); }
  function road_sites(room){ return Sites.by_structureType(room, 'road'); }
  function road_count(room){ return road_sites(room).length }

  function make_road_for_every_creep(room){
    // expect_class(room, Room, 'room should be a Room');

    var creeps = creeps_for_roads(room);

    each( creeps, function(creep){
      // expect_class(creep, Creep);

      if( should_build_roads(creep.room) ){
        creep.pos.createConstructionSite(STRUCTURE_ROAD);
      }
    });
  }

  function reduce_roads_to_allowed(room){
    // expect_class(room, Room);






    var sites = select( Sites.all(room), function(site){
      return site.structureType == 'road';
    });

    each( sites, function(site){
      if( !should_build_roads(room) ){ site.remove(); }
    });
  }

  function creeps_for_roads(room){
    return select(
      Creeps.in_room(room),

      function(creep){
        return ['harvester', 'upgrader'].indexOf(creep.memory.role) > -1;
      }
    );
  }


  function should_build_roads(room){
    // console.log(
    //   'Construction.should_build_roads: Sites.count',
    //   Sites.count(room),
    //   Creeps.count_in_role(room, 'builder') * 5
    // );

    return( Sites.count_by_structureType(room, 'road') < min_road_sites );
  }

  return pub;
})();

module.exports = Construction;
