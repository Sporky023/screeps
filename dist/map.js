var each = require('each');

module.exports = function(list, iterator){
  var output = [];

  each(list, function(item){
    if(typeof(iterator) == 'string'){
      output.push( item[iterator] );

    } else if(typeof(iterator) == 'function'){
      output.push( iterator(item) );

    } else {
      throw new Error(
        'map:  iterator must be a string or function, got: '+iterator
      );
    }
  });
  
  return output;
}
