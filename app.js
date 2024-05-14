const express = require('express');
const winston = require('winston');
const moment = require('moment');
const app = express();
app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'log1.log' }),
    new winston.transports.File({ filename: 'log2.log' }),
    new winston.transports.File({ filename: 'log3.log' }),
    new winston.transports.File({ filename: 'log4.log' }),
    new winston.transports.File({ filename: 'log5.log' }),
    new winston.transports.File({ filename: 'log6.log' }),
    new winston.transports.File({ filename: 'log7.log' }),
    new winston.transports.File({ filename: 'log8.log' }),
    new winston.transports.File({ filename: 'log9.log' })
  ]
});


const createLogEntry = (level, message, source) => {
  return {
    level,
    log_string: message,
    timestamp: moment().toISOString(),
    metadata: { source }
  };
};

app.use((req, res, next) => {
  const logEntry = createLogEntry('info', `Incoming request on ${req.path}`, req.path.replace(/\//g, '') + '.log');
  logger.log(logEntry);
  next();
});


require('./routes')(app, logger, createLogEntry);

app.use((err, req, res, next) => {
  const errorLog = createLogEntry('error', err.message, 'error.log');
  logger.error(errorLog);
  res.status(500).send('An error occurred');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
