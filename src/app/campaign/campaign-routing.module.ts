import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { AuthGuard } from '../guards/auth-guards';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'side-nav',component:SideNavComponent
  },
  {path:'campaigns',component:CampaignsComponent,canActivate: [AuthGuard]},
  {path:'add-campaign',component:AddCampaignComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
