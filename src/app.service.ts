import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import User  from './user.model';
import { resolve } from 'path';

@Injectable()
export class AppService {
  
  protected API_USERS:string = 'https://reqres.in/api/users/';

  constructor(private httpService: HttpService) {}
  
  async getUser(id:Number): Promise<User> {
    try {
      const response = await this.getUserFromApi(id);
      console.log('REQUEST ID: ', id);
      console.log('RESPONSE: ', response.data.data.id);
      return new User(response.data.data.id, response.data.data.email);
    } catch (error) {
      console.log('REQUEST ID: ', id);
      console.error('OH MY GOD: ', error.message);
      throw error;
    }
  }

  private async getUserFromApi(id:Number): Promise<AxiosResponse<any>> {
      return await this.httpService.get(this.API_USERS+id).toPromise();
  }
}
