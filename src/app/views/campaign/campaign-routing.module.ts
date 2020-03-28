import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CampaignComponent} from './campaign.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

/*const routes: Routes = [
  {path: '', redirectTo: 'my-campaigns', pathMatch: 'full'},
  {path: 'my-campaigns', component: CampaignComponent, data: {title: 'Page 404'}},


];*/

const routes: Routes = [
  {
    path: '',
    component: CampaignComponent,
    data: {
      title: 'My compaigns'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule {
}
