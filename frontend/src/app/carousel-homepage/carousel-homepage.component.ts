import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel-homepage',
  templateUrl: './carousel-homepage.component.html',
  styleUrls: ['./carousel-homepage.component.css']
})
export class CarouselHomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.currentIndex = 0
    this.currentImg = this.homepageImages[this.currentIndex]
    setInterval(() => {
      this.next();
    }, 3000)
  }

  homepageImages : string[] = [
    'assets/homepage1.jpg',
    'assets/homepage2.jpg',
    'assets/homepage3.jpg',
    'assets/homepage4.jpg',
    'assets/homepage5.jpg',
    'assets/homepage6.jpg',
    'assets/homepage7.jpg'
  ]

  currentImg : string;
  currentIndex : number;

  next(){
    this.currentIndex = (this.currentIndex + 1) % this.homepageImages.length;
    this.currentImg = this.homepageImages[this.currentIndex];
  }
  
}
