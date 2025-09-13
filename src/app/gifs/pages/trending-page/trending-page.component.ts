import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService)
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  // Required when using implements AfterViewInit
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; // -> How much User SCROLLED from top
    const clientHeight = scrollDiv.clientHeight; // -> // How much is the User VIEWPORT/VIEWPOINT's height
    const scrollHeight = scrollDiv.scrollHeight; // -> // Max height to the bottom

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // -> Calculate if User scroll position is Bottom (Returns a boolean)
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      // Load the next page (20 Gifs)
      this.gifService.loadTrendingGifs();
    }
  }
}
