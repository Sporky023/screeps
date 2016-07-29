var fail_early = {
 on: function(func, message = null){
    if(func()){
      if(typeof(message) == 'string'){
        console.log('Failed: '+message); 
      } else if(typeof(message) == 'function'){
        message();
      }

      var stack = new Error().stack;

      console.log(stack);
      console.log("\n\n");

    }
  }
}

module.exports = fail_early;
