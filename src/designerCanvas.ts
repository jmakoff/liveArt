import { saveAs } from 'file-saver';

import { Rect, Triangle, Circle, Text} from './objects.ts';

export class DesignerCanvas {
  public canvas;
  private width = 400;
  private height = 400;
  private MAX_HISTORY_LENGTH = 10; // max count of snapshots;
  public list = [];
  public history = {
    snapshots: [];
    listObjects:[]
    current: null;
  }
  public activeObject = {
    id: null,
    type: null,
    obj: null,
  };

  constructor() {
    this.canvas = new fabric.Canvas("fabric-canvas");
    this.canvas.setHeight(this.width);
    this.canvas.setWidth(this.height);
    this.canvas.selection = false;

  this.canvas.on('mouse:down', e => {
    this.setActiveObject(e.target);
    this.saveSnapshot();
  });

  private setActiveObject(object) {
    const o = this.list.find(it => JSON.stringify(it.obj) === JSON.stringify(object));
    if (!o) {
      return
    }
    this.activeObject.id = o.id
    this.activeObject.type = o.type
    this.activeObject.obj = o.obj
    )
  }

  private addToList(type: string, obj: obj) {
    const ids = this.list.map(it => it.id);
    const id = ids.length ? Math.max(...ids) + 1 : 1;
    this.list.push({id, type, obj});
  }

  private removeFromList(object) {
    const indexToRemove = this.list.findIndex(it => JSON.stringify(it.obj) == JSON.stringify(object))
    this.list.splice(indexToRemove, 1);
  }

  private useSnapshot(json, listObjects){
    this.list.splice(0, this.list.length, ...listObjects);
    this.canvas.loadFromJSON(json);
  }

  public saveSnapshot() {
    if (this.history.snapshots.length >= this.MAX_HISTORY_LENGTH){
      this.history.snapshots.shift();
      this.history.listObjects.shift();
    }

    this.history.listObjects.push([...this.list]);
    this.history.snapshots.push(this.canvas.toJSON());
    this.history.current = this.history.snapshots.length - 1;
  }

  public rollback() {
    if(this.history.current === 0) {
      return
    }
    if (!this.history.current) {
      this.history.current = this.history.snapshots.length-1
    } else {
      --this.history.current
    }
    this.useSnapshot(this.history.snapshots[this.history.current], this.history.listObjects[this.history.current]);
  }

  public forward() {
    if (this.history.current >= this.history.snapshots.length-1) {
      return
    }
    ++this.history.current
    this.useSnapshot(this.history.snapshots[this.history.current], this.history.listObjects[this.history.current]);
  }

  public addRect(color: string, angle: number) {
    const rect = new Rect(color, angle);
    this.addToList('Rectangle', rect);
    this.canvas.add(rect);
    this.saveSnapshot();
  }

  public addTriangle(color: string, angle: number) {
    const triangle = new Triangle(color, angle);
    this.addToList('Triangle', triangle);
    this.canvas.add(triangle);
    this.saveSnapshot();
  }

  public setFont(font: string) {
    const activeObject = this.canvas.getActiveObject();
  }

  public addCircle(color: string, radius: number) {
      const circle = new Circle(color, radius);
      this.addToList('Circle', circle);
      this.canvas.add(circle);
      this.saveSnapshot();
    }

  public addText(text, options) {
    const text = new Text(text, options);
    this.addToList('Text', text);
    this.canvas.add(text);
    this.saveSnapshot();
  }

  public remove(object) {
    this.canvas.remove(object);
    this.removeFromList(object);
    this.saveSnapshot();
  }

  public toBack(object) {
    object.sendToBack();
    this.saveSnapshot();
  }

  public toFront(object) {
    object.bringToFront();
    this.saveSnapshot();
  }

  public addImageByURL(imageURL) {
    fabric.Image.fromURL(imageURL, oImg => {
      oImg.scaleToHeight(100);
      oImg.scaleToWidth(100);
      this.canvas.add(oImg);
      this.addToList('Image', oImg);
      this.saveSnapshot();
    })
  }

  public exportSVG() {
    const svg = this.canvas.toSVG()
    const blob = new Blob([svg], {type: 'image/svg+xml'})
    saveAs(blob, 'canvas.svg')
  }

  public importSVG(svgURL) {
    fabric.loadSVGFromURL(svgURL, (objects, options) => {
      const obj = fabric.util.groupSVGElements(objects, options);
      obj.scaleToHeight(300);
      obj.scaleToWidth(300);
      this.list.splice(0, this.list.length);
      this.canvas.clear();
      this.canvas.add(obj).renderAll();
    })
  }
}

export default DesignerCanvas;
