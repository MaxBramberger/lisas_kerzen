import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

export type CandleCategory = typeof CandleCategory[keyof typeof CandleCategory]

export const CandleCategory = {
  baptism: 'baptism',
  birthday: 'birthday',
  christmas: 'christmas',
  communion: 'communion',
  easter: 'easter',
  funeral: 'funeral',
  general: 'general',
  marriage: 'marriage'
 }

 export const CandleCategoryNames: {[K in CandleCategory]: string}  = {
  [CandleCategory.baptism]: 'Taufkerzen',
  [CandleCategory.birthday]: 'Geburtstagskerzen',
  [CandleCategory.christmas]: 'Weihnachtskerzen',
  [CandleCategory.communion]: 'Kommunionskerzen',
  [CandleCategory.easter]: 'Osterkerzen',
  [CandleCategory.funeral]: 'Trauerkerzen',
  [CandleCategory.general]: 'Verschiedene',
  [CandleCategory.marriage]: 'Hochzeitskerzen'
 }

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private imageService: ImageService) {}
  imageListByCategory: Record<CandleCategory,string[]> = {};
  categories: string[] = [];
  title = 'Lisas Kerzen';

  ngOnInit(): void {
    this.imageService.getCategories().subscribe((resp) => {
      this.categories = resp;
      this.categories=this.categories.sort((a,b) => this.getCategoryDisplayName(a).localeCompare(this.getCategoryDisplayName(b)))
      this.categories.forEach(category =>{
        this.imageService.getImagePaths(category).subscribe(resp=>{
          this.imageListByCategory[category]=resp
        })
      })
    });
  }

  getCategoryDisplayName(category: string){
    return CandleCategoryNames[category] ? CandleCategoryNames[category] : category
  }
}
