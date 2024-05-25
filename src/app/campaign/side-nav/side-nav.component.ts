import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api/menuitem';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [SidebarModule,ButtonModule,MenuModule,],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  constructor(private router:Router,private authService: AuthService,private messageService: MessageService,){
    
  }

  ngOnInit() {
      this.items = [
          { label: 'Kampanyalar', icon: 'pi pi-chevron-right ', name:'campaigns', command: (event) => this.goPage(event)},
          { label: 'Kampanya Oluştur', icon: 'pi pi-plus',  name:'add-campaign',command: (event) => this.goPage(event)},
          { label: 'Çıkış yap', icon: 'pi pi-power-off',  name:'login',command: (event) => this.goPage(event)}

      ];
  }
  goPage(event:any) {
    var selected =event.item.name;
    this.router.navigate(['/'+selected]);
    if(selected=='login'){
      this.authService.logout();
        this.showSuccess();
        this.router.navigate(['/login']); // Başarılı giriş sonrası yönlendirme
      
    }

    
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: '', detail: 'Başarıyla Giriş yapıldı' });

}

}