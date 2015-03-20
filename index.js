'use strict';

var AWS = require('aws-sdk'),
    Promise = require('promise'),
    util = require('util');

var singleton = module.exports = function(config) {
  if (singleton.cloudwatch) {
    return;
  }
  singleton.namespace = config.namespace;
  singleton.cloudwatch = new AWS.CloudWatch({region: config.region});
  singleton.metrics = config.metrics;
  singleton.put = put;
}

function put(metricName) {
  if (metricName == null) {
    throw new Error('No metricname found');
  }
  if (singleton.metrics[metricName] == null) {
    throw new Error("Invalid metricName received : '" + metricName + "'");
  }
  var value = arguments[1] || 0;
  var dimensions = arguments[2] || [];

  var promise = new Promise(function(resolve, reject) {
    wrapper(metricName, value, dimensions, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  return promise;
}

function wrapper(metric, value, dimensions, callback) {
  var data = {
    MetricName: metric,
    Timestamp: new Date,
    Unit: singleton.metrics[metric].unit
  };
  if (typeof(value) === 'number') {
    data.Value = value;
  } else if (typeof(value) === 'object') {
    data.StatisticValues = value;
  } else {
    throw new Error('Invalid value format ' + value);
  }

  singleton.cloudwatch.putMetricData({
    MetricData: [data],
    Namespace: singleton.namespace
  }, callback);
}
