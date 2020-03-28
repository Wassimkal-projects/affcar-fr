import {NgModule} from '@angular/core';
import {CampaignComponent} from './campaign.component';
import {CampaignRoutingModule} from './campaign-routing.module';


@NgModule({
  declarations: [CampaignComponent],
  imports: [
    CampaignRoutingModule,
  ]
})
export class CampaignModule {
}
