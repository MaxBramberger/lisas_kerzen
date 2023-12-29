import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private imageService: ImageService) {}
  imageList: string[] = [];
  categories: string[] = [];
  title = 'Lisas Kerzen';

  ngOnInit(): void {
    this.imageService.getCategories().subscribe((resp) => {
      this.categories = resp;
      this.categories.forEach(category =>{
        this.imageService.getImagePaths(category).subscribe(resp=>{
          this.imageList.push(...resp)
        })
      })
    });
  }
}
