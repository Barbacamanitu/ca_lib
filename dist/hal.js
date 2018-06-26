import frag from './shaders/frag.glsl';
export class HAL {
    constructor(size) {
        this.size = size;
        //Create context
        let canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        this.gl = canvas.getContext("webgl");
        this.createDataTexture();
        this.createBuffers();
        this.createProgram();
    }
    createBuffers() {
        let gl = this.gl;
        var vertices = [
            -0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0
        ];
        let indices = [3, 2, 1, 3, 1, 0];
        // Create an empty buffer object to store vertex buffer
        var vertex_buffer = gl.createBuffer();
        // Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        // Pass the vertex data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        // Unbind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        // Create an empty buffer object to store Index buffer
        var Index_Buffer = gl.createBuffer();
        // Bind appropriate array buffer to it
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
        // Pass the vertex data to the buffer
        let eab = new Uint16Array(indices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, eab, gl.STATIC_DRAW);
        // Unbind the buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.eab = eab;
    }
    createProgram() {
        let program = this.gl.createProgram();
        let gl = this.gl;
        let fragS = gl.createShader(gl.FRAGMENT_SHADER);
        let vertS = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(fragS, frag);
        gl.compileShader(fragS);
        let info = gl.getShaderInfoLog(fragS);
        console.log("Program creation:");
        console.log(info);
    }
    createDataTexture() {
        let gl = this.gl;
        let data = new Uint8Array(this.size.x * this.size.y);
        let tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        const level = 0;
        const internalFormat = gl.LUMINANCE;
        const width = this.size.x;
        const height = this.size.y;
        const border = 0;
        const format = gl.LUMINANCE;
        const type = gl.UNSIGNED_BYTE;
        const alignment = 1;
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
        // set the filtering so we don't need mips and it's not filtered
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.dataTexture = tex;
        console.log("Created data texture");
    }
}
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
