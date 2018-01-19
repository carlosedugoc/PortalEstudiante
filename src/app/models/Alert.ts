import { AlertType } from "../shared/enumerators.enum";

export class Alert {
    type: AlertType;
    message: any;
    id: number;
    time: number;
}