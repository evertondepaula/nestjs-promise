import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import User from './user.model';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get('/async/users')
  async getAsyncUsers(): Promise<User[]> {

    try {
      let promises:Promise<User>[] = [];

      for (let i = 1; i <= 10; i++) {
        promises.push(new Promise((resolve) => {
          let user:Promise<User> = this.appService.getUser(Math.floor(Math.random() * 11) +1);
          resolve(user);
        }));
      }

      return await Promise.all(promises);
    } catch (error) {
      console.error('OTRO GATO: ', error.message);
    }
  }

  @Get('/sync/users')
  async getSyncUsers(): Promise<User[]> {

    let users:User[] = [];
    
    for (let i = 1; i <= 10; i++) {
      const user:User = await this.appService.getUser(Math.floor(Math.random() * 11) +1);
      users.push(user);
    }

    return users;
  }
}