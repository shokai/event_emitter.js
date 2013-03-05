require(__dirname+'/test_helper.js');

var now = null;
var Foo = function(){
  new EventEmitter().apply(this);
  now = this.created_at = new Date();
};

exports['catch all emits'] = function(test){
  var created_at = null;
  var created_at_ = null
  var called_event = null;
  var foo = new Foo();
  foo.on('*', function(event){
    called_event = event;
    created_at = foo.created_at;
  });
  foo.on('bar', function(){
    created_at_ = foo.created_at;
  });
  foo.emit('bar');

  test.equal(created_at, now);
  test.equal(created_at_, now);
  test.equal(called_event, 'bar');
  test.done();
};

exports['catch all emits with args'] = function(test){
  var data_ = null;
  var called_event = null;
  var foo = new Foo();
  foo.on('*', function(event, data){
    called_event = event;
    data_ = data;
  });
  foo.emit('bar', {baz: 'kazusuke'});

  test.equal(called_event, 'bar');
  test.equal(data_.baz, 'kazusuke');
  test.done();
};

exports['once'] = function(test){
  var total = 0;
  var foo = new Foo();
  foo.once('*', function(event, data){
    if(event === 'add') total += data.num;
  });

  foo.emit('add', {num: 10});
  test.equal(total, 10);
  foo.emit('add', {num: 5});
  test.equal(total, 10, 'call listener only first time');
  test.done();
};
