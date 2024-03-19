import { createLogger, format, transports } from 'winston';

const customFormat = () => {
  return format((info) => {
    info.time = new Date().toISOString();
    return info;
  })();
};

const logger = createLogger({
  format: format.combine(customFormat(), format.json()),
  transports: [
    new transports.File({ filename: '/var/log/csye6225/webapp.log' }),
    new transports.Console(),
  ],
});

export default logger;
