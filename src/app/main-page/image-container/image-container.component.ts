import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePopUpComponent } from './image-pop-up/image-pop-up.component';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss'],
})
export class ImageContainerComponent {
  @Input() path_to_image!: string;

  constructor(public dialog: MatDialog) {}

  onClick() {
    const dialogRef = this.dialog.open(ImagePopUpComponent, {
      data: { path_to_image: this.path_to_image },
    });
  }
}
