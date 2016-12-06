import {Component, Input, OnInit, OnChanges} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'my-test',
    template: `
<h1>{{reefData.reef.reefName}}</h1>
<h2>{{reefNameTest}}</h2>
`,
})

export class TestComponent implements OnInit, OnChanges {
    @Input() testString: string;
    reefData: any;
    reefNameTest: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.reefData = this.route.snapshot.data['reefData'];
        console.log("Test resolve", this.reefData)
    }

    ngOnChanges(reefData: any) {
        console.log(this.reefData)

    }
}