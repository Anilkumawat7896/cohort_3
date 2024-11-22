class Rectangle {
  constructor(width, hight, color) {
    this.width = width;
    this.hight = hight;
    this.color = color;
  }

  area() {
    let area = this.width * this.hight;

    return area;
  }
  paint() {
    console.log(`Painting the Rectangle with ${this.color} color`);
  }
}

const rect1 = new Rectangle(10, 20, "Red");
console.log(rect1.area());
rect1.paint();
