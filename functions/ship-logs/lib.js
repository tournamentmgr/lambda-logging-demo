const Promise = require('bluebird')
const parse = require('./parse')
const axios = require('axios')
const host = process.env.logstash_host

const processAll = async (logGroup, logStream, logEvents) => {
  const lambdaVersion = parse.lambdaVersion(logStream);
  const functionName = parse.functionName(logGroup);

  const promises = []

  for (const logEvent of logEvents) {
    try {
      const log = parse.logMessage(logEvent)
      if (log) {
        log.logStream = logStream
        log.logGroup = logGroup
        log.functionName = functionName
        log.lambdaVersion = lambdaVersion
        log.fields = log.fields || {}
        log.type = "cloudwatch"

        promises.push(
          axios.post(
            `https://${host}${logGroup}`, log
          )
        )
      }
    } catch (err) {
      console.error(err.message)
    }
  }
  
  try {
    await Promise.all(promises)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = processAll