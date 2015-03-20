'use strict';

// initialize (for example in app.js)
var config = require('./config.sample.json');
require('../index')(config);

// require it everywhere you need to put some metrics
var cloudWatch = require('../index');

try {
  cloudWatch.put(); // will raise an error
} catch(err) {
  console.log("Error when no metricName : OK");
}

try {
  cloudWatch.put('invalidMetric', 'value'); // will raise an error
} catch(err) {
  console.log("Invalid metric raise an error : OK");
}

cloudWatch.put('metricNumber1').then(success, failure); // will send a 0 value
cloudWatch.put('metricNumber1', 42).then(success, failure); // send 'value' to metric 'metricNumber1'
cloudWatch.put('metricNumber2', 42, [{"Dimension1": "DimValue1"}]).then(success, failure); // send 'value' to metric 'metricNumber2', for dimension 'Dimension1' with 'DimValue1'
cloudWatch.put('metricNumber2', 42, [{"Dimension1": "DimValue2"}]).then(success, failure); // send 'value' to metric 'metricNumber2', for dimension 'Dimension1' with 'DimValue1'
cloudWatch.put('metricNumber3', {Maximum: 42, Minimum: 0, SampleCount: 2, Sum: 42}).then(success, failure); // send aggregated values to 'MetricNumber3'
cloudWatch.put('metricNumber4', {Maximum: 42, Minimum: 0, SampleCount: 2, Sum: 42}, [{"Dimension1": "DimValue1"}]).then(success, failure); // aggregate values to metricNumber4 for a specific dimension
cloudWatch.put('metricNumber4', {Maximum: 42, Minimum: -21, SampleCount: 2, Sum: 21}, [{"Dimension1": "DimValue2"}]).then(success, failure); // aggregate values to metricNumber4 for a specific dimension

function success(data) {
  console.log(data);
}

function failure(err) {
  console.error(err, err.stack);
}
