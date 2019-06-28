import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

interface ISvgCircle{
  attributes:{ [attr:string]:string|number }
}

interface ISvgPath {
  d:ISvgDPathItem[]
  attributes?:{ [attr:string]:string }
}

interface ISvgDPathItem {
  t:'M' | 'l' | 'L' | string
  x:number;
  y:number;

}

enum DrawMode {
  Pointer,
  DrawPath,
  DrawCircle,
  DrawSquare

}



const defaultPathTemplate:ISvgPath = {
  d:[],
  attributes:{
    fill:'none',
    stroke:'#000',
    'stroke-width':'1'
  }
};

const recorderTestCommands = [

  {
  'parent':null, 'el':null, 'type':'Path', 'data':{
    'd':[{'t':'M', 'x':39, 'y':42}, {'t':'L', 'x':39, 'y':42}, {'t':'L', 'x':39, 'y':42}, {
      't':'L',
      'x':40,
      'y':42
    }, {'t':'L', 'x':41, 'y':42}, {'t':'L', 'x':42, 'y':43}, {'t':'L', 'x':43, 'y':43}, {
      't':'L',
      'x':43,
      'y':43
    }, {'t':'L', 'x':44, 'y':43}, {'t':'L', 'x':44, 'y':43}, {'t':'L', 'x':45, 'y':44}, {
      't':'L',
      'x':45,
      'y':44
    }, {'t':'L', 'x':45, 'y':44}, {'t':'L', 'x':46, 'y':44}, {'t':'L', 'x':46, 'y':44}, {
      't':'L',
      'x':46,
      'y':44
    }, {'t':'L', 'x':47, 'y':44}, {'t':'L', 'x':47, 'y':44}, {'t':'L', 'x':47, 'y':44}, {
      't':'L',
      'x':48,
      'y':44
    }, {'t':'L', 'x':48, 'y':44}, {'t':'L', 'x':48, 'y':44}, {'t':'L', 'x':49, 'y':44}, {
      't':'L',
      'x':49,
      'y':44
    }, {'t':'L', 'x':49, 'y':44}, {'t':'L', 'x':50, 'y':44}, {'t':'L', 'x':50, 'y':44}, {
      't':'L',
      'x':50,
      'y':44
    }, {'t':'L', 'x':51, 'y':44}, {'t':'L', 'x':51, 'y':44}, {'t':'L', 'x':51, 'y':45}, {
      't':'L',
      'x':52,
      'y':45
    }, {'t':'L', 'x':52, 'y':45}, {'t':'L', 'x':53, 'y':45}, {'t':'L', 'x':53, 'y':45}, {
      't':'L',
      'x':54,
      'y':46
    }, {'t':'L', 'x':54, 'y':46}, {'t':'L', 'x':55, 'y':46}, {'t':'L', 'x':55, 'y':46}, {
      't':'L',
      'x':55,
      'y':46
    }, {'t':'L', 'x':56, 'y':46}, {'t':'L', 'x':56, 'y':46}, {'t':'L', 'x':56, 'y':46}, {'t':'L', 'x':56, 'y':46}],
    'attributes':{'fill':'none', 'stroke':'#000', 'stroke-width':'1'}
  }
},
  {
  'parent':null,
  'el':null,
  'type':'Path',
  'data':{
    'd':[{'t':'M', 'x':47, 'y':29}, {'t':'L', 'x':47, 'y':30}, {'t':'L', 'x':47, 'y':30}, {
      't':'L',
      'x':47,
      'y':31
    }, {'t':'L', 'x':47, 'y':32}, {'t':'L', 'x':47, 'y':32}, {'t':'L', 'x':47, 'y':33}, {
      't':'L',
      'x':47,
      'y':33
    }, {'t':'L', 'x':47, 'y':35}, {'t':'L', 'x':47, 'y':35}, {'t':'L', 'x':47, 'y':36}, {
      't':'L',
      'x':47,
      'y':36
    }, {'t':'L', 'x':47, 'y':37}, {'t':'L', 'x':47, 'y':37}, {'t':'L', 'x':47, 'y':38}, {
      't':'L',
      'x':47,
      'y':38
    }, {'t':'L', 'x':47, 'y':38}, {'t':'L', 'x':47, 'y':39}, {'t':'L', 'x':47, 'y':39}, {
      't':'L',
      'x':47,
      'y':39
    }, {'t':'L', 'x':47, 'y':40}, {'t':'L', 'x':47, 'y':40}, {'t':'L', 'x':47, 'y':40}, {
      't':'L',
      'x':47,
      'y':40
    }, {'t':'L', 'x':48, 'y':40}, {'t':'L', 'x':48, 'y':40}, {'t':'L', 'x':48, 'y':40}],
    'attributes':{'fill':'none', 'stroke':'#000', 'stroke-width':'1'}
  }
},
  {
  'parent':null,
  'el':null,
  'type':'Path',
  'data':{
    'd':[{'t':'M', 'x':67, 'y':34}, {'t':'L', 'x':67, 'y':34}, {'t':'L', 'x':66, 'y':34}, {
      't':'L',
      'x':66,
      'y':34
    }, {'t':'L', 'x':66, 'y':34}, {'t':'L', 'x':65, 'y':34}, {'t':'L', 'x':65, 'y':34}, {
      't':'L',
      'x':65,
      'y':34
    }, {'t':'L', 'x':64, 'y':34}, {'t':'L', 'x':64, 'y':33}, {'t':'L', 'x':63, 'y':33}, {
      't':'L',
      'x':62,
      'y':33
    }, {'t':'L', 'x':62, 'y':33}, {'t':'L', 'x':61, 'y':33}, {'t':'L', 'x':60, 'y':32}, {
      't':'L',
      'x':60,
      'y':32
    }, {'t':'L', 'x':58, 'y':32}, {'t':'L', 'x':58, 'y':32}, {'t':'L', 'x':57, 'y':31}, {
      't':'L',
      'x':56,
      'y':31
    }, {'t':'L', 'x':56, 'y':31}, {'t':'L', 'x':56, 'y':30}, {'t':'L', 'x':55, 'y':30}, {
      't':'L',
      'x':55,
      'y':30
    }, {'t':'L', 'x':55, 'y':30}, {'t':'L', 'x':55, 'y':30}, {'t':'L', 'x':55, 'y':30}, {
      't':'L',
      'x':55,
      'y':29
    }, {'t':'L', 'x':55, 'y':29}, {'t':'L', 'x':55, 'y':29}, {'t':'L', 'x':55, 'y':29}, {
      't':'L',
      'x':55,
      'y':29
    }, {'t':'L', 'x':56, 'y':29}, {'t':'L', 'x':56, 'y':29}],
    'attributes':{'fill':'none', 'stroke':'#000', 'stroke-width':'1'}
  }
},
  {
  'parent':null,
  'el':null,
  'type':'Path',
  'data':{
    'd':[{'t':'M', 'x':37, 'y':33}, {'t':'L', 'x':37, 'y':33}, {'t':'L', 'x':38, 'y':33}, {
      't':'L',
      'x':38,
      'y':33
    }, {'t':'L', 'x':38, 'y':33}, {'t':'L', 'x':39, 'y':33}, {'t':'L', 'x':39, 'y':33}, {
      't':'L',
      'x':39,
      'y':33
    }, {'t':'L', 'x':39, 'y':33}, {'t':'L', 'x':39, 'y':33}, {'t':'L', 'x':40, 'y':33}, {
      't':'L',
      'x':40,
      'y':32
    }, {'t':'L', 'x':40, 'y':32}, {'t':'L', 'x':41, 'y':32}, {'t':'L', 'x':41, 'y':31}, {
      't':'L',
      'x':41,
      'y':31
    }, {'t':'L', 'x':41, 'y':31}, {'t':'L', 'x':41, 'y':31}, {'t':'L', 'x':42, 'y':30}, {
      't':'L',
      'x':42,
      'y':30
    }, {'t':'L', 'x':42, 'y':30}, {'t':'L', 'x':42, 'y':30}, {'t':'L', 'x':42, 'y':30}],
    'attributes':{'fill':'none', 'stroke':'#000', 'stroke-width':'1'}
  }
},
  {
  'parent':null, 'el':null, 'type':'Path', 'data':{
    'd':[{'t':'M', 'x':24, 'y':21}, {'t':'L', 'x':25, 'y':21}, {'t':'L', 'x':26, 'y':21}, {
      't':'L',
      'x':28,
      'y':21
    }, {'t':'L', 'x':31, 'y':20}, {'t':'L', 'x':33, 'y':20}, {'t':'L', 'x':36, 'y':19}, {
      't':'L',
      'x':40,
      'y':19
    }, {'t':'L', 'x':42, 'y':19}, {'t':'L', 'x':44, 'y':19}, {'t':'L', 'x':47, 'y':19}, {
      't':'L',
      'x':50,
      'y':19
    }, {'t':'L', 'x':52, 'y':19}, {'t':'L', 'x':55, 'y':19}, {'t':'L', 'x':56, 'y':19}, {
      't':'L',
      'x':58,
      'y':19
    }, {'t':'L', 'x':59, 'y':19}, {'t':'L', 'x':60, 'y':19}, {'t':'L', 'x':61, 'y':19}, {
      't':'L',
      'x':62,
      'y':19
    }, {'t':'L', 'x':63, 'y':19}, {'t':'L', 'x':64, 'y':19}, {'t':'L', 'x':65, 'y':19}, {
      't':'L',
      'x':67,
      'y':19
    }, {'t':'L', 'x':68, 'y':19}, {'t':'L', 'x':70, 'y':19}, {'t':'L', 'x':71, 'y':19}, {
      't':'L',
      'x':73,
      'y':20
    }, {'t':'L', 'x':74, 'y':20}, {'t':'L', 'x':75, 'y':20}, {'t':'L', 'x':75, 'y':20}, {
      't':'L',
      'x':76,
      'y':21
    }, {'t':'L', 'x':76, 'y':21}, {'t':'L', 'x':76, 'y':21}, {'t':'L', 'x':77, 'y':21}, {
      't':'L',
      'x':77,
      'y':21
    }, {'t':'L', 'x':77, 'y':22}, {'t':'L', 'x':77, 'y':22}, {'t':'L', 'x':77, 'y':22}, {
      't':'L',
      'x':77,
      'y':23
    }, {'t':'L', 'x':77, 'y':23}, {'t':'L', 'x':77, 'y':23}, {'t':'L', 'x':77, 'y':24}, {
      't':'L',
      'x':77,
      'y':24
    }, {'t':'L', 'x':77, 'y':24}, {'t':'L', 'x':76, 'y':25}, {'t':'L', 'x':76, 'y':26}, {
      't':'L',
      'x':76,
      'y':28
    }, {'t':'L', 'x':76, 'y':29}, {'t':'L', 'x':76, 'y':31}, {'t':'L', 'x':76, 'y':33}, {
      't':'L',
      'x':76,
      'y':35
    }, {'t':'L', 'x':76, 'y':37}, {'t':'L', 'x':76, 'y':38}, {'t':'L', 'x':76, 'y':40}, {
      't':'L',
      'x':76,
      'y':41
    }, {'t':'L', 'x':76, 'y':42}, {'t':'L', 'x':76, 'y':42}, {'t':'L', 'x':76, 'y':43}, {
      't':'L',
      'x':76,
      'y':43
    }, {'t':'L', 'x':76, 'y':44}, {'t':'L', 'x':76, 'y':44}, {'t':'L', 'x':76, 'y':45}, {
      't':'L',
      'x':76,
      'y':45
    }, {'t':'L', 'x':76, 'y':45}, {'t':'L', 'x':76, 'y':46}, {'t':'L', 'x':76, 'y':46}, {
      't':'L',
      'x':76,
      'y':47
    }, {'t':'L', 'x':76, 'y':47}, {'t':'L', 'x':76, 'y':47}, {'t':'L', 'x':76, 'y':48}, {
      't':'L',
      'x':76,
      'y':48
    }, {'t':'L', 'x':76, 'y':48}, {'t':'L', 'x':76, 'y':48}, {'t':'L', 'x':76, 'y':49}, {
      't':'L',
      'x':76,
      'y':49
    }, {'t':'L', 'x':76, 'y':49}, {'t':'L', 'x':76, 'y':49}, {'t':'L', 'x':75, 'y':49}, {
      't':'L',
      'x':75,
      'y':50
    }, {'t':'L', 'x':75, 'y':50}, {'t':'L', 'x':75, 'y':50}, {'t':'L', 'x':75, 'y':51}, {
      't':'L',
      'x':75,
      'y':51
    }, {'t':'L', 'x':75, 'y':51}, {'t':'L', 'x':75, 'y':52}, {'t':'L', 'x':75, 'y':52}, {
      't':'L',
      'x':75,
      'y':52
    }, {'t':'L', 'x':75, 'y':52}, {'t':'L', 'x':75, 'y':52}, {'t':'L', 'x':74, 'y':52}, {
      't':'L',
      'x':74,
      'y':52
    }, {'t':'L', 'x':74, 'y':52}, {'t':'L', 'x':73, 'y':52}, {'t':'L', 'x':73, 'y':52}, {
      't':'L',
      'x':72,
      'y':52
    }, {'t':'L', 'x':72, 'y':52}, {'t':'L', 'x':72, 'y':52}, {'t':'L', 'x':71, 'y':52}, {
      't':'L',
      'x':71,
      'y':52
    }, {'t':'L', 'x':70, 'y':52}, {'t':'L', 'x':70, 'y':52}, {'t':'L', 'x':69, 'y':52}, {
      't':'L',
      'x':69,
      'y':52
    }, {'t':'L', 'x':68, 'y':52}, {'t':'L', 'x':68, 'y':52}, {'t':'L', 'x':67, 'y':52}, {
      't':'L',
      'x':65,
      'y':52
    }, {'t':'L', 'x':64, 'y':52}, {'t':'L', 'x':62, 'y':52}, {'t':'L', 'x':61, 'y':52}, {
      't':'L',
      'x':59,
      'y':52
    }, {'t':'L', 'x':56, 'y':52}, {'t':'L', 'x':55, 'y':52}, {'t':'L', 'x':52, 'y':52}, {
      't':'L',
      'x':49,
      'y':53
    }, {'t':'L', 'x':47, 'y':53}, {'t':'L', 'x':45, 'y':53}, {'t':'L', 'x':43, 'y':53}, {
      't':'L',
      'x':40,
      'y':53
    }, {'t':'L', 'x':38, 'y':53}, {'t':'L', 'x':37, 'y':53}, {'t':'L', 'x':35, 'y':53}, {
      't':'L',
      'x':34,
      'y':53
    }, {'t':'L', 'x':33, 'y':53}, {'t':'L', 'x':32, 'y':53}, {'t':'L', 'x':31, 'y':53}, {
      't':'L',
      'x':31,
      'y':53
    }, {'t':'L', 'x':31, 'y':53}, {'t':'L', 'x':30, 'y':53}, {'t':'L', 'x':30, 'y':53}, {
      't':'L',
      'x':30,
      'y':53
    }, {'t':'L', 'x':29, 'y':53}, {'t':'L', 'x':29, 'y':53}, {'t':'L', 'x':29, 'y':53}, {
      't':'L',
      'x':28,
      'y':53
    }, {'t':'L', 'x':28, 'y':53}, {'t':'L', 'x':28, 'y':53}, {'t':'L', 'x':28, 'y':53}, {
      't':'L',
      'x':27,
      'y':53
    }, {'t':'L', 'x':27, 'y':53}, {'t':'L', 'x':27, 'y':53}, {'t':'L', 'x':26, 'y':53}, {
      't':'L',
      'x':26,
      'y':52
    }, {'t':'L', 'x':26, 'y':52}, {'t':'L', 'x':26, 'y':52}, {'t':'L', 'x':26, 'y':51}, {
      't':'L',
      'x':26,
      'y':51
    }, {'t':'L', 'x':26, 'y':51}, {'t':'L', 'x':26, 'y':50}, {'t':'L', 'x':26, 'y':50}, {
      't':'L',
      'x':26,
      'y':50
    }, {'t':'L', 'x':26, 'y':49}, {'t':'L', 'x':26, 'y':49}, {'t':'L', 'x':26, 'y':49}, {
      't':'L',
      'x':26,
      'y':48
    }, {'t':'L', 'x':26, 'y':48}, {'t':'L', 'x':26, 'y':48}, {'t':'L', 'x':26, 'y':47}, {
      't':'L',
      'x':26,
      'y':47
    }, {'t':'L', 'x':26, 'y':46}, {'t':'L', 'x':26, 'y':46}, {'t':'L', 'x':26, 'y':45}, {
      't':'L',
      'x':26,
      'y':45
    }, {'t':'L', 'x':26, 'y':44}, {'t':'L', 'x':26, 'y':44}, {'t':'L', 'x':26, 'y':43}, {
      't':'L',
      'x':26,
      'y':43
    }, {'t':'L', 'x':26, 'y':41}, {'t':'L', 'x':26, 'y':41}, {'t':'L', 'x':26, 'y':40}, {
      't':'L',
      'x':26,
      'y':39
    }, {'t':'L', 'x':26, 'y':38}, {'t':'L', 'x':26, 'y':37}, {'t':'L', 'x':26, 'y':36}, {
      't':'L',
      'x':26,
      'y':36
    }, {'t':'L', 'x':26, 'y':35}, {'t':'L', 'x':26, 'y':34}, {'t':'L', 'x':26, 'y':33}, {
      't':'L',
      'x':27,
      'y':33
    }, {'t':'L', 'x':27, 'y':32}, {'t':'L', 'x':27, 'y':32}, {'t':'L', 'x':27, 'y':31}, {
      't':'L',
      'x':28,
      'y':31
    }, {'t':'L', 'x':28, 'y':30}, {'t':'L', 'x':28, 'y':29}, {'t':'L', 'x':28, 'y':29}, {
      't':'L',
      'x':28,
      'y':28
    }, {'t':'L', 'x':28, 'y':27}, {'t':'L', 'x':29, 'y':27}, {'t':'L', 'x':29, 'y':26}, {
      't':'L',
      'x':29,
      'y':26
    }, {'t':'L', 'x':29, 'y':26}, {'t':'L', 'x':29, 'y':25}, {'t':'L', 'x':29, 'y':25}, {
      't':'L',
      'x':29,
      'y':24
    }, {'t':'L', 'x':29, 'y':24}, {'t':'L', 'x':29, 'y':23}, {'t':'L', 'x':29, 'y':23}, {
      't':'L',
      'x':29,
      'y':22
    }, {'t':'L', 'x':29, 'y':22}, {'t':'L', 'x':29, 'y':21}, {'t':'L', 'x':29, 'y':21}, {
      't':'L',
      'x':29,
      'y':21
    }, {'t':'L', 'x':29, 'y':22}], 'attributes':{'fill':'none', 'stroke':'#000', 'stroke-width':'1'}
  }
},
  {"type":"Circle","data":{"attributes":{"cx":"328","cy":"131","r":"71.69379331573968"}}}
];

