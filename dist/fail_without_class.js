var fail_without_class = function fail_without_class(target, desiredClass){
  if(target == undefined){
    fail('Wrong class:  expected '+desiredClass.name+', got unexpected');
  }

  if( !(target instanceof desiredClass) ){
    fail('Wrong class: expected '+desiredClass.name+', got other');
  }
}

function fail(message){
  throw message;
  console.log('Fail! '+message);
}

module.exports = fail_without_class;
