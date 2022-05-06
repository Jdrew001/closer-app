import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BarModel } from 'projects/ced-widgets/src/lib/graphs/bar-graph/bar-graph.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  graphConfig: BarModel = {
    title: 'Completion % - This Week',
    data: [
      {
        key: 'S',
        value: 100
      },
      {
        key: 'M',
        value: 20
      },
      {
        key: 'T',
        value: 50
      },
      {
        key: 'W',
        value: 85
      },
      {
        key: 'T',
        value: 40
      },
      {
        key: 'F',
        value: 55
      },
      {
        key: 'S',
        value: 20
      }
    ],
    keys: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    animation: true
  }

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
