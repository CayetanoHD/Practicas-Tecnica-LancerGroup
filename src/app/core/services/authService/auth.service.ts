import { Injectable } from "@angular/core";
import { ApiService } from '../apiService/api-service.service';
import { UserLogin } from '../../models/userLogin.model';


const routes = {
  signIn: () => '/Auth/Get_ToketLogin',
}

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    constructor(private apiService: ApiService) {
        
    }

    signIn(model: UserLogin){
      return this.apiService.post(routes.signIn(), model);
    }
    

}