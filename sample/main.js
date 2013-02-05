var Timer = function(){
  new EventEmitter().apply(this);
  var self = this;
  var count = 0;
  this.start = function(interval){
    var sid = setInterval(function(){
      self.emit('tick', count++);
    },interval);
  };
};

var log = function(str){
  console.log(str);
  $("#log").append(
    $("<li>").text(str)
  );
};

$(function(){
  $("#btn_start").click(function(){
    var timer = new Timer();
    timer.on('tick', function(data){
      log(data);
    });
    timer.start(1000);
  });
});
