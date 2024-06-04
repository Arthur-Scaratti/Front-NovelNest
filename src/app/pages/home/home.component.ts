import { Component, inject } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Novelnameurl } from '../../models/novelnameurl';
import { CarouselComponent } from '../../components/novel-carousel-principal/novel-carousel.component';
import { RecentUploadedComponent } from '../../components/novel-carousel-principal/recent-uploaded/recent-uploaded.component';
import { RecentUploadedSlideComponent } from '../../components/home/recent-uploaded-slide/recent-uploaded-slide.component';
import { TopByTagSlideComponent } from '../../components/home/top-by-tag-slide/top-by-tag-slide.component';
import { TopTenByTagSlideComponent } from '../../components/home/top-ten-by-tag-slide/top-ten-by-tag-slide.component';
import { TopByTag } from '../../models/novelnameurl';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    RecentUploadedComponent,
    RecentUploadedSlideComponent,
    TopByTagSlideComponent,
    TopTenByTagSlideComponent,
  ],

  providers: [ApicallService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  apicallservice = inject(ApicallService);
  novels: Novelnameurl[] = [];
  recentUploaded: Novelnameurl[] = [];
  topOneByTag: Novelnameurl[] = [];
  topTenByTag: TopByTag[] = [];
  novels$ =  this.apicallservice
  .getNovels()
  .subscribe((novels) => (this.novels = novels));
  recentUploaded$ = this.apicallservice
  .getRecentUpload()
  .subscribe((novels) => (this.recentUploaded = novels));
  topOneByTag$ = this.apicallservice
  .getTopOneByTag()
  .subscribe((data) => (this.topOneByTag = data));
  topTenByTag$ = this.apicallservice
  .getTopTenByTag()
  .subscribe((data) => (this.topTenByTag = data));
  
  constructor() {}
}
