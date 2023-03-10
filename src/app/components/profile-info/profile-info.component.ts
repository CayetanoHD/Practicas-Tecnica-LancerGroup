import { Component, Input, OnInit } from '@angular/core';
import { LoginResponse } from '../../core/models/loginResponse.model';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent  implements OnInit {
@Input() userInfo: LoginResponse;

  constructor() { }

  ngOnInit() {}

}
