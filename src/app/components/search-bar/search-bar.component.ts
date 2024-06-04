import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Novelnameurl } from '../../models/novelnameurl';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [ApicallService],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  novels: Novelnameurl[] = [];
  filteredNovels: Novelnameurl[] = [];
  searchQuery: string = '';
  isSearchActive: boolean = false;

  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('searchResults') searchResults!: ElementRef;

  constructor(
    private apicallservice: ApicallService,
    private eRef: ElementRef,
  ) {
    this.obterListaNovels();
  }

  obterListaNovels() {
    this.apicallservice.getNovels().subscribe((novels) => {
      this.novels = novels;
    });
  }

  filterNovels() {
    if (this.searchQuery.trim() === '') {
      this.filteredNovels = [];
      return;
    }
    const query = this.searchQuery.toLowerCase();
    this.filteredNovels = this.novels.filter((novel) =>
      novel.name.toLowerCase().includes(query),
    );
  }

  onSearchQueryChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.isSearchActive = this.searchQuery.trim() !== '';
    this.filterNovels();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Check if the click is outside the search bar and search results
    if (
      this.isSearchActive &&
      this.searchContainer &&
      this.searchResults &&
      !this.searchContainer.nativeElement.contains(targetElement) &&
      !this.searchResults.nativeElement.contains(targetElement)
    ) {
      this.isSearchActive = false;
      this.searchQuery = ''; // Clear the search input
      this.filteredNovels = []; // Clear the search results
    }
  }
}
