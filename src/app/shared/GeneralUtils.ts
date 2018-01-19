import { List } from "linqts";
import { Http  } from "@angular/http";
import { AppConfiguration } from "../app.configuration";

export class GeneralUtils {
    
    constructor() {
    }

    private config: any

    //// Método de carga de información por defecto.
    //async load() {
    //this.config = await this.getAllConfiguration();
    //}

    // //// Método que obtiene toda la información del archivo de configuración.
    // private async getAllConfiguration(): Promise<any> {
    //     const response = await this.http.get("../../assets/config.json").toPromise();
    //     return response.json();
    // }

    //// Método que obtiene los parametros enviados por get en la petición
    public getParameterHrefByName(name) {
        let url = location.href
        url = url.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

