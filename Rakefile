task :build do
  src = File.expand_path 'src/event_emitter.js', File.dirname(__FILE__)
  dest = File.expand_path 'event_emitter.js', File.dirname(__FILE__)
  header = File.expand_path 'HEADER.txt', File.dirname(__FILE__)
  js = `uglifyjs #{src}`
  open(dest, 'w+') do |out|
    open(header) do |h|
      out.puts h.read
    end
    out.puts js
  end
  puts " => #{dest}"
end

task :test do
  system "nodeunit test"
end

task :default => :test
