import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ReefPageService {

    private indexDataUrl = "http://localhost:8080/reefs?size=500&sort=reefName";
    private reefPageUrl = "http://localhost:8080/reefpage?reefid=18032S";
    private specificReefPageUrl = "http://localhost:8080/reefpage?reefid=";
    // private reefPageUrl = "http://localhost:8080/reefpage?reefid=13093A";

    constructor (private http : Http) {}

    getIndexEntries(): Promise<any[]> {
        return this.http.get(this.indexDataUrl)
            .toPromise()
            .then(res => res.json()._embedded.reefs as any[])
            .catch(this.handleError);
    }

    getData(id: string): Promise<any> {
        console.log("Service Called");
        return this.http.get(this.specificReefPageUrl + id)
            .toPromise()
            .then(res => res.json() as any)
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error('An error reading JSON occurred', error);
        return Promise.reject(error.message || error);
    }
}