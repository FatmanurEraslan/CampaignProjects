import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule, ButtonModule, InputTextModule, PasswordModule,],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: any;
  registerForm: any;
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['/campaigns']); // Başarılı giriş sonrası yönlendirme
        }, 600);
      } else {
        this.showError();
      }
    } else {
      this.showError();
    }
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: '', detail: 'Başarıyla Giriş yapıldı' });

  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Kullanıcı Adı ya da Şifre Hatalı.' });
  }

}
