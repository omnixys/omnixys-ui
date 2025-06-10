import fs from 'fs-extra';
import { resolve } from 'path';
import pino from 'pino';
import pretty from 'pino-pretty';
import { ENV } from './env';

let loggerInstance: pino.Logger | undefined = undefined;

function initializeLogger(): pino.Logger {
  if (loggerInstance) return loggerInstance;

  const {
    NEXT_PUBLIC_LOG_LEVEL = 'info',
    NEXT_PUBLIC_LOG_DIR = 'logs',
    NEXT_PUBLIC_PINO_PRETTY = 'true',
  } = ENV;

  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    // 🚫 Kein Dateisystem-Zugriff auf Vercel → nur stdout
    loggerInstance = pino({
      level: NEXT_PUBLIC_LOG_LEVEL,
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:standard',
          singleLine: true,
          colorize: true,
          ignore: 'pid,hostname',
          messageFormat: '{msg}',
        },
      },
    });
    loggerInstance.info('Logger läuft im Vercel-Mode (stdout only)');
    return loggerInstance;
  }

  // ✅ Lokaler Modus mit Dateien
  const logDir = resolve(process.cwd(), NEXT_PUBLIC_LOG_DIR);
  const logFile = resolve(logDir, 'server.log');

  fs.ensureDirSync(logDir);
  if (fs.existsSync(logFile)) {
    const backupDir = resolve(logDir, new Date().toISOString().split('T')[0]);
    fs.ensureDirSync(backupDir);
    const backupFile = resolve(backupDir, `log-${Date.now()}.log`);
    fs.renameSync(logFile, backupFile);
  }

  const stream = NEXT_PUBLIC_PINO_PRETTY === 'true'
    ? pretty({
      translateTime: 'SYS:standard',
      singleLine: true,
      colorize: true,
      ignore: 'pid,hostname',
      messageFormat: '{msg}',
    })
    : fs.createWriteStream(logFile);

  loggerInstance = pino({ level: NEXT_PUBLIC_LOG_LEVEL }, stream);
  loggerInstance.info('Lokaler Logger erfolgreich initialisiert.', { logFile });
  return loggerInstance;
}

export const getLogger = (context: string): pino.Logger => {
  if (!loggerInstance) initializeLogger();
  return loggerInstance!.child({ context });
};

initializeLogger();
