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

$(function(){
  $("#btn_start").click(function(){
    var timer = new Timer();

    timer.on('tick', function(count){
      $("#log").append(
        $("<li>").text(count)
      );
    });

    timer.on('*', function(event, data){
      console.log(event+" - "+data);
    });

    timer.start(1000);
  });
});
