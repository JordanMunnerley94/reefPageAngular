import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<h1>{{title}}</h1>
<my-reefzone></my-reefzone>
<my-reefpage></my-reefpage>
`,
})
export class AppComponent  {
  title = 'Reef Page Test';
}
