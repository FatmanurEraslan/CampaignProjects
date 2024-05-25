import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { Campaign } from '../../models/campaign-model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-campaign',
  standalone: true,
  imports: [SideNavComponent, ToastModule, ReactiveFormsModule, InputTextModule, InputNumberModule, CommonModule, InputTextModule, CalendarModule],
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss'],
  providers: [MessageService],
})
export class AddCampaignComponent implements OnInit {

  private campaignsKey = 'campaigns';
  campaignForm: any;
  campaigns: Campaign[] = [];
  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.campaignForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      explanation: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      point: [0, [Validators.min(0)]],
    });
  }

  getCampaigns(): Campaign[] {
    const data = localStorage.getItem(this.campaignsKey);
    const parsedData = data ? JSON.parse(data) : [];
    return Array.isArray(parsedData) ? parsedData : [];
  }
  // we are getting max id inthe local storage because  when we add new campaign we should give new id .it depends on change id 
  getMaxId(): number {
    const campaigns = this.getCampaigns();
    return campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) : 0;
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const newCampaign: Campaign = this.campaignForm.value;
      const campaigns = this.getCampaigns();
      newCampaign.id = this.getMaxId() + 1;
      campaigns.push(newCampaign);
      localStorage.setItem(this.campaignsKey, JSON.stringify(campaigns));

      this.showSuccessMessage();
      this.reset();
    }
  }
  //to reset data for new form
  reset(){
    this.campaignForm.reset({ point: 0, date: new Date() });

  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: '', detail: 'Başarıyla kaydedildi ' });
  }
}
