import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../shared/services/account.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               private router: Router,
               private toast: ToastrService,
               private accountService: AccountService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.accountService.activateAccount(params['key'])
        .subscribe(() => {
          if (params['key']) {
            this.router.navigate(['../login']);
          } else {
            this.toast.error('There is no key to activate user');
            this.router.navigate(['../login']);
          }
        }, error => {
          this.toast.error(error.error.message);
          this.router.navigate(['../login']);
        } );
    });
  }

}