type TSVGElement = ISvgPath|ISvgCircle;

enum DrawCommandType {
  Path = 'Path',
  Circle = 'Circle',
  Square = 'Square'
}

interface IDrawCommand {
  type:DrawCommandType|string;
  data:TSVGElement;
}

class DrawCommand implements IDrawCommand {
  type:DrawCommandType;
  data:TSVGElement;
  el:SVGGraphicsElement;

  setTypeByDrawMode(mode:DrawMode) {
    switch (mode) {
      case DrawMode.DrawPath:
        this.type = DrawCommandType.Path;
        break;
      case DrawMode.DrawCircle:
        this.type = DrawCommandType.Circle;
        break;
      case DrawMode.DrawSquare:
        this.type = DrawCommandType.Square;
        break;
    }
  }

  getDrawMode():DrawMode {
    switch (this.type) {
      case DrawCommandType.Path:
        return DrawMode.DrawPath;
      case DrawCommandType.Circle:
        return DrawMode.DrawCircle;
      case DrawCommandType.Square:
        return DrawMode.DrawSquare;
    }
  }

  remove() {
    if (this.el) {
      this.parent.removeChild(this.el);
    }
    this.el = null;
    this.parent = null;
  }

  constructor(private parent:SVGGraphicsElement) {
  }
}


