var fail_early = {
  on: function(func, message = null){
    if(func()){
      console.log('Failed: '+message); 

      var stack = new Error().stack;

      console.log(stack);
      console.log("\n\n");

    }
  }
}

module.exports = fail_early;
