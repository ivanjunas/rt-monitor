
console.log('RT-Monitor is running..');

//------- Faye client ---------------------------------------------
var endpoint = 'http://localhost:8000/bayeux';

console.log('Connecting to ' + endpoint);


var client = new Faye.Client(endpoint);

var subscription = client.subscribe('/traffic', function(message) {
  //var user = message.user;
  barChartInstance.push(message.data);
});

subscription.callback(function() {
  console.log('[SUBSCRIBE SUCCEEDED]');
});
subscription.errback(function(error) {
  console.log('[SUBSCRIBE FAILED]', error);
});

client.bind('transport:down', function() {
  console.log('[CONNECTION DOWN]');
});
client.bind('transport:up', function() {
  console.log('[CONNECTION UP]');
});


//----------- epoch helpers (later can be cleaned) ----------------------------------

////////////// real time graph generation////////////////////////////////////////	  
var barChartData = [{
  label: "Series 1",
  values: [{time: new Date().getTime(),y: 0}]
},];

var barChartInstance = $('#barChart').epoch({
  type: 'time.bar',
  axes: ['right', 'bottom', 'left'],
  data: barChartData
});