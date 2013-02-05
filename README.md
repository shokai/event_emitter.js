EventEmitter.js
===============
EventEmitter for WebBrowser

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
  this.name = "";
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


Test
----

    % npm install -g nodeunit
    % rake test


Build
-----

edit "HEADER.txt"

    % npm install -g uglify-js
    % rake build

=> event_emitter.js
