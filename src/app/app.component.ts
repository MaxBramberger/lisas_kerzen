import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService, PathByCategory } from './image.service';
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
  [CandleCategory.communion]: 'Kommunionkerzen',
  [CandleCategory.birthday]: 'Geburtstagskerzen',
  [CandleCategory.marriage]: 'Hochzeitskerzen',
  [CandleCategory.funeral]: 'Trauerkerzen',
  [CandleCategory.confirmation]: 'Firmkerzen',
  [CandleCategory.easter]: 'Osterkerzen',
  [CandleCategory.christmas]: 'Weihnachtskerzen',
  [CandleCategory.general]: 'Verschiedene',
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
    this.categories = Object.keys(CandleCategoryNames);
    this.category = this.categories[0];

    this.imageService.getPaths().subscribe((resp) => {
      this.getPathsFromResponse(resp);
    });

    // this.categories.forEach((category) => {
    //   this.imageListStatus[category] = false;
    //   this.imageService.getImagePaths(category).subscribe((resp) => {
    //     console.log('category', category, resp);
    //     this.imageListByCategory[category] = resp;
    //     this.images.push(...resp);
    //     this.imageListStatus[category] = true;
    //     this.checkLoadingDone();
    //   });
    // });
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

  getPathsFromResponse(resp: PathByCategory) {
    this.imageListByCategory[CandleCategory.baptism] = resp.baptism.map(
      (value) => `assets/img/${CandleCategory.baptism}/${value}`,
    );
    this.imageListByCategory[CandleCategory.communion] = resp.communion.map(
      (value) => `assets/img/${CandleCategory.communion}/${value}`,
    );
    this.imageListByCategory[CandleCategory.birthday] = resp.birthday.map(
      (value) => `assets/img/${CandleCategory.birthday}/${value}`,
    );
    this.imageListByCategory[CandleCategory.marriage] = resp.marriage.map(
      (value) => `assets/img/${CandleCategory.marriage}/${value}`,
    );
    this.imageListByCategory[CandleCategory.funeral] = resp.funeral.map(
      (value) => `assets/img/${CandleCategory.funeral}/${value}`,
    );
    this.imageListByCategory[CandleCategory.confirmation] = resp.confirmation.map(
      (value) => `assets/img/${CandleCategory.confirmation}/${value}`,
    );
    this.imageListByCategory[CandleCategory.easter] = resp.easter.map(
      (value) => `assets/img/${CandleCategory.easter}/${value}`,
    );
    this.imageListByCategory[CandleCategory.christmas] = resp.christmas.map(
      (value) => `assets/img/${CandleCategory.christmas}/${value}`,
    );
    this.imageListByCategory[CandleCategory.general] = resp.general.map(
      (value) => `assets/img/${CandleCategory.general}/${value}`,
    );
  }

  onTabClick(category: string) {
    this.imageListStatus[category] = !this.imageListStatus[category];
  }
}
