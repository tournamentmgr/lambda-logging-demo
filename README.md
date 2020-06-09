# lambda-logging-demo

A Lambda function for:

* shipping logs to fluentd (hosted EFK stack)

## Deployment

1. insert the `logstash_host`, in the `serverless.yml` file (under the `ship-logs-to-fluentd` function's environment variables).

`logstash_host`: if you are in the EU region insert `listener-eu.logz.io`, otherwise, use `listener.logz.io`. You can tell which region you are in by checking your login URL - app.logz.io means you are in the US. app-eu.logz.io means you are in the EU.

for example:

```
ship-logs-to-fluentd:
  handler: functions/ship-logs/handler.handler
  description: Sends CloudWatch logs to fluentd
  environment:
    logstash_host: logs.host.io
```

2. run `./build.sh deploy dev` to deploy to a stage called "dev"

3. once deployed, take a note of the ARN for the function. Now you can deploy the `auto-subscribe-log-group-to-arn` app from the Serverless Applciation Repository ([here](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:374852340823:applications~auto-subscribe-log-group-to-arn)) and pass in the ARN for the `ship-logs-to-fluentd` function.