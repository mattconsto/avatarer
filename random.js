function xfnv1a(str) {
	for(var i = 0, h = 2166136261 >>> 0; i < str.length; i++)
		h = Math.imul(h ^ str.charCodeAt(i), 16777619);
	return function() {
		h += h << 13; h ^= h >>> 7;
		h += h << 3;  h ^= h >>> 17;
		return (h += h << 5) >>> 0;
	}
}

function sfc32(a, b, c, d) {
	return function() {
		a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
		var t = (a + b) | 0;
		a = b ^ b >>> 9;
		b = c + (c << 3) | 0;
		c = (c << 21 | c >>> 11);
		d = d + 1 | 0;
		t = t + d | 0;
		c = c + t | 0;
		return (t >>> 0) / 4294967296;
	}
}
