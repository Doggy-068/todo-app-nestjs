import { Injectable } from '@nestjs/common';

@Injectable()
export class MqService {
  getHello(): string {
    return 'Hello World!';
  }
}
