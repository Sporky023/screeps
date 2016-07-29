module.exports = function(list, representor){
  return list.sort(function(aa, b){
    return representor(aa) > representor(b);
  });
}
