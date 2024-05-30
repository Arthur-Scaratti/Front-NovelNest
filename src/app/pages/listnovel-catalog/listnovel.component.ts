import { Component } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Novelnameurl } from '../../models/novelnameurl';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NovelsGridComponent } from '../../components/novels-grid/novels-grid.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listnovel',
  standalone: true,
  imports: [NovelsGridComponent],
  providers: [ApicallService, HttpClient, HttpClientModule],
  templateUrl: './listnovel.component.html',
  styleUrl: './listnovel.component.scss',
})
export class ListnovelComponent {
  novels: Novelnameurl[] = [];
  tag: string = '';

  constructor(private apicallservice: ApicallService, private route: ActivatedRoute, private router: Router) {
    this.obterListaNovels();
  } 
  
   
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const tagParam = params.get('tag');
    if (tagParam) {
      this.tag = decodeURIComponent(tagParam);
    }
  });
}

obterListaNovels() {
  this.apicallservice
    .getNovels()
    .subscribe((novels) => (this.novels = novels));
}
}
