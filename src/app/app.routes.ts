import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadChildren:()=>import('./campaign/campaign.module').then(m=>m.CampaignModule)},

];
