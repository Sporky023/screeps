var each = require('each');

module.exports = function(list, iterator){
  var output = [];

  each(list, function(item){
    output.push( iterator(item) );
  });
  
  return output;
}
