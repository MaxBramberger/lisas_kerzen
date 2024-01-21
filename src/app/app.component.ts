import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { CandleCategory, CandleCategoryNames } from './main-page/main-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Lisas Kerzen';
  constructor(private imageService: ImageService) {}
  imageListByCategory: Record<CandleCategory, string[]> = {};
  imageListStatus: Record<CandleCategory, boolean> = {};
  categories: string[] = [];
  category: string | undefined;

  ngOnInit(): void {
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
        });
      });
    });
  }

  getCategoryDisplayName(category: string) {
    return CandleCategoryNames[category] ? CandleCategoryNames[category] : category;
  }

  getCategoryStatus(category: string | undefined) {
    if (category) {
      console.log(this.imageListStatus[category])
      return this.imageListStatus[category];
    } else {
      console.log(false)
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

  onTabClick(category: string) {
    this.imageListStatus[category] = !this.imageListStatus[category];
  }
}
