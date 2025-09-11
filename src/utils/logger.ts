import colors from 'colors';
import { Request, Response, NextFunction } from 'express';

// Configure colors theme
colors.setTheme({
  info: 'cyan',
  success: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'blue',
  verbose: 'magenta',
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  // Skip logging for favicon requests to reduce noise
  const shouldSkipLogging = url === '/favicon.ico';

  // Color code by HTTP method
  let coloredMethod = method;
  switch (method) {
    case 'GET':
      coloredMethod = colors.green(method);
      break;
    case 'POST':
      coloredMethod = colors.blue(method);
      break;
    case 'PUT':
      coloredMethod = colors.yellow(method);
      break;
    case 'DELETE':
      coloredMethod = colors.red(method);
      break;
    case 'PATCH':
      coloredMethod = colors.magenta(method);
      break;
    default:
      coloredMethod = colors.white(method);
  }

  // Color code by endpoint type
  let coloredUrl = url;
  if (url.includes('/auth')) {
    coloredUrl = colors.cyan(url);
  } else if (url.includes('/health')) {
    coloredUrl = colors.green(url);
  } else if (url === '/favicon.ico') {
    coloredUrl = colors.gray(url);
  } else {
    coloredUrl = colors.white(url);
  }

  // Log the request (skip favicon)
  if (!shouldSkipLogging) {
    console.log(
      `${colors.gray(timestamp)} ${coloredMethod} ${coloredUrl} ${colors.gray('from')} ${colors.yellow(ip || 'unknown')}`,
    );
  }

  // Capture response time
  const startTime = Date.now();

  // Override res.end to log response
  const originalEnd = res.end.bind(res);
  res.end = function (
    chunk?: any,
    encoding?: BufferEncoding | (() => void),
    cb?: () => void,
  ) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    let coloredStatus = statusCode.toString();
    if (statusCode >= 200 && statusCode < 300) {
      coloredStatus = colors.green(statusCode.toString());
    } else if (statusCode >= 300 && statusCode < 400) {
      coloredStatus = colors.yellow(statusCode.toString());
    } else if (statusCode >= 400 && statusCode < 500) {
      coloredStatus = colors.red(statusCode.toString());
    } else if (statusCode >= 500) {
      coloredStatus = colors.red.bold(statusCode.toString());
    }

    // Only log response for non-favicon requests
    if (!shouldSkipLogging) {
      console.log(
        `${colors.gray('→')} ${coloredMethod} ${coloredUrl} ${coloredStatus} ${colors.gray(`${duration}ms`)}`,
      );
    }

    return originalEnd(chunk, encoding as BufferEncoding, cb);
  };

  next();
};

export const logger = {
  info: (message: string) => console.log(colors.cyan(`[INFO] ${message}`)),
  success: (message: string) =>
    console.log(colors.green(`[SUCCESS] ${message}`)),
  warn: (message: string) => console.log(colors.yellow(`[WARN] ${message}`)),
  error: (message: string) => console.log(colors.red(`[ERROR] ${message}`)),
  debug: (message: string) => console.log(colors.blue(`[DEBUG] ${message}`)),
};
