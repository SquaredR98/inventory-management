import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class AppRequestMonitor implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, headers, url } = request;
    const userAgent = headers['user-agent'];
    const ip = request.headers['x-forwarded-for'];
    
    this.logger.log(`${method} - ${request['originalUrl']} - ${request['ip']} - ${userAgent} - ${JSON.stringify(request.body)}`);

    next();
  }
  
}