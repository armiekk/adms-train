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

  private tabId: string = sessionStorage.getItem('tabId') || null;
  private tabValue: string = localStorage.getItem('tabValue') || null;

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
      case 'tabValue':
        console.log(event.newValue);
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
    this.setTabValue(this.getTabIdOnce());

  }
  
  setTabValue(tabId: string){
    if (this.tabValue && tabId.trim().length > 0) {
      localStorage.setItem('tabValue', `${this.tabValue}.${tabId}`)
    } else if (tabId.trim().length > 0) {
      localStorage.setItem('tabValue', `${tabId}`);
    }
  }

  getTabIdOnce(){
    if(this.tabId) {
      return '';
    } else {
      sessionStorage.setItem('tabId', `${Math.floor((Math.random() * 1000) + 1)}`);
      return sessionStorage.getItem('tabId');
    }
  }
  
}
