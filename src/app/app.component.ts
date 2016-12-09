import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventManager } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private location: Location, private eventManager: EventManager) {
  }

  @HostListener('window:storage', ['$event'])
  checkUserToken(event: StorageEvent) {
    switch (event.key) {
      case 'token':
        if (event.newValue) {
          console.log(event.newValue);
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['login']);
        }
        break;
      default:
        break;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  removeTab(event: BeforeUnloadEvent) {
    let tabId = sessionStorage.getItem('tabId');
    let tabValue: string[] = localStorage.getItem('tabValue').split('.');
    tabValue.splice(tabValue.indexOf(tabId), 1);
    localStorage.setItem('tabValue', tabValue.join('.'));
    sessionStorage.removeItem('tabId');
  }

  ngOnInit() {
    if (!this.isDuplicatedTab()) {
      this.setTabValue(this.getTabIdOnce());
    }
  }

  setTabValue(tabId: string) {
    let tabValue: string = localStorage.getItem('tabValue') || null;
    if (tabValue && tabId) {
      localStorage.setItem('tabValue', `${tabValue}.${tabId}`);
    } else {
      localStorage.setItem('tabValue', `${tabId}`);
    }
  }

  getTabIdOnce() {
    let tabId: string = sessionStorage.getItem('tabId') || null;
    if (!tabId) {
      sessionStorage.setItem('tabId', `${Math.floor((Math.random() * 1000) + 1)}`);
      return sessionStorage.getItem('tabId');
    }
    return;
  }

  isDuplicatedTab() {
    let tabId: string = sessionStorage.getItem('tabId');
    let tabValue: string[] = localStorage.getItem('tabValue') ? localStorage.getItem('tabValue').split('.') : null;
    if (tabValue && tabId && tabValue.indexOf(tabId) > -1) {
      sessionStorage.setItem('tabId', `${Math.floor((Math.random() * 1000) + 1)}`);
      let changedTabId = sessionStorage.getItem('tabId');
      localStorage.setItem('tabValue', `${tabValue.join('.')}.${changedTabId}`);
      return true;
    } else {
      return false;
    }
  }

}
