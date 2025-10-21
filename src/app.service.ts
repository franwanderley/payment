import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const test = 123;
    return 'Hello World!';
  }
}
