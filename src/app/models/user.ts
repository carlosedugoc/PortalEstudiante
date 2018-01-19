import { RolPE, Universities } from "../shared/enumerators.enum";

export class User {
    public userId: string
    public name: string
    public rol: string
    public university: string
    public modality: string
    public level: string
    public userType: string
    public universidadDelUsuario: Universities
    public rolDelusuario: RolPE
}
