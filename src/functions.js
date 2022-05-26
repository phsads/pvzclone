function random(a,b) {
	return Math.random()*(b-a)+a
}
function intRandom(a,b) {
	return round(random(a,b))
}
var round = Math.round
var ceil = Math.ceil
var floor = Math.floor
function seedRandom(a) { //random function
    var r=[seed],h=0
    while (h<70) {
        h++
        r[h] = ( (a**1.1+seed**0.7-7*a+21)*r[h-1] )%1
    }
    return r[70]
}
function overflowRange(min, max, n) {
	var size = max-min+1
	if (n>max) return min+(n-max)%size
	else if (n<min) return max+(n-min)%size
	else return n 
}
function weighted_random(a) {
	//a = {"2":weight}
	var b,c=0,d
	for (b of a) c += b
	d = Math.random()*c
	for (b in a) {
		if (d < a[b]) return b
		d -= a[b]
	}
}
function anti_weighted_random(a) {
        for (let n in a) {
                a[n] = 1/a[n]
        }
        return weighted_random(a)
}
function cloneObj(t) {
	var clone
	if (typeof t == "object") {
		if (t.toString()[0] = "[") clone = {}
		else clone = []
		for (let k in t) {
			if (k == "canvas") continue
			if (typeof t[k] == "object") clone[k] = cloneObj(t[k])
			else clone[k] = t[k]
		}
	} else {
		clone = t 
	}
	return clone
}
var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

//mous
var mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var click = Array(9).fill(0)
var clickBuffer = Array(9).fill(0)
document.body.onmousedown=function(evt){mouseDown[evt.button]=1}
document.body.onmouseup=function(evt){mouseDown[evt.button]=0}
function getMousePos(e) {
	var t = canvas.getBoundingClientRect()
	mousePos = [e.clientX - t.left,e.clientY - t.top]
	return mousePos
}
