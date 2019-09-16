import { Component, Input, EventEmitter ,Output } from '@angular/core';

enum COLORS {
  GREY = "#9DA3A4",
  GREEN = "#1EBEA5",
  YELLOW = "#FFCA28",
  RED = "#DD2C00",
  WARN = "#F44336",
  ACCENT = "#FF4081"
}

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

export class RatingComponent {
  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;

  constructor() {}
  /*
   function used to change the value of our rating 
   triggered when user, clicks a star to change the rating
  */
  rate(index: number) {
      this.rating = index;
      this.ratingChange.emit(this.rating);
  }

  /* function to return the color of a star based on what
    index it is. All stars greater than the index are assigned
    a grey color , while those equal or less than the rating are
    assigned a color depending on the rating. Using the following criteria:

        1-2 stars: red
        3 stars  : yellow
        4-5 stars: green 
  */
  getColor(index: number) {
      if (this.isAboveRating(index)) {
        return COLORS.GREY;
      }
      switch (this.rating) {
        case 1:
          return COLORS.RED;
        case 2:
          return COLORS.WARN;
        case 3:
          return COLORS.YELLOW;
        case 4:
          return COLORS.GREEN;
        case 5:
          return COLORS.ACCENT;
        default:
          return COLORS.GREY;
      }
  }
  // returns whether or not the selected index is above ,the current rating
  // function is called from the getColor function.
  isAboveRating(index: number): boolean {
    return index > this.rating;
  }
}
