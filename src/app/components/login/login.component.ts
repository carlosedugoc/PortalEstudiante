import { Component } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  userName: string;
  password: string;
  loginFailed: boolean = false;

  constructor(private oauthService: OAuthService, 
              private router:Router) { 
                let token = sessionStorage.getItem('access_token')
                console.log('token',token)
                if (token){
                    this.router.navigate(['student'])
                }
                else
                {
                    this.login()
                }
  }

  login() {
      this.oauthService.clientId = "qAnYSzfC4Uf0B4_UqK4JjfDCpQQa";
      this.oauthService.initImplicitFlow();
  }

  logout() {
      this.oauthService.logOut();
  }

  get givenName() {
      var claims = this.oauthService.getIdentityClaims();
      if (!claims) return null;
      return claims['given_name'];
  }

  loginWithPassword() {

      this.oauthService.clientId = "qAnYSzfC4Uf0B4_UqK4JjfDCpQQa";

      this
          .oauthService
          .fetchTokenUsingPasswordFlowAndLoadUserProfile(this.userName, this.password)
          .then(() => {
              console.debug('successfully logged in');
              this.loginFailed = false;
          })
          .catch((err) => {
              console.error('error logging in', err);
              this.loginFailed = true;
          })
          .then(() => {
              this.oauthService.clientId = "angular-app-1";
          })
  }


}
