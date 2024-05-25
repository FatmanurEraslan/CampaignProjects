import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Campaign } from '../../models/campaign-model';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [DividerModule, ScrollPanelModule, CommonModule, SideNavComponent, ProgressSpinnerModule, DialogModule, ReactiveFormsModule, CalendarModule, ConfirmDialogModule, CardModule, ButtonModule, TagModule, CommonModule, InputNumberModule, FormsModule, ToastModule],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class CampaignsComponent {
  campaigns: Campaign[] = [];
  visible: boolean = false;
  campaignForm: any; // Initialize with an empty FormGroup
  private campaignsKey = 'campaigns';

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCampaigns();
    this.campaignForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      explanation: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      point: [0, [Validators.min(0)]],
    });
  }
  getCampaigns() {
    const campaignsFromStorage = localStorage.getItem('campaigns');
    if (campaignsFromStorage !== null) {
      this.campaigns = JSON.parse(campaignsFromStorage);

    }
  }
  deleteCampaign(id: number) {
    this.campaigns = this.campaigns.filter(campaign => campaign.id !== id);
    localStorage.setItem('campaigns', JSON.stringify(this.campaigns));
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      header: 'Bilgilendirme',
      message: 'Silmek istediğinizden emin misiniz?',

      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text p-button-warning",
      acceptButtonStyleClass: "p-button-warning ",
      acceptLabel: 'Sil',  // Change the text here
      rejectLabel: 'İptal et',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Başarıyla Silindi ' });
        this.deleteCampaign(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'İptal edildi', detail: 'Silme işlemi iptal edildi.', life: 3000 });
      }
    });
  }
  setForm(id: number) {
    const campaignsFromStorage = localStorage.getItem('campaigns');
    if (campaignsFromStorage !== null) {
      const campaigns: Campaign[] = JSON.parse(campaignsFromStorage);
      const campaign = campaigns.find(c => c.id === id);
      if (campaign) {
        this.campaignForm = this.fb.group({
          id: [campaign.id],
          title: [campaign.title, [Validators.required]],
          explanation: [campaign.explanation, [Validators.required]],
          date: [new Date(campaign.date), [Validators.required]],
          point: [campaign.point, [Validators.min(0)]],
        });
        console.log(this.campaignForm.value)
      } else {
        // Handle case where the campaign with the specified ID is not found
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Campaign not found', life: 3000 });
      }
    } else {
      // Handle case where there are no campaigns in localStorage
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'No campaigns found', life: 3000 });
    }
  }
  showUpdateDialog(id: number) {
    this.setForm(id);
    this.visible = true;
  }
  updateCampaign() {

    const updatedCampaign = this.campaignForm.value as Campaign;
    const campaignsFromStorage = localStorage.getItem(this.campaignsKey);
    if (campaignsFromStorage !== null) {
      let campaigns: Campaign[] = JSON.parse(campaignsFromStorage);
      const index = campaigns.findIndex(c => c.id === updatedCampaign.id);
      if (index !== -1) {
        campaigns[index] = updatedCampaign;
        localStorage.setItem(this.campaignsKey, JSON.stringify(campaigns));
        this.showSuccessMessage();
        this.getCampaigns(); // Refresh the campaigns list
        this.visible = false; // Close the dialog
      } else {
        this.messageService.add({ severity: 'error', summary: '', detail: 'Hata', life: 3000 });
      }
    }
  }
  onInputChange(event: any, id: number) {
    this.setForm(id);
    this.campaignForm.get('point')?.setValue(event.value);
    this.updateCampaign();
  }

  onInputEvent(event: any, id: number) {

    this.setForm(id);
    this.campaignForm.get('point')?.setValue(event.value);
    this.updateCampaign();
  }
  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: '', detail: 'Başarıyla Güncellendi ' });
  }

}
