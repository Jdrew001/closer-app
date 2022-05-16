import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BarModel } from 'projects/ced-widgets/src/lib/graphs/bar-graph/bar-graph.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessageService } from 'src/app/core/services/message.service';
import { DashboardConstant } from './dashboard.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  graphConfig: BarModel = DashboardConstant.DATA;

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  async logout() {
    (await this.authenticationService.logout()).subscribe(async res => {
      if (res.error) return;
      await this.authService.logoutUser();
      this.messageService.showSuccessMessage(null, res.message);
    });
    
  }

}
