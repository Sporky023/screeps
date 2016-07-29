var fail_early = require('fail_early');

module.exports = function(pos_a, pos_b){
  fail_early.on(
    function(){
      return !(
        typeof(pos_a.x) == 'number' &&
        typeof(pos_a.y) == 'number' &&
        typeof(pos_b.x) == 'number' &&
        typeof(pos_b.y) == 'number'
      )
    },

    'Non-position variable(s) passed to distance_between()'
  );

  return Math.sqrt(
    Math.pow( (pos_a.x - pos_b.x), 2 ) +
    Math.pow( (pos_a.y - pos_b.y), 2 )
  );
}
