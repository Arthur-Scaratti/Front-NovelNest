import { Component, inject } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Novelnameurl } from '../../models/novelnameurl';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NovelsGridComponent } from '../../components/novels-grid/novels-grid.component';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-listnovel',
  standalone: true,
  imports: [NovelsGridComponent],
  providers: [ApicallService, HttpClient, HttpClientModule],
  templateUrl: './listnovel.component.html',
  styleUrl: './listnovel.component.scss',
})
export class ListnovelComponent {
  apicallservice = inject (ApicallService);
  route = inject (ActivatedRoute);
  
  novels: Novelnameurl[] = [];
  novels$ =  this.apicallservice
  .getNovels()
  .subscribe((novels) => (this.novels = novels));
 
  tag: string = '';
  tag$ = this.route.paramMap.subscribe((params) => {
    const tagParam = params.get('tag');
    if (tagParam) {
      this.tag = decodeURIComponent(tagParam);
    }
  });

  constructor() {
    console.log(this.tag);
    for (let novel of this.novels){
      console.log(novel.name)
    }
  }

}
