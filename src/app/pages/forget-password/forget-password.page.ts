import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

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
    private authService: AuthService,
    private userService: UserService
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
      this.authService.sendEmailForReset(this.email.value).subscribe(async res => {
        if (res.isUser && res.userId) {
          // set user id for reset
          await this.userService.setUserId(res.userId);
          this.authService.isReset = true;
          // navigate to new page for code
          setTimeout(() => {this.navController.navigateRoot('/verify-account', { replaceUrl:true })}, 1000);
        }
      });
    }
  }

  back() {
    this.navController.navigateBack('/login');
  }

}
