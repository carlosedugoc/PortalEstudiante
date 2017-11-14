import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    urlIlumno: string;
}

export const AppConfig: IAppConfig = {    
    urlIlumno: "https://sispoli-q.qailumno.com/StudentRegistrationSsb/ssb/registration"    
};