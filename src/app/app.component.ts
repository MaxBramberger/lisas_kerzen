import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService } from './image.service';
import { BehaviorSubject } from 'rxjs';

export type CandleCategory = (typeof CandleCategory)[keyof typeof CandleCategory];

export const CandleCategory = {
  baptism: 'baptism',
  birthday: 'birthday',
  christmas: 'christmas',
  communion: 'communion',
  easter: 'easter',
  funeral: 'funeral',
  general: 'general',
  marriage: 'marriage',
  confirmation: 'confirmation',
};

export const CandleCategoryNames: { [K in CandleCategory]: string } = {
  [CandleCategory.baptism]: 'Taufkerzen',
  [CandleCategory.birthday]: 'Geburtstagskerzen',
  [CandleCategory.christmas]: 'Weihnachtskerzen',
  [CandleCategory.communion]: 'Kommunionkerzen',
  [CandleCategory.easter]: 'Osterkerzen',
  [CandleCategory.funeral]: 'Trauerkerzen',
  [CandleCategory.general]: 'Verschiedene',
  [CandleCategory.marriage]: 'Hochzeitskerzen',
  [CandleCategory.confirmation]: 'Firmkerzen',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Lisas Kerzen';

  screenWidth!: number;
  screenHeight!: number;

  images: string[] = [];

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: Event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  constructor(private imageService: ImageService) {
    this.getScreenSize();
  }
  imageListByCategory: Record<CandleCategory, string[]> = {};
  imageListStatus: Record<CandleCategory, boolean> = {};
  categories: string[] = [];
  category: string | undefined;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.loading$.next(true);
    this.imageService.getCategories().subscribe((resp) => {
      this.categories = resp;
      this.category = this.categories[0];
      this.categories = this.categories.sort((a, b) =>
        this.getCategoryDisplayName(a).localeCompare(this.getCategoryDisplayName(b)),
      );
      this.categories.forEach((category) => {
        this.imageListStatus[category] = false;
        this.imageService.getImagePaths(category).subscribe((resp) => {
          this.imageListByCategory[category] = resp;
          this.images.push(...resp);
          this.imageListStatus[category] = true;
          this.checkLoadingDone();
        });
      });
    });
  }

  checkLoadingDone() {
    let done = true;
    this.categories.forEach((category) => {
      done = done && this.imageListStatus[category];
    });
    if (done) {
      this.loading$.next(false);
    }
  }

  getCategoryDisplayName(category: string) {
    return CandleCategoryNames[category] ? CandleCategoryNames[category] : category;
  }

  getCategoryStatus(category: string | undefined) {
    if (category) {
      return this.imageListStatus[category];
    } else {
      return false;
    }
  }
  getImageListByCategory(category: string | undefined) {
    if (category) {
      return this.imageListByCategory[category];
    } else {
      return [];
    }
  }

  getTotalImageList() {
    return this.images;
  }

  onTabClick(category: string) {
    this.imageListStatus[category] = !this.imageListStatus[category];
  }
}