abstract class AbstractDrawer {
  currentPath;
  drawMode:DrawMode;

  protected expectAttributes = ['fill', 'stroke', 'stroke-width'];

  constructor(protected renderer:Renderer2, protected parent:SVGGraphicsElement) {}

  abstract getCommand();
  abstract startDrawing(x:number, y:number);
  abstract drawing(x:number, y:number);
  abstract playCommand(command:IDrawCommand);
}

class PathDrawer extends AbstractDrawer {
  path:ISvgPath = {
    d:[]
  };

  constructor(renderer:Renderer2, parent:SVGGraphicsElement){
    super(renderer, parent);
    this.drawMode = DrawMode.DrawPath;
  }

  getCommand(){
    const command = new DrawCommand(this.parent);
    command.el = this.currentPath;
    command.setTypeByDrawMode(this.drawMode);
    command.data = JSON.parse(JSON.stringify(this.path));

    let attributes = {};
    this.expectAttributes.forEach(value => {
      const attr = (this.currentPath.attributes as NamedNodeMap).getNamedItem(value);
      if (attr) {
        attributes[value] = attr.value;
      }
    });

    command.data.attributes = {...command.data.attributes, ...attributes};
    return command;
  }

  startDrawing(x:number, y:number) {
    this.path.d.push({t:'M', x: x, y: y});
    this.currentPath = this.createNewPath();
    this.updatePathD(this.path);
  }

