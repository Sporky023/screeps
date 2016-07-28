var fail_early = {
  on: function(func, message = null){
    if(func()){
      console.log('fail_early.on / func() returned false - failing');

      var stack = new Error().stack;

      console.log(stack);
      // console.log('stack: '+"\n"+stack.join("\n")+"\n\n");
      console.log("\n\n");

      console.log('Failed: '+message); 
    }
  }
}

module.exports = fail_early;
