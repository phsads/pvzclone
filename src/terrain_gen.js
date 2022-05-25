const size = 100;
const get_height    = function(x) {
    let k = 0;
    let u = x;
    for (let i = 0; i < u; i+=0.01) {
        if (u==x) u = Math.random();
        k = k + (u>k?1:-1)*(Math.max(Math.random(), u-k));
    }
    return Math.abs(k);
}
export const terrain_gen = function() {
    let height_map = Array.from(Array(size+1).keys(), _=>[Array.from(Array(size+1).keys(), __=>0)]); 

    for (let i of height_map) {
        for(let j = 0; j < size; j++) {
            i[j] = get_height(Math.random());
        }
    }
    return height_map;
};