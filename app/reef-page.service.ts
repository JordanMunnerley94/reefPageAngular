import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ReefPageService {

    private reefPageUrl = "http://localhost:8080/reefpage?reefid=18032S";
    // private reefPageUrl = "http://localhost:8080/reefpage?reefid=13093A";

    constructor (private http : Http) {}

    getData(): Promise<any> {
        return this.http.get(this.reefPageUrl)
            .toPromise()
            .then(res => res.json() as any)
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error('An error reading JSON occurred', error);
        return Promise.reject(error.message || error);
    }
}