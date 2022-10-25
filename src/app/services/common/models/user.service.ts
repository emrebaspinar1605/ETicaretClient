import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { create_user } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }
  
  async create(user: User): Promise<create_user>{
   const observable: Observable<create_user | User> = this.httpClientService.post<create_user | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as create_user;
  }
  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<void>
  {
   const  observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action:"login"
    }, {usernameOrEmail, password});
    await firstValueFrom(observable);
    callBackFunction();
  }
}
