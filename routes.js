const fs = require('fs');
const moment = require('moment');
const winston = require('winston');


const apiLoggers = {
  userRegister: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log1.log' })]
  }),
  userLogin: winston.createLogger({
    level: 'success',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log2.log' })]
  }),
  dataSubmit: winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log3.log' })]
  }),
  paymentProcess: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log4.log' })]
  }),
  reportGenerate: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log5.log' })]
  }),
  notificationSend: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log6.log' })]
  }),
  systemUpdate: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log7.log' })]
  }),
  healthCheck: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log8.log' })]
  }),
  logsQuery: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'log9.log' })]
  })
};

module.exports = (app) => {

  const createLogEntry = (level, message, source) => {
    return {
      level,
      log_string: message,
      timestamp: moment().toISOString(),
      metadata: { source }
    };
  };


  app.post('/api/user/register', (req, res) => {
    const { username, email, password } = req.body;
    const logEntry = createLogEntry('info', `User registered: ${username}`, 'userRegister.log');
    apiLoggers.userRegister.info(logEntry);
    res.status(201).send('User registered successfully');
  });

  app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;
    const logEntry = createLogEntry('success', `User login attempt: ${username}`, 'userLogin.log');
    apiLoggers.userLogin.info(logEntry);
    res.status(200).send('User logged in successfully');
  });

app.post('/api/data/submit', (req, res) => {
  const { data } = req.body;
  const logEntry = createLogEntry('error', `Data submitted: ${JSON.stringify(data)}`, 'dataSubmit.log');
  apiLoggers.dataSubmit.info(logEntry);
  res.status(200).send('Data submission successful');
});

app.post('/api/payment/process', (req, res) => {
  const { paymentDetails } = req.body;
  const logEntry = createLogEntry('info', `Payment processed: ${JSON.stringify(paymentDetails)}`, 'paymentProcess.log');
  apiLoggers.paymentProcess.info(logEntry);
  res.status(200).send('Payment processing successful');
});

app.get('/api/report/generate', (req, res) => {
  const logEntry = createLogEntry('info', 'Report generated', 'reportGenerate.log');
  apiLoggers.reportGenerate.info(logEntry);
  res.status(200).send('Report generation successful');
});

app.post('/api/notification/send', (req, res) => {
  const { message } = req.body;
  const logEntry = createLogEntry('info', `Notification sent: ${message}`, 'notificationSend.log');
  apiLoggers.notificationSend.info(logEntry);
  res.status(200).send('Notification sent successfully');
});


app.post('/api/system/update', (req, res) => {
  const logEntry = createLogEntry('info', 'System updated', 'systemUpdate.log');
  apiLoggers.systemUpdate.info(logEntry);
  res.status(200).send('System update successful');
});

//
app.get('/api/health/check', (req, res) => {
  // ...
  const logEntry = createLogEntry('info', 'Health check performed', 'healthCheck.log');
  apiLoggers.healthCheck.info(logEntry);
  res.status(200).send('Health check successful');
});


app.get('/api/logs/query', (req, res) => {
  const { level, log_string, timestamp, source } = req.query;
  const logEntry = createLogEntry('info', `Logs queried with level: ${level}, string: ${log_string}, timestamp: ${timestamp}, source: ${source}`, 'logsQuery.log');
  apiLoggers.logsQuery.info(logEntry);
  res.status(200).send('Logs query successful');
});


};