  createNewPath(template:ISvgPath = defaultPathTemplate) {
    const path = this.renderer.createElement('path', 'svg');
    for (let attrb in template.attributes) {
      this.renderer.setAttribute(path, attrb, template.attributes[attrb]);
    }
    this.renderer.appendChild(this.parent, path);
    return path;
  }

  updatePathD(data:ISvgPath) {
    let dElm = data.d.reduce((p, c) => {
      return p += `${c.t}${c.x} ${c.y} `;
    }, '');
    this.renderer.setAttribute(this.currentPath, 'd', dElm);
  }

  drawing(x:number, y:number) {
    this.path.d.push({t:'L', x, y});
    this.updatePathD(this.path);
  }

  playCommand(command:IDrawCommand) {
    this.path = command.data as ISvgPath;
    this.currentPath = this.createNewPath(this.path);
    this.updatePathD(this.path);
  }
}


class CircleDrawer extends AbstractDrawer {

  constructor(renderer:Renderer2, parent:SVGGraphicsElement){
    super(renderer, parent);
    this.drawMode = DrawMode.DrawCircle;
    this.expectAttributes = ['cx', 'cy','r',...this.expectAttributes];
  }

  getCommand(){
    const command = new DrawCommand(this.parent);
    command.el = this.currentPath;
    command.setTypeByDrawMode(this.drawMode);
    command.data = {attributes:{}};

    let attributes = {};
    this.expectAttributes.forEach(value => {
      const attr = (this.currentPath.attributes as NamedNodeMap).getNamedItem(value);
      if (attr) {
        attributes[value] = attr.value;
      }
    });

    command.data.attributes = {...command.data.attributes, ...attributes};
    return command;
  }

