
console.log('RT-Monitor is running..');

//----------- epoch  ----------------------------------

// 1.) BAR chart data  	  
var barChartData = [{
  label: "Series 1",
  values: [{time: new Date().getTime(),y: 0}]
},];

// BAR chart instance 
var barChartInstance = $('#barChart').epoch({
  type: 'time.bar',
  axes: ['right', 'bottom', 'left'],
  data: barChartData
});


// 2.) LINE chart data
var lineChartData = [
  {
    label: "Line IN",
    values: [ {time: new Date().getTime(), y: 0} ]
  },
  {
    label: "Line OUT",
    values: [ {time: new Date().getTime(), y: 0}]
  },
];

// LINE chart instance  
var lineChartInstance = $('#lineChart').epoch({
  type: 'time.line',
  axes: ['right', 'bottom', 'left'],
  data: lineChartData
});
    

//------- Faye client ---------------------------------------------

var endpoint = 'http://localhost:8000/bayeux';
console.log('Connecting to ' + endpoint);


var client = new Faye.Client(endpoint);
// bar subscription 
var subscription = client.subscribe('/bar-traffic', function(message) {
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


// // line subscrition 
// var subscriptionLine = client.subscribe('/bar-traffic', function(message) {
//   //var user = message.user;
//   lineChartInstance.push(message.data);
// });

