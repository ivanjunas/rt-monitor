var util    = require('util'),
    spawn   = require('child_process').spawn,
    carrier = require('carrier'),
    pl_proc = spawn('perl', ['genTrafficData.pl']),
    my_carrier;

my_carrier = carrier.carry(pl_proc.stdout);

my_carrier.on('line', function(line) {

  // Transform to JSON.. 

  console.log('line: ' + line);
})