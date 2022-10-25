import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { create_user } from 'src/app/contracts/users/create_user';
import { Token } from 'src/app/contracts/users/token/token';
import { TokenResponse } from 'src/app/contracts/users/token/TokenResponse';
import { User } from 'src/app/entities/user';
import { MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }
  
  async create(user: User): Promise<create_user>{
   const observable: Observable<create_user | User> = this.httpClientService.post<create_user | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as create_user;
  }
  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any>
  {
   const  observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "users",
      action:"login"
    }, {usernameOrEmail, password});

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse)
    {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.","Giriş Başarılı",
      {
        messageType: ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
    }
  
    callBackFunction();
  }
}
