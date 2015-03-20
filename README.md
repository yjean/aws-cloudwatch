# AWS CloudWatch

> Simple wrapper around AWS CloudWatch API

## Configuration

Simple JSON file, with the following format :

```json
{
  "region": "eu-west-1",
  "namespace": "AwsCloudWatchTests",
  "metrics": [
    "metricNumber1": {
      "unit": "Seconds"
    },
    "metricNumber2": {
      "unit": "Count"
    },
    "metricNumber3": {
      "unit": "None"
    }
  ]
}
```

Available units are : 'Seconds | Microseconds | Milliseconds | Bytes | Kilobytes | Megabytes | Gigabytes | Terabytes | Bits | Kilobits | Megabits | Gigabits | Terabits | Percent | Count | Bytes/Second | Kilobytes/Second | Megabytes/Second | Gigabytes/Second | Terabytes/Second | Bits/Second | Kilobits/Second | Megabits/Second | Gigabits/Second | Terabits/Second | Count/Second | None'

## Sample usage
```javascript
var config = require('./config.sample.json');
var cloudWatch = require('./index')(config);

cloudWatch.put('invalidMetric', 'value'); // will raise an error
cloudWatch.put('metricNumber1'); // will send a 0 value
cloudWatch.put('metricNumber1', 'value'); // send 'value' to metric 'metricNumber1'
cloudWatch.put('metricNumber2', 'value', [{"Dimension1": "DimValue1"}]); // send 'value' to metric 'metricNumber2', for dimension 'Dimension1' with 'DimValue1'
cloudWatch.put('metricNumber3', {Maximum: 0, Minimum: 0, SampleCount: 0, Sum: 0}); // send aggregated values to 'MetricNumber3'
cloudWatch.put('metricNumber4', {Maximum: 0, Minimum: 0, SampleCount: 0, Sum: 0}, [{"Dimension1": "DimValue1"}]); // aggregate values to metricNumber4 for a specific dimension
```
