import { Http } from '@angular/http';

export class GeneralUtils {
    constructor(private http: Http) {
    }

    //// Método que obtiene alguna configuración.
    //// Determine que data desea, separado por pipe para cada hijo EJ. Implemente esto en su componente.
    //// getConfiguration('servicios|UrlUpdateReglamento').subscribe((result) => console.log(result));
    async getConfiguration(key: string): Promise<any> {
        const response = await this.http.get("../../assets/config.json").toPromise();
        let result = response.json();
        key.split('|').forEach(function (nodo) {
            result = result[nodo]
        })
        return result
      }
}
