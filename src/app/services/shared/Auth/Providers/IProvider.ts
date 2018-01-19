import { AuthInfo } from "../../../../models/Auth/AuthInfo";

export interface IProvider {

    /**
     * Método que realiza la autenticación y si está logueado, devuelve la información del usuario autenticado.
     * 
     * @returns {AuthInfo} 
     * @memberof IProvider
     */
    login(): AuthInfo

    /**
     * 
     * Método que desloguea al usuario autenticado.
     * @memberof IProvider
     */
    logout(): void

    /**
     * 
     * Método que obtiene la información del usuario autenticado.
     * @returns {AuthInfo} 
     * @memberof IProvider
     */
    getDataFromAuthenticatedUser(): AuthInfo
}
