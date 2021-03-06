require(__dirname+'/test_helper.js');

var now = null;
var Foo = function(){
  new EventEmitter().apply(this);
  now = this.created_at = new Date();
};

exports['load event emitter'] = function(test){
  test.equal(typeof EventEmitter, 'function', 'load error');
  test.done();
};

exports['check applied properties'] = function(test){
  var foo = new Foo();
  var props = ["__events", "on", "once", "emit", "removeListener"];
  for(var i = 0; i < props.length; i++){
    var prop = props[i];
    test.equal(foo.hasOwnProperty(prop), true, 'property "'+prop+'" should copy');
  }
  test.equal(foo.hasOwnProperty("apply"), false, 'property "apply" shoud not copy');
  test.done();
};

exports['simple'] = function(test){
  var created_at = null;
  var foo = new Foo();
  foo.on('bar', function(){
    created_at = foo.created_at;
  });
  foo.emit('bar');

  test.equal(created_at, now);
  test.done();
};

exports['on emit'] = function(test){
  var result = null;
  var foo = new Foo();
  foo.on('chat', function(data){
    result = data;
  });
  foo.emit('chat', {
    user: 'shokai',
    message: 'hello world'
  });

  test.equal(result.user, 'shokai');
  test.equal(result.message, 'hello world');
  test.done();
};

exports['removeListener'] = function(test){
  var foo = new Foo();
  foo.on('bar', function(data){
    console.log('bar ' + data);
  });
  foo.on('bar', function(data){
    console.log('barbar ' + data);
  });

  var id = foo.on('baz', function(data){
    console.log(data);
  });

  test.equal(foo.__events.length, 3, 'check registerd listeners count');
  foo.removeListener(id);
  test.equal(foo.__events.length, 2, 'remove listener by id');
  foo.removeListener('bar');
  test.equal(foo.__events.length, 0, 'remove all "bar" listener');

  test.done();
};

exports['once'] = function(test){
  var total = 0;
  var foo = new Foo();
  foo.once('add', function(data){
    total += data;
  });

  foo.emit('add', 10);
  test.equal(total, 10, 'first call');
  foo.emit('add', 20);
  test.equal(total, 10, 'call listener only first time');

  test.done();
};

exports['multiple once'] = function(test){
  var total = 0;
  var foo = new Foo();

  for(var i = 0; i < 4; i++){
    foo.once('add', function(num){
      total += num;
    });
  }

  foo.on('add', function(num){
    total += num;
  });

  foo.emit('add', 1);
  test.equal(total, 5, 'first call');
  foo.emit('add', 1);
  test.equal(total, 6, 'call listener only first time');

  test.done();
};
