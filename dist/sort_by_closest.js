var sort_by = require('sort_by');
var distance_between = require('distance_between');

var sort_by_closest = function( list, target ){
  return sort_by( list,

    function(item_a, item_b){
      if(item_b == undefined || item_b == null){
        return false;
      }

      return(
        distance_between(target.pos, item_a.pos) <
        distance_between(target.pos, item_b.pos)
      );
    }
  );
}

module.exports = sort_by_closest;
