var each = function each(list, func){
  if(typeof(list) == 'object'){
    for(var propName in list){
      var prop = list[propName];

      func(prop);
    }

  } else if (typeof(list) == 'array'){
    console.log('each / array not implemented');
  }
}

module.exports = each;
