import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {element} from 'protractor';


interface ISvgPath {
  d:ISvgDPathItem[]
  attributes?:{ [attr:string]:string }
}

interface ISvgDPathItem {
  t:'M' | 'l' | 'L'
  x:number;
  y:number;

}

enum DrawMode {
  Pointer,
  DrawPath
}


const SVGPathAttributes = ['fill', 'stroke', 'stroke-width'];

const defaultPathTemplate:ISvgPath = {
  d:[],
  attributes:{
    fill:'none',
    stroke:'#000',
    'stroke-width':'1'
  }
};

type TSVGElement = ISvgPath;

enum DrawCommandType {
  Path = 'Path'
}

class DrawCommand {
  type:DrawCommandType;
  data:TSVGElement;
  el:SVGGraphicsElement;

  remove() {
    if (this.el) {
      this.parent.removeChild(this.el);
    }
    this.el = null;
  }

  constructor(private parent:SVGGraphicsElement) {

  }
}

@Directive({
  selector:'[appSvgonsty]'
})
export class SvgonstyDirective implements OnInit {


  stack:DrawCommand[] = [];
  redo:DrawCommand[] = [];


  path:ISvgPath = {
    d:[
      {t:'M', x:10, y:10},
      {t:'l', x:50, y:10},
      {t:'l', x:50, y:50},
      {t:'l', x:10, y:50}

    ]
  };

  svg;

  currentPath;

  drawMode:DrawMode = DrawMode.Pointer;

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
  }

  ngOnInit() {
    let el = this.elementRef.nativeElement as HTMLElement;
    let bounding = el.getBoundingClientRect();

    this.svg = this.renderer.createElement(`svg`, 'svg');
    this.renderer.setAttribute(this.svg, 'width', bounding.width.toString());
    this.renderer.setAttribute(this.svg, 'height', bounding.height.toString());


    const circle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle, 'cx', (bounding.width / 2).toString());
    this.renderer.setAttribute(circle, 'cy', (bounding.height / 2).toString());
    this.renderer.setAttribute(circle, 'r', (bounding.height / 5).toString());
    this.renderer.setAttribute(circle, 'fill', 'red');


    (this.svg as HTMLElement).addEventListener('mousemove', ev => {
      this.path.d.push({t:'L', x:ev.offsetX, y:ev.offsetY});
      if (this.drawMode === DrawMode.DrawPath) {
        //console.log(`mousemove ${ev.offsetX}, ${ev.offsetY}`);
        this.updatePathD(this.path);
      }
    });

    (this.svg as HTMLElement).addEventListener('mousedown', ev => {
      //console.log(`>>>>mousedown ${ev.offsetX}, ${ev.offsetY}`);
      this.path.d = [];
      this.path.d.push({t:'M', x:ev.offsetX, y:ev.offsetY});
      if (this.drawMode === DrawMode.Pointer) {
        this.drawMode = DrawMode.DrawPath;
        this.currentPath = this.createNewPath();
      }
    });

    (this.svg as HTMLElement).addEventListener('mouseup', ev => {
      //console.log(`>>>>mouseup ${ev.offsetX}, ${ev.offsetY}`);

      if (this.drawMode === DrawMode.DrawPath) {
        this.drawMode = DrawMode.Pointer;

        this.addToCommandStack();
      }
      this.path.d = [];
    });

    this.elementRef.nativeElement.addEventListener('keypress', ev => {
      if (ev.key === 'Backspace') {
        const item = this.stack.pop();
        if (item) {
          item.remove();
        }
        this.redo.push(item);
      }
    });

    this.currentPath = this.createNewPath();

    this.renderer.appendChild(this.svg, circle);
    this.renderer.appendChild(this.elementRef.nativeElement, this.svg);
  }


  private addToCommandStack(resetRedo:boolean = true) {
    const command = new DrawCommand(this.svg);
    command.el = this.currentPath;
    command.data = JSON.parse(JSON.stringify(this.path));

    let attributes = {};
    SVGPathAttributes.forEach(value => {
      const attr = (this.currentPath.attributes as NamedNodeMap).getNamedItem(value);
      if (attr) {
        attributes[value] = attr.value;
      }
    });

    command.data.attributes = {...command.data.attributes, ...attributes};
    this.stack.push(command);
    if (resetRedo) {
      this.redo = [];
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event:KeyboardEvent) {
    // console.log(event);
    if (event.code === 'Backspace') {
      const command = this.stack.pop();
      if (command) {
        command.remove();
      }
      this.redo.push(command);
    } else if (event.code === 'Space' && this.redo.length) {
      const command = this.redo.pop();
      this.path = command.data;
      this.currentPath = this.createNewPath(command.data);
      this.updatePathD(this.path);
      this.addToCommandStack(false);

    }


  }

  private createNewPath(template:ISvgPath = defaultPathTemplate) {
    const path = this.renderer.createElement('path', 'svg');

    for (let attrb in template.attributes) {
      this.renderer.setAttribute(path, attrb, template.attributes[attrb]);
    }

    this.renderer.appendChild(this.svg, path);
    return path;
  }

  updatePathD(data:ISvgPath) {
    let dElm = data.d.reduce((p, c) => {
      return p += `${c.t}${c.x} ${c.y} `;
    }, '');
    this.renderer.setAttribute(this.currentPath, 'd', dElm);
  }
}
