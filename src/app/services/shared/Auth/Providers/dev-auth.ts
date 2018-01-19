import { IProvider } from "./IProvider";
import { AuthInfo } from "../../../../app.models";
export class DevAuth implements IProvider {

    login(): AuthInfo {
        return this.getDataFromAuthenticatedUser()
    }

    logout(): void {

    }

    getDataFromAuthenticatedUser(): AuthInfo {
        let autinfo: AuthInfo = new AuthInfo()
        autinfo.claims = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdF9oYXNoIjoiX3JJMFZFdDVWYkJzZWpKb2dseUhtQSIsInN1YiI6IkJyYWhpYW0uR2FvbmFAaWx1bW5vLmNvbSIsImF1ZCI6WyJhZWVtaVcxUlp1NG5JWWwyZnJKRVBueE45d1FhIl0sImF6cCI6ImFlZW1pVzFSWnU0bklZbDJmckpFUG54Tjl3UWEiLCJhdXRoX3RpbWUiOjE1MTQ0MTQxMjcsImlzcyI6Imh0dHBzOi8va2NxLWlhbWFwcDAxLmlsdW1uby5uZXQ6OTQ0My9vYXV0aDIvdG9rZW4iLCJleHAiOjE1MTQ0MTkzMzgsIm5vbmNlIjoiVDNRazU0eUdNNVZ6MmtrMzQzOHd2WERuYnI2SGtPOFJmQmxKbDJRcSIsImlhdCI6MTUxNDQxNDEyOCwianRpIjoiZDZjMjVmY2ItMzUxZS00NzYxLTgzZWQtM2MzN2JiZWYyZmYwIn0.ylKz2YzpNPGBiVTKK9XgA_uak8-cjzYhBm9FGuM071g"
        autinfo.accesToken = ""
        return autinfo
    }
}
