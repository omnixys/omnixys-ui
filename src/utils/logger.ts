import fs from 'fs-extra';
import { resolve } from 'path';
import pino from 'pino';
import { ENV } from './env';

let loggerInstance: pino.Logger | undefined;

function initializeLogger(): pino.Logger {
  if (loggerInstance) return loggerInstance;

  const {
    NEXT_PUBLIC_LOG_LEVEL = 'info',
    NEXT_PUBLIC_LOG_DIR = 'logs',
    NEXT_PUBLIC_PINO_PRETTY = 'true',
  } = ENV;

  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    // Kein Dateisystem, kein pretty-print auf Vercel
    loggerInstance = pino({ level: NEXT_PUBLIC_LOG_LEVEL });
    return loggerInstance;
  }

  // Lokales Logging (Pretty oder Datei)
  const logDir = resolve(process.cwd(), NEXT_PUBLIC_LOG_DIR);
  const logFile = resolve(logDir, 'server.log');

  fs.ensureDirSync(logDir);
  if (fs.existsSync(logFile)) {
    const backupDir = resolve(logDir, new Date().toISOString().split('T')[0]);
    fs.ensureDirSync(backupDir);
    const backupFile = resolve(backupDir, `log-${Date.now()}.log`);
    fs.renameSync(logFile, backupFile);
  }

  const destination =
    NEXT_PUBLIC_PINO_PRETTY === 'true'
      ? pino.transport({
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:standard',
          singleLine: true,
          colorize: true,
          ignore: 'pid,hostname',
          messageFormat: '{msg}',
        },
      })
      : pino.destination(logFile);

  loggerInstance = pino(
    {
      level: NEXT_PUBLIC_LOG_LEVEL,
    },
    destination,
  );

  return loggerInstance;
}

export const getLogger = (context: string): pino.Logger => {
  if (!loggerInstance) initializeLogger();
  return loggerInstance!.child({ context });
};

initializeLogger();