  startDrawing(x:number, y:number) {
    this.createNewPath({attributes:{cx:x,cy:y,r:1, ...defaultPathTemplate.attributes}});
  }

  createNewPath(template:ISvgCircle) {
    this.currentPath = this.renderer.createElement('circle', 'svg');
    const attributes = template.attributes;
    this.setAttributes(attributes);
    this.renderer.appendChild(this.parent, this.currentPath);
  }


  private setAttributes(attributes:{ [attr:string]:string|number }) {
    for (let attrb in attributes) {
      this.renderer.setAttribute(this.currentPath, attrb, attributes[attrb].toString());
    }
  }

  drawing(x:number, y:number) {
    const cxAttr = (this.currentPath.attributes as NamedNodeMap).getNamedItem('cx');
    const cx = parseFloat(cxAttr.value);
    const cyAttr = (this.currentPath.attributes as NamedNodeMap).getNamedItem('cy');
    const cy = parseFloat(cyAttr.value);
    const r = Math.sqrt((x-cx)**2 +(y-cy)**2);
    this.setAttributes({r})
  }

  playCommand(command:IDrawCommand) {

     this.createNewPath(command.data as ISvgCircle);

  }
}


@Directive({
  selector:'[appSvgonsty]'
})
export class SvgonstyDirective implements OnInit {

