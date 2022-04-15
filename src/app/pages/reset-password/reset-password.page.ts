import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  passwordForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navController: NavController
  ) { }

  get password() { return this.passwordForm.get('password'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get passwordsMatch() {
    return this.password.value === this.confirmPassword.value;
  }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    if (this.passwordForm.valid && this.passwordsMatch) {
      // call service to update password
    }
  }

  cancel() {
    this.navController.navigateBack('/login');
  }

}
