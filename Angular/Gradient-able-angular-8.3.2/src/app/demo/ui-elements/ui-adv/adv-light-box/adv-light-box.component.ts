import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-adv-light-box',
  templateUrl: './adv-light-box.component.html',
  styleUrls: ['./adv-light-box.component.scss']
})
export class AdvLightBoxComponent implements OnInit {
  public singleGallery1: any;
  public singleGallery2: any;
  public albums: any;

  constructor() {
    this.singleGallery1 = [
      {
        src: 'assets/images/light-box/l3.jpg',
        caption: 'Image 3 caption here',
        thumb: 'assets/images/light-box/sl3.jpg'
      }
    ];
    this.singleGallery2 = [
      {
        src: 'assets/images/light-box/l4.jpg',
        caption: 'Image 4 caption here',
        thumb: 'assets/images/light-box/sl4.jpg'
      }
    ];

    this.albums = [];
    for (let i = 1; i <= 6; i++) {
      const album = {
        src: 'assets/images/light-box/l' + i + '.jpg',
        caption: 'Image ' + i + ' caption here',
        thumb: 'assets/images/light-box/sl' + i + '.jpg'
      };

      this.albums.push(album);
    }
  }

  ngOnInit() {
  }

}
