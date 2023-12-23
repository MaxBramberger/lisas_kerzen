import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {
  @Input() path_to_image!: string

  ngOnInit(): void {
    console.log(this.path_to_image)
  }
}
