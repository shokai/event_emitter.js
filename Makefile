src = src/event_emitter.js
dest = event_emitter.js
dest_min = event_emitter.min.js
header = HEADER.txt

all:
	nodeunit "test"

build:
	cat $(header) $(src) > $(dest)
	cat $(header) > $(dest_min)
	uglifyjs $(src) >> $(dest_min)
