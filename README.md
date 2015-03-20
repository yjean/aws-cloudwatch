# AWS CloudWatch

> Simple wrapper around AWS CloudWatch API

## Configuration

Simple JSON file, with the following format :

```json
{
  "region": "eu-west-1",
  "namespace": "AwsCloudWatchTests",
  "metrics": {
    "metricNumber1": {
      "unit": "Seconds"
    },
    "metricNumber2": {
      "unit": "Count"
    },
    "metricNumber3": {
      "unit": "None"
    },
    "metricNumber4": {
      "unit": "Megabits"
    }
  }
}
```

Available units are : 'Seconds | Microseconds | Milliseconds | Bytes | Kilobytes | Megabytes | Gigabytes | Terabytes | Bits | Kilobits | Megabits | Gigabits | Terabits | Percent | Count | Bytes/Second | Kilobytes/Second | Megabytes/Second | Gigabytes/Second | Terabytes/Second | Bits/Second | Kilobits/Second | Megabits/Second | Gigabits/Second | Terabits/Second | Count/Second | None'

## Sample usage
```javascript
'use strict';

// initialize (for example in app.js)
var config = require('./config.sample.json');
require('aws-cloudwatch')(config);

// require it everywhere you need to put some metrics
var cloudWatch = require('aws-cloudwatch');

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
cloudWatch.put('metricNumber1', 42).then(success, failure); // send 42 to metric 'metricNumber1'
cloudWatch.put('metricNumber2', 42, [{"Dimension1": "DimValue1"}]).then(success, failure); // send 42 to metric 'metricNumber2', for dimension 'Dimension1' with 'DimValue1'
cloudWatch.put('metricNumber2', 42, [{"Dimension1": "DimValue2"}]).then(success, failure); // send 42 to metric 'metricNumber2', for dimension 'Dimension1' with 'DimValue21'
cloudWatch.put('metricNumber3', {Maximum: 42, Minimum: 0, SampleCount: 2, Sum: 42}).then(success, failure); // send aggregated values to 'MetricNumber3'
cloudWatch.put('metricNumber4', {Maximum: 42, Minimum: 0, SampleCount: 2, Sum: 42}, [{"Dimension1": "DimValue1"}]).then(success, failure); // aggregate values to metricNumber4 for a specific dimension
cloudWatch.put('metricNumber4', {Maximum: 42, Minimum: -21, SampleCount: 2, Sum: 21}, [{"Dimension1": "DimValue2"}]).then(success, failure); // aggregate values to metricNumber4 for a specific dimension

function success(data) {
  console.log(data);
}

function failure(err) {
  console.error(err, err.stack);
}
```
