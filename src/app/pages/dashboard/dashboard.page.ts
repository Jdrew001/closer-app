import { AuthService } from './../../core/services/auth.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BarModel, GraphModel } from 'projects/ced-widgets/src/lib/graphs/bar-graph/bar-graph.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessageService } from 'src/app/core/services/message.service';
import { DashboardConstant } from './dashboard.constant';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('swiper') swiper: SwiperCore;

  graphData: BarModel = DashboardConstant.DATA;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: true,
    scrollbar: { draggable: true }
  };
  array = [1,2,3,4,5,6,7,8,9];
  activeIndex = this.getInitialSlide(); // set when integrating with service
  selectedWeek = this.graphData.data[this.activeIndex].subTitle;
  selectedDay: string = DashboardConstant.DAY_DEFINITION[new Date().getDay()];

  get defaultSelectedData(): GraphModel { return this.graphData.data.find(item => item.selected) }

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  // First slide to show when app loads
  getInitialSlide(): number {
    const index = this.graphData.data.findIndex(o => o.selected);
    return index == -1 ? 0: index;
  }

  async logout() {
    (await this.authenticationService.logout()).subscribe(async res => {
      if (res.error) return;
      await this.authService.logoutUser();
      this.messageService.showSuccessMessage(null, res.message);
    });
  }

  setSelectedWeek(index) {
    this.selectedWeek = this.graphData.data[index].subTitle;
  }

  getConfigurationTitle() {
    return this.graphData.title.split(" ");
  }

  transitionEnd([swiper]) {
    this.activeIndex = swiper.realIndex;
    this.setSelectedWeek(swiper.realIndex)
    this.cd.detectChanges();
  }

  getSelectedData(index: number) {
    return this.graphData.data[index];
  }
}
