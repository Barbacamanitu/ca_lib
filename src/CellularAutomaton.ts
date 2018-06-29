export class Vec2 {
    x:number;
    y:number;
}

export class CellularAutomaton {
    gl: WebGLRenderingContext;
    size: Vec2;
    constructor(gl: WebGLRenderingContext, size: Vec2) {
        this.gl = gl;
        this.size = size;
    }
}