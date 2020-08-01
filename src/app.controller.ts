import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import User from './user.model';
import { resolve } from 'path';


@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUsers(): Promise<any> {

    try {
      let promises = [];

      for (let i = 1; i <= 10; i++) {
        promises.push(new Promise((resolve, reject) => {
          resolve(this.appService.getUser(Math.floor(Math.random() * 11) +1));
        }));
      }

      return await Promise.all(promises);
    } catch (error) {
      console.error('OTRO GATO: ', error.message);
    }
  }
}