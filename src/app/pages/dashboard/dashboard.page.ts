import { AuthService } from './../../core/services/auth.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BarModel, GraphModel } from 'projects/ced-widgets/src/lib/graphs/bar-graph/bar-graph.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessageService } from 'src/app/core/services/message.service';
import { DashboardConstant } from './dashboard.constant';
import SwiperCore, { Swiper, SwiperOptions, Pagination } from 'swiper';
import { CircleGaugeModel } from 'projects/ced-widgets/src/public-api';
import { CircleGaugeComponent } from 'ced-widgets';
import { DashboardService } from './dashboard.service';
import { DashboardGraphSelectRequest, DashboardSwipeRequest } from './dashboard.model';
import { ViewDidEnter } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit, ViewDidEnter {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('gauge') gaugeComponent: CircleGaugeComponent;

  selectedRequest: DashboardGraphSelectRequest = new DashboardGraphSelectRequest();//
  dataLoaded = false;
  graphData: BarModel = new BarModel();
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: true,
    scrollbar: { draggable: true }
  };
  gaugeConfig: CircleGaugeModel = DashboardConstant.CIRCLE_GAUGE_CONFIG;

  activeIndex = -1;
  selectedWeek;
  selectedDay: string = DashboardConstant.DAY_DEFINITION[new Date().getDay()];

  get selectedData(): GraphModel { return this.graphData.data.find(item => item.selected) }

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private dashboardService: DashboardService
  ) { }

  ionViewDidEnter(): void {
    this.fetchInit();
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    
  }

  /**
   * Fetch the initial data for graph
   */
  fetchInit() {
    this.dashboardService.fetchGetSelectedGraphData(this.selectedRequest).subscribe(res => {
      this.updateGraphData(res);
      this.dataLoaded = true;
      this.activeIndex = this.getInitialSlide();
      this.selectedWeek = this.graphData.data[this.activeIndex].subTitle;
      this.updateCircleGuageValue();
    });
  }

  /**
   * Fetch the swiped data for a given date and boundary
   */
  fetchSwipedData(date, boundary) {
    let dto = new DashboardSwipeRequest(9, date, boundary);
    this.dashboardService.fetchGetSwipedGraphData(dto).subscribe(res => {
      this.updateGraphData(res, boundary);
      this.activeIndex = this.getInitialSlide();
      this.selectedWeek = this.graphData.data[this.activeIndex].subTitle;

      this.updateSwiper();
      this.updateCircleGuageValue();
    });
  }

  // Updates circle gauge with incoming changes/default values
  async updateCircleGuageValue() {
    let selValue = this.selectedData.graphData.find(o => o.key == this.selectedDay);
    this.gaugeConfig.currentValue = selValue && selValue?.value ? selValue.value : 0;
    await this.gaugeComponent.updateAnimations(this.gaugeConfig);
  }

  // First slide to show when app loads
  getInitialSlide(): number {
    const index = this.graphData.data.findIndex(o => o.selected);
    return index == -1 ? 0: index;//
  }

  // async logout() {
  //   (await this.authenticationService.logout()).subscribe(async res => {
  //     if (res.error) return;
  //     await this.authService.logoutUser();
  //     this.messageService.showSuccessMessage(null, res.message);
  //   });
  // }

  

  getSelectedWeekDate(index): GraphModel {
    return this.graphData.data[index];
  }

  getConfigurationTitle() {
    return this.graphData?.title?.split(" ");
  }

  // called when swiper slide change ends
  transitionEnd([swiper]) {
    this.activeIndex = swiper.realIndex;
    this.setSelectedWeek(swiper.realIndex)
    this.cd.detectChanges();

    if (this.activeIndex == 0) {
      const date = this.getSelectedWeekDate(this.activeIndex).startDate;//
      const boundary = DashboardConstant.START_BOUNDARY_KEY;
      this.fetchSwipedData(date, boundary);
    }
  }

  getSelectedData(index: number) {
    return this.graphData.data[index];
  }

  // graph selection emits to this method
  selectedDayEmitted(day: string, item: GraphModel) {
    // first make all data unselected
    this.graphData.data.forEach(val => val.selected = false);

    // excecute new selection logic
    let dayOfTheWeekSelected: number = DashboardConstant.DAY_OF_WEEK[day];
    item.selected = true;
    this.selectedDay = DashboardConstant.DAY_DEFINITION[dayOfTheWeekSelected];
    this.updateCircleGuageValue();

    this.cd.detectChanges();
  }

  updateGraphData(res, boundary?) {

    // Updates once service call completess
    this.graphData.animation = res.data.animation;
    this.graphData.title = res.data.title;
    this.graphData.total = res.data.total;

    // checking the start boundary
    if (boundary === DashboardConstant.START_BOUNDARY_KEY) {
      this.graphData.data?.forEach(val => val.selected = false);
      this.graphData.data = [...res.data.data, ...this.graphData.data];
      return;
    }

    // checking the end boundary
    if (boundary === DashboardConstant.END_BOUNDARY_KEY) {

      this.graphData.data?.forEach(val => val.selected = false);
      this.graphData.data = [...this.graphData.data, ...res.data.data];
      return;
    }

    this.graphData.data = [...res.data.data];
  }

  updateSwiper() {
    this.swiper.swiperRef.activeIndex = this.activeIndex;
    this.swiper.swiperRef.realIndex = this.activeIndex;
    this.cd.detectChanges();
  }

  setSelectedWeek(index) {
    this.selectedWeek = this.graphData.data[index].subTitle;
  }
}
