import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const dbHost = this.configService.get<string>('database.host');
    const dbPort = this.configService.get<string>('database.port');
    const dbName = this.configService.get<string>('database.name');
  }
}