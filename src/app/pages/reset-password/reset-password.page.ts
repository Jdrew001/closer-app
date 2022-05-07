import { MessageService } from './../../core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { CoreConstants } from 'src/app/core/core.constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private userService: UserService,
    private messageService: MessageService
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  async submit() {
    if (this.passwordForm.valid && this.passwordsMatch) {
      // call service to update password
      const userId = await this.userService.getUserInfo();
      this.authService.sendPasswordForReset(this.password.value, userId?.userId).subscribe(res => {
        if (res.error) {
          this.messageService.showErrorMessage(res.message);
          return;
        }

        this.messageService.showSuccessMessage(res.message);
        setTimeout(() => {this.navController.navigateBack('/login', { replaceUrl:true })}, 1000);
      });
    }
  }

  cancel() {
    this.navController.navigateBack('/login');
  }

}
