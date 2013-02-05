require(__dirname+'/test_helper.js');

var now = null;
var Foo = function(){
  new EventEmitter().apply(this, '__event_');
  now = this.created_at = new Date();
};

exports['simple'] = function(test){
  var created_at = null;
  var foo = new Foo();
  foo.__event_on('bar', function(){
    created_at = foo.created_at;
  });
  foo.__event_emit('bar');

  test.equal(created_at, now);
  test.done();
};

exports['on emit'] = function(test){
  var result = null;
  var foo = new Foo();
  foo.__event_on('chat', function(data){
    result = data;
  });
  foo.__event_emit('chat', {
    user: 'shokai',
    message: 'hello world'
  });

  test.equal(result.user, 'shokai');
  test.equal(result.message, 'hello world');
  test.done();
};

exports['removeListener'] = function(test){
  var foo = new Foo();
  foo.__event_on('bar', function(data){
    console.log('bar ' + data);
  });
  foo.__event_on('bar', function(data){
    console.log('barbar ' + data);
  });

  var id = foo.__event_on('baz', function(data){
    console.log(data);
  });

  test.equal(foo.__event___events.length, 3, 'check registerd listeners count');
  foo.__event_removeListener(id);
  test.equal(foo.__event___events.length, 2, 'remove listener by id');
  foo.__event_removeListener('bar');
  test.equal(foo.__event___events.length, 0, 'remove all "bar" listener');

  test.done();
};

exports['once'] = function(test){
  var total = 0;
  var foo = new Foo();
  foo.__event_once('add', function(data){
    total += data;
  });

  foo.__event_emit('add', 10);
  test.equal(total, 10, 'first call');
  foo.__event_emit('add', 20);
  test.equal(total, 10, 'call listener only first time');

  test.done();
};
