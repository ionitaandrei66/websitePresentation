import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
        <div class="w-100 h-100" >
            <router-outlet></router-outlet>
        </div>
    `,
  styles: [''],
})
export class AppComponent {
  title = 'andreiwebsite';
}