  stack:DrawCommand[] = [];
  redo:DrawCommand[] = [];

  svg;

  drawMode:DrawMode = DrawMode.Pointer;
  toolDown:boolean = false;

  @Input() recordedCommands:DrawCommand[];

  private drawer:AbstractDrawer;
  private fontWidth;
  private menuDrawMode:DrawMode[] = [DrawMode.Pointer,DrawMode.DrawPath,DrawMode.DrawCircle,DrawMode.DrawSquare];

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
    //this.recordedCommands = recorderTestCommands;
  }

  calcFontWidth(){
   this.fontWidth = 20;
  }

  ngOnInit() {
    let el = this.elementRef.nativeElement as HTMLElement;
    let bounding = el.getBoundingClientRect();

    this.calcFontWidth();

    this.svg = this.renderer.createElement(`svg`, 'svg');
    this.renderer.setAttribute(this.svg, 'width', bounding.width.toString());
    this.renderer.setAttribute(this.svg, 'height', bounding.height.toString());


    const circle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle, 'cx', (bounding.width / 2).toString());
    this.renderer.setAttribute(circle, 'cy', (bounding.height / 2).toString());
    this.renderer.setAttribute(circle, 'r', (bounding.height / 5).toString());
    this.renderer.setAttribute(circle, 'fill', 'red');


    (this.svg as HTMLElement).addEventListener('mousemove', ev => {
      if (this.drawMode !== DrawMode.Pointer && this.toolDown) {
        this.drawning(ev);
      }
    });

    (this.svg as HTMLElement).addEventListener('mousedown', ev => {
      if (!this.toolDown && this.drawMode !== DrawMode.Pointer) {
        this.toolDown = true;
        this.startDrawing(ev);
      }
    });

    (this.svg as HTMLElement).addEventListener('mouseup', _ev => {
      if (this.drawMode !== DrawMode.Pointer && this.toolDown) {
        this.addToCommandStack();
        this.toolDown = false;
      }
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

    if (recorderTestCommands.length) {
      recorderTestCommands.forEach((command) => {
        this.playCommand(command);
      });
    }

    this.renderer.appendChild(this.svg, circle);
    this.renderer.appendChild(this.elementRef.nativeElement, this.svg);
  }

  private drawning(ev) {
    this.drawer.drawing(ev.offsetX, ev.offsetY);
  }

  private startDrawing(ev) {
    switch (this.drawMode) {
      case DrawMode.DrawPath: {
        this.drawer = new PathDrawer(this.renderer, this.svg);
        this.drawer.startDrawing(ev.offsetX, ev.offsetY);
      }
      break;
      case DrawMode.DrawCircle: {
        this.drawer = new CircleDrawer(this.renderer, this.svg);
        this.drawer.startDrawing(ev.offsetX, ev.offsetY);
      }
      break;
    }
  }

  private addToCommandStack(resetRedo:boolean = true) {
    const command = this.drawer.getCommand();
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
      this.playCommand(command);
    }
  }

  @HostListener('click',['$event'])
  onClick(event){
    if(event.offsetY < 0) {
      let offsetX = event.offsetX;
      let index = Math.floor(offsetX / this.fontWidth);
      this.drawMode = this.menuDrawMode[index];
    }
  }

  private playCommand(command:IDrawCommand) {
    switch (command.type) {
      case DrawCommandType.Path:{
        this.drawer = new PathDrawer(this.renderer,this.svg);
      }
      break;
      case DrawCommandType.Circle:{
        this.drawer = new CircleDrawer(this.renderer,this.svg);
      }
      break;

    }

    this.drawer.playCommand(command);
    this.addToCommandStack(false);
  }

}
