var ConstructionFulfillment = (function(){
  var pub = {};

  pub.fulfill = function fulfill(room, quota){
    var fulfiller = {
      extension: create_extension
    }[quota.type];

    return fulfiller(room);
  }

  function create_extension(room){

  }

  return pub;
})();

module.exports = ConstructionFulfillment;
