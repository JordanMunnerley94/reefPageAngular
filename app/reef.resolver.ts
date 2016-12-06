import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {ReefPageService} from "./reef-page.service";

@Injectable()
export class ReefResolver implements Resolve<any> {

    constructor (
        private reefService: ReefPageService
    ) {}

    resolve(route: ActivatedRouteSnapshot) : Promise<any> {
        let id = route.params['reefid'];
        return this.reefService.getData(route.params['reefid'])
    }
}