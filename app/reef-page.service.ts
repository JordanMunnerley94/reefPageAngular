import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ReefPageService {

    private indexDataUrl = "http://localhost:8080/reefs?size=500&sort=reefName";
    private specificReefPageUrl = "http://localhost:8080/reefpage?reefid=";

    constructor (private http : Http) {}

    getIndexEntries(): Promise<any[]> {
        return this.http.get(this.indexDataUrl)
            .toPromise()
            .then(res => res.json()._embedded.reefs as any[])
            .catch(this.handleError);
    }

    getData(id: string): Promise<any> {
        return this.http.get(this.specificReefPageUrl + id)
            .toPromise()
            .then(res => res.json() as any)
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}