var fail_early = require('fail_early');

var expect_class =
  function expect_class( object, expected_class, message = 'none'){
    fail_early.on(
      function(){ return !(object instanceof expected_class) ; },
      'expect_class failed: '+expected_class+"\n"+message
    );
  }

module.exports = expect_class;
