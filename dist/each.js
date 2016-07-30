var each = function each(list, func){
  if(typeof(list) == 'object'){
    for(var propName in list){
      var prop = list[propName];

      func(prop);
    }

  }
}

module.exports = each;
