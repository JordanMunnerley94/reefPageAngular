import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {ReefPageService} from "./reef-page.service";

@Injectable()
export class TestResolver implements Resolve<any> {

    constructor (
        private reefService: ReefPageService
    ) {}

    resolve(route: ActivatedRouteSnapshot) : Promise<any> {
        let id = route.params['reefid'];
        return this.reefService.getData(route.params['reefid'])
    }
}