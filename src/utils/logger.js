import { createLogger, format, transports } from 'winston';

// const customFormat = () => {
//   return format((info) => {
//     info.time = new Date().toISOString();
//     return info;
//   })();
// };



const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ 
      filename: '/var/log/csye6225/webapp.log',
      level: 'silly'
    }),
    new transports.Console(),
  ],
});

export default logger;
