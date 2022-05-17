import { AuthService } from './../../core/services/auth.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BarModel, GraphModel } from 'projects/ced-widgets/src/lib/graphs/bar-graph/bar-graph.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessageService } from 'src/app/core/services/message.service';
import { DashboardConstant } from './dashboard.constant';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import { CircleGaugeModel } from 'projects/ced-widgets/src/public-api';
import { CircleGaugeComponent } from 'ced-widgets';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {

  @ViewChild('swiper') swiper: SwiperCore;
  @ViewChild('gauge') gaugeComponent: CircleGaugeComponent;

  graphData: BarModel = DashboardConstant.DATA;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: true,
    scrollbar: { draggable: true }
  };
  gaugeConfig: CircleGaugeModel = DashboardConstant.CIRCLE_GAUGE_CONFIG;

  activeIndex = this.getInitialSlide(); // set when integrating with service
  selectedWeek = this.graphData.data[this.activeIndex].subTitle;
  selectedDay: string = DashboardConstant.DAY_DEFINITION[new Date().getDay()];

  get selectedData(): GraphModel { return this.graphData.data.find(item => item.selected) }

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.updateCircleGuageValue();
  }

  ngOnInit() {
    console.log('selected day ', this.selectedDay, this.selectedData);
    
  }

  async updateCircleGuageValue() {
    let selValue = this.selectedData.graphData.find(o => o.key == this.selectedDay);
    this.gaugeConfig.currentValue = selValue && selValue?.value ? selValue.value : 0;
    await this.gaugeComponent.updateAnimations(this.gaugeConfig);
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

    // call service
  }

  getSelectedData(index: number) {
    return this.graphData.data[index];
  }

  selectedDayEmitted(day: string, item: GraphModel) {
    // first make all data unselected
    this.graphData.data.forEach(val => val.selected = false);

    // excecute new selection logic
    let dayOfTheWeekSelected: number = DashboardConstant.DAY_OF_WEEK[day];
    item.selected = true;
    this.selectedDay = DashboardConstant.DAY_DEFINITION[dayOfTheWeekSelected];
    this.updateCircleGuageValue();
  }
}
