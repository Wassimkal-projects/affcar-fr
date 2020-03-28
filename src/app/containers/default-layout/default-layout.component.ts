import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {navItems} from '../../_nav';
import {Router} from '@angular/router';
import {AccountService} from '../../shared/services/account.service';
import {ParsedToken} from '../../shared/models/parsed-token';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  email: string;
  imgUrl: string;

  constructor(private auth: AccountService, private router: Router, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getParsedToken(): ParsedToken {
    return this.auth.getParsedToken();
  }

  getAuthenticatedEamil() {
    this.email = this.getParsedToken().sub;
  }

  ngOnInit(): void {
    this.getAuthenticatedEamil();
    this.getImageUrl();
  }

  private getImageUrl() {
    if (this.getParsedToken().img) {
      this.imgUrl = this.getParsedToken().img;
    }
    this.imgUrl = 'assets/img/avatars/fb-avatar.jpg';
  }
}
