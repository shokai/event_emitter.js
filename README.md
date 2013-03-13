EventEmitter.js
===============
EventEmitter for WebBrowser

Download
--------
- <a href="https://raw.github.com/shokai/event_emitter.js/master/event_emitter.js">event_emitter.js</a>
- <a href="https://raw.github.com/shokai/event_emitter.js/master/event_emitter.min.js">event_emitter.min.js</a> (compressed)


Synopsis
--------
load
```html
<script src="event_emitter.js"></script>
```

apply
```javascript
var User = function(){
  new EventEmitter().apply(this);
  this.name = '';
};
```

regist event listener
```javascript
var user = new User();
user.name = 'shokai';
user.on('go', function(data.place){
  alert(user.name+' -> '+data.place);
});
```

call event
```javascript
user.emit('go', {place: 'mountain'}); // "shokai -> mountain"
```

regist event using "once"
```ruby
user.once('eat', function(data){
  alert(user.name+' -> eat '+data.what+' at '+data.where);
});
```

call
```javascript
user.emit('eat', {what: 'BEEF', where: 'zanmai'}); // "shokai -> eat BEEF at zanmai"
user.emit('eat', {what: 'Ramen', where: 'marutomo'}); // do not call. call only first time.
```

remove listener
```javascript
user.removeListener('eat');
user.removeListener(id);
```

catch all events
```javascript
user.on('*', function(event_name, data){
  console.log(event_name + ' was called');
  console.log(data);
});
```

Test
----

    % npm install -g nodeunit
    % make


Build
-----

edit "HEADER.txt"

    % npm install -g uglify-js
    % make build

=> event_emitter.js and event_emitter.min.js


Contributing
------------
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request