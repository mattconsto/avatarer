if (!Math.imul) Math.imul = function(opA, opB) {
	opB |= 0; // ensure that opB is an integer. opA will automatically be coerced.
	// floating points give us 53 bits of precision to work with plus 1 sign bit
	// automatically handled for our convienence:
	// 1. 0x003fffff /*opA & 0x000fffff*/ * 0x7fffffff /*opB*/ = 0x1fffff7fc00001
	//    0x1fffff7fc00001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
	var result = (opA & 0x003fffff) * opB;
	// 2. We can remove an integer coersion from the statement above because:
	//    0x1fffff7fc00001 + 0xffc00000 = 0x1fffffff800001
	//    0x1fffffff800001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
	if (opA & 0xffc00000 /*!== 0*/) result += (opA & 0xffc00000) * opB |0;
	return result |0;
};

var srand = function(str) {
	var xfnv1a = function(str) {
		for(var i = 0, h = 2166136261 >>> 0; i < str.length; i++)
			h = Math.imul(h ^ str.charCodeAt(i), 16777619);
		return function() {
			h += h << 13; h ^= h >>> 7;
			h += h << 3;  h ^= h >>> 17;
			return (h += h << 5) >>> 0;
		}
	}

	// Create a xfnv1a state
	var seed = xfnv1a(str + '');

	var sfc32 = function(a, b, c, d) {
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

	// Use four 32-bit hashes to provide the seed for sfc32
	var r = sfc32(seed(), seed(), seed(), seed());

	function leftpad(n, w, z) {
		z = z || ' ';
		n = n + '';
		return n.length >= w ? n : new Array(w-n.length+1).join(z) + n;
	}

	return {
		color: function() {
			return '#' + leftpad(((r() * 0xffffff) & 0xffffff).toString(16), 6, '0');
		},
		fl: r,
		int: function(max) {return Math.floor(r() * (max + 1));},
		input: function() {return str},
		pc: function() {return Math.floor(r() * 101) + '%';},
	};
}

var rand = function() {
	// Yeah, I know...
	return srand(Math.random());
}
