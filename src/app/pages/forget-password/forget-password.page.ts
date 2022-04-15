import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  emailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navController: NavController,
    private authService: AuthService
  ) { }

  get email() { return this.emailForm.get('email'); }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.emailForm.valid) {
      this.authService.sendEmailForReset(this.email.value).subscribe(res => {
        console.log('test', res);
      });
    }
  }

  back() {
    this.navController.navigateBack('/login');
  }

}
