import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';


@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;


    const scrollTop = scrollDiv.scrollTop; // -> How much User SCROLLED from top
    const clientHeight = scrollDiv.clientHeight; // -> // How much is the User VIEWPORT/VIEWPOINT's height
    const scrollHeight = scrollDiv.scrollHeight; // -> // Max height to the bottom

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // ->

    if (isAtBottom) {
      // Load the next 20 Gifs
      this.gifService.loadTrendingGifs();
    }
  }
}
