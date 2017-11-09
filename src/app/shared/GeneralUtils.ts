import { Http } from '@angular/http';
import { List } from "linqts";

export class GeneralUtils {
    constructor(private http: Http) {

    }

    private config: any
    public urlApiRestDefault: any

    //// Método de carga de información por defecto.
    async load() {
        this.config = await this.getAllConfiguration();
        this.urlApiRestDefault = this.config.servicios.UrlApiRest;
    }

    //// Método que obtiene toda la información del archivo de configuración.
    private async getAllConfiguration(): Promise<any> {
        const response = await this.http.get("../../assets/config.json").toPromise();
        return response.json();
    }

    //// Método que obtiene la url del servicio especificado.
    public getServiceByName(key: string) {
        return this.config.servicios[key];
    }

    //// Método que obtiene la validación por el nombre.
    public getValidationByName(key: string) {
        return this.config.validaciones[key]
    }

    //// Método que obtiene la información de configuración de una universidad según su código.
    public getInfoUniversitiesByCode(code: string) {
        let lstUniversities: List<any> = new List(this.config.universidades)
        let result = lstUniversities.Where(n => n.Codigo == code).Select(x => x).ToList()
        return result;
    }

    // Método que obtiene alguna configuración.
    // Determine que data desea, separado por pipe para cada hijo EJ. Implemente esto en su componente.
    // getConfiguration('servicios|UrlUpdateReglamento').subscribe((result) => console.log(result));
    async getConfiguration(key: string): Promise<any> {
        const response = await this.http.get("../../assets/config.json").toPromise();
        let result = response.json();
        key.split('|').forEach(function (nodo) {
            result = result[nodo]
        })
        return result
    }
}

