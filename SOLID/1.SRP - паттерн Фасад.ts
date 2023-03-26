
// # Фасад
// — сложная логика скрывается за вызовом более простого API.

//используем композицию, а не агрегацию для расширения свойств класса.
interface Figure {
  // [key: string]: number   //- он не позволяет быть другим полям
  data: number
  areaOf(): number
}


class Square implements Figure {
  data: number

  constructor(length: number) {
    this.data = length
  }

  areaOf(): number {
    return this.data ** 2
  }
}

class Circle implements Figure {
  data: number

  constructor(radius: number) {
    this.data = radius
  }

  areaOf(): number {
    return Math.PI * (this.data ** 2)
  }
}

// применение фасада
class ShapeFacade {
  square: Square
  circle: Circle

  constructor() {
    this.square = new Square(42)
    this.circle = new Circle(42)
  }

  areaOf(figure: string): number {
    switch (figure) {
      case 'square': return this.square.areaOf()
      case 'circle': return this.circle.areaOf()
      default: return 0
    }
  }
}



