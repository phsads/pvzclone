const size = 101;

class Vector2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    dot(other){
        return this.x*other.x + this.y*other.y;
    }
}

function Shuffle(tab){
    for(let e = tab.length-1; e > 0; e--){
        let index = round(Math.random()*(e-1)), temp  = tab[e];
        tab[e] = tab[index];
        tab[index] = temp;
    }
}

let P = (()=> {
    let p = Array.from(Array(256).keys());
    Shuffle(p);
    for(let i = 0; i < 256; i++)
        p.push(p[i]);
    return P;
}());

function GetConstantVector(v){
    let h = v & 3;
    let cv;
    switch (h):
        case 0:
            cv = new Vector2(1.0, 1.0);
            break;
        case 1:
            cv = new Vector2(-1.0, 1.0);
            break;
        case 2:
            cv = new Vector2(-1.0, -1.0);
            break;
        default:
            cv = new Vector2(1.0, -1.0);
            break;
    return cv;
}
const Fade = (t)=>{((6*t - 15)*t + 10)*t*t*t;}
const Lerp = (t, a1, a2)=>{a1 + t*(a2-a1);}

 const Noise2D = function(x, y) {

    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;

    let xf = x-Math.floor(x);
    let yf = y-Math.floor(y);

    let topRight = new Vector2(xf-1.0, yf-1.0);
    let topLeft = new Vector2(xf, yf-1.0);
    let bottomRight = new Vector2(xf-1.0, yf);
    let bottomLeft = new Vector2(xf, yf);

    //Select a value in the array for each of the 4 corners
    let valueTopRight = P[P[X+1]+Y+1];
    let valueTopLeft = P[P[X]+Y+1];
    let valueBottomRight = P[P[X+1]+Y];
    let valueBottomLeft = P[P[X]+Y];

    let u = Fade(xf);
    let v = Fade(yf);

    return Lerp(u,
        Lerp(v, 
             topRight.dot(GetConstantVector(valueTopRight));, 
             topLeft.dot(GetConstantVector(valueTopLeft));),
        Lerp(v, 
             bottomRight.dot(GetConstantVector(valueBottomRight));,
             bottomLeft.dot(GetConstantVector(valueBottomLeft));)
    );
}

const terrain_gen = function() {
    let height_map = Array.from(Array(size+1).keys(), _=>[Array.from(Array(size+1).keys(), __=>0)]); 
    
    for (let y = 0; y < size+1; y++){
        for (let x = 0; x < size+1; x++) {
            height_map[y][x] = (Noise2D(x*0.1, y*0.1)+1)/2;
        }
    }
    return height_map;
};
