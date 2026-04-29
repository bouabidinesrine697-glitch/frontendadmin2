import { afterNextRender, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showMenu = false;
  title = 'frontend';

  constructor(private router: Router) {
    // ✅ afterNextRender must be called directly in the constructor
    afterNextRender(() => {
      import('flowbite').then((flowbite) => {
        flowbite.initFlowbite();
      });
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const isMobile = window.innerWidth < 992; // ✅ innerWidth is more reliable than screen.width

        // ✅ On mobile, skip menu/redirect logic entirely
        if (isMobile) {
          return;
        }

        if (event.url === '/auth/login') {
          this.showMenu = false;
        } else if (event.url === '/') {
          const token = this.tokenGetter();
          if (!token) {
            this.showMenu = false;
            this.router.navigate(['auth/login']);
          } else {
            this.showMenu = true;
            this.router.navigate(['user/users']);
          }
        } else {
          this.showMenu = true;
        }
      });
  }

  tokenGetter(): string {
    const name = 'token=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }
    return '';
  }
}