import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ImagePopUpConstructorArguments {
  path_to_image: string;
}

@Component({
  selector: 'app-image-pop-up',
  templateUrl: './image-pop-up.component.html',
  styleUrls: ['./image-pop-up.component.scss'],
})
export class ImagePopUpComponent {
  path: string;

  constructor(
    public dialogRef: MatDialogRef<ImagePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public args: ImagePopUpConstructorArguments,
  ) {
    this.path = args.path_to_image;
  }
}
