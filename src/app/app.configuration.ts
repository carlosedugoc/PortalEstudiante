import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { reject } from 'q';
import { List } from "linqts";

@Injectable()
export class AppConfiguration {

    private config: Object = null;
    public ht: Http
    constructor(private http: Http) {

    }

    /**
     * Método que obtiene la información de una llave y sus propiedades correspondientes
     * 
     * @param {*} key Identificador de la llave padre
     * @returns 
     * @memberof AppConfiguration
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Método que obtiene el valor de una propiedad específica.
     * 
     * @param {string} key Identificador de la llave padre.
     * @param {string} item Identificador de la propiedad perteneciente a la llave padre
     * @returns 
     * @memberof AppConfiguration
     */
    public getParamConfig(key: string, item: string) {
        return this.config[key][item]
    }

    /**
     * Método que realiza el cargue del archivo de configuración
     * 
     * @returns 
     * @memberof AppConfiguration
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/config.json').map(res => {
                let request: any = null;
                return request = res.json()
            }).catch((error: any) => {
                console.error('Error leyendo el archivo de configuración');
                resolve(error);
                return Observable.throw(error.json().error || 'Error de servidor');
            }).subscribe((responseData) => {
                this.config = responseData
                resolve(true)
            })
        })
    }
}