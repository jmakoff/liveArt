import DesignerCanvas from "`./designerCanvas";

class Objects {
	private size = 100;

  constructor () {
  }

}

export class Rect extends Objects {
	constructor(color: string, angle: number) {
		super('rect')
		return new fabric.Rect({
        fill: color,
        height: this.size,
        width: this.size,
        top: 100,
        left: 100,
        angle: angle
      })
	}
}

export class Triangle extends Objects {
	constructor(color: string, angle: number) {
		super();
		return new fabric.Triangle({
        fill: color,
        height: this.size,
        width: this.size,
        top: 100,
        left: 100,
        angle: angle
      })
	}
}

export class Circle extends Objects {
	constructor(color, radius) {
		super();
		return new fabric.Circle({
			fill: color,
			radius,
			top: 20,
			left: 20
		})
	}
}

export class Text extends Objects {
	constructor(text, options) {
		super();
		return new fabric.Text(text, options)
	}
}