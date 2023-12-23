import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(private imageService: ImageService){}
  imageList: string[] = []
  title = 'Lisas Kerzen'

  ngOnInit(): void {
    this.imageService.getImagePaths().subscribe(resp => {
      this.imageList = resp
    })
  }

  getPathToImage(imageName: string){
    return 'assets/img/' + imageName
  }
}
