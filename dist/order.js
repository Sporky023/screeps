var order = function(creep){
  return {
    to: function to(action, target){

      if( creep[action](target) == ERR_NOT_IN_RANGE ){
        creep.moveTo(target);
      }
    }
  }
}

module.exports = order;
