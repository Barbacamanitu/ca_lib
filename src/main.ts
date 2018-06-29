import {CellularAutomaton} from './CellularAutomaton';
  
window.addEventListener("load",(e) => {
    console.log("Loaded");
    let canvas = document.querySelector("#cvs") as HTMLCanvasElement;
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    window.onresize = () => {
        canvas.style.width = window.innerWidth + "px";
        setTimeout(() => {
            canvas.style.height = window.innerHeight + "px";
        }, 0);
    };
    window.onresize.call(this);

    let gl:WebGLRenderingContext = canvas.getContext("webgl");
    let ca:CellularAutomaton = new CellularAutomaton(gl,{x: 100, y: 100});

    console.log("###########################");
    console.log("Cellular Automaton:");
    console.log(ca);
    console.log("###########################");
});