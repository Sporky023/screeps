var each = require('each');

var select = function(list, iterator){
  var output = [];

  each( list, function(item){
    if(iterator(item)){ output.push(item); }
  });

  return output;
}

module.exports = select;
