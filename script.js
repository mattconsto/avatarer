// This code is *really* bad, but I am lazy
var input  = document.getElementById('input');
var output = document.getElementById('output');

var $svg = function(name, values, children) {
	var node = document.createElementNS('http://www.w3.org/2000/svg', name);
	for(var key in values) node.setAttribute(key, values[key]);
	for(var key in children) {
		var child = Array.isArray(children[key]) ?
			$svg.apply(null, children[key]) :
			document.createTextNode(children[key]);
		node.appendChild(child);
	}
	return node;
}

var avatarers = {
	circles: function(r) {
		var node = [];
		r.int();
		var circles = r.int(4) + 3;
		for(var i = 0; i < circles; i++) {
			node.push(['circle', {
				cx:r.int(128), cy:r.int(128), r:r.int(50), fill:r.color()
			}]);
		}
		return node;
	},
	squares: function(r) {
		var node = [];
		var circles = r.int(4) + 3;
		for(var i = 0; i < circles; i++) {
			node.push(['rect', {
				x:r.int(128),
				y:r.int(128),
				width:r.int(128),
				height:r.int(128),
				fill:r.color()
			}]);
		}
		return node;
	},
	letter: function(r) {
		return [
			['circle', {cx:64, cy:64, r:64, fill:r.color()}],
			['text', {
				x: 64,
				y: 96,
				'text-anchor': 'middle',
				'font-size': 100,
			}, [(r.input() ? r.input() : '?').substr(0, 1)]]
		];
	},
	gradient: function(r) {
		return [
			['defs', {}, [
				['linearGradient', {id:'g',x1:r.pc(),y1:r.pc(),x2:r.pc(),y2:r.pc()}, [
					['stop', {offset:'0%', 'stop-color':r.color()}],
					['stop', {offset:'100%', 'stop-color':r.color()}]
				]]
			]],
			['rect', {x:0, y:0, width:128, height:128, fill:'url(#g)'}]
		];
	},
	profile: function(r) {
		return [
			['path', {d: 'M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z', transform: 'scale(0.2) translate(96, 64)', fill:r.color()}],
		];
	},
	square: function(r) {
		return [
			['rect', {x:0, y:0, width:64, height:64, fill:r.color()}],
			['rect', {x:64, y:0, width:64, height:64, fill:r.color()}],
			['rect', {x:0, y:64, width:64, height:64, fill:r.color()}],
			['rect', {x:64, y:64, width:64, height:64, fill:r.color()}],
		];
	},
}

var placerer = function () {
	while(output.firstChild) output.removeChild(output.firstChild);
	var i = 0;
	for(var key in avatarers) {
		i += 1;
		var svg = $svg('svg',
			{height:'256px', width:'256px', viewBox:'0 0 128 128'},
			avatarers[key](srand(input.value))
		);
		output.appendChild(svg);
	}
}

window.addEventListener('load', function() {
	input.value = new Date;
	input.addEventListener('input', placerer);
	placerer();
});
