
var css = '@import url(https://fonts.googleapis.com/css?family=Ubuntu);body,html{height:100%;padding:0;margin:0}.keyboard_wrap{position:fixed;z-index:99999999999999999;bottom:0;width:100%;height:28%;padding:10px;background-color:rgba(0,0,0,.7);display:none}.keyboard_close{position:absolute;right:20px;top:0;text-align:center;font-family:helvetica;font-weight:700;font-size:25px;line-height:30px;background-color:red;color:#fff;width:30px;height:35px}.key_,.key_space{font-weight:900;font-family:Ubuntu,sans-serif;cursor:pointer;color:#000;border-radius:3px;height:20px;padding:5px;margin:.5%;float:left;text-align:center}.key_{background-color:rgba(255,255,255,.7);width:7%}.key_:hover{background-color:#fff}.key_space{background-color:rgba(255,255,255,.7);width:22%}.float_kill{content:"";clear:both;display:table}#sh_keys{display:none}',
	head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet)
{
	style.styleSheet.cssText = css;
} 
else 
{
	style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

var state = 0;
var keyboard_ = document.createElement("div"); 
keyboard_.className = "keyboard_wrap";
keyboard_.id = "keyboard_wrap";
document.body.appendChild(keyboard_);
var keyboard_wrap = document.getElementById("keyboard_wrap");

// create close button
var close_btn = document.createElement("div"); 
close_btn.className = "keyboard_close";

keyboard_wrap.appendChild(close_btn);
close_btn.appendChild(document.createTextNode("x")); 

// close button
var x = document.getElementsByClassName("keyboard_close")[0];
x.onclick = function() 
{
	keyboard_wrap.style.display = "none"; 
}

function create_key(target,val)
{
	// translate current keyspace array code to its ascii compliment
	if(val === 15)
	{
		var ascii = "shift";
	}
	else if(val === 001)
	{
		var ascii = "back";
	}
	else 
	{
		var ascii = String.fromCharCode(val);
	}

	// create a new key div element
	var new_key = document.createElement("div"); 
	new_key.className = "key_";

	// set key text
	var set_key_val = document.createTextNode(ascii); 
	new_key.appendChild(set_key_val); 

	// insert new key	
	target.appendChild(new_key);
}

// create keyboard dom elements
function add_keys () 
{ 
	var reg_keys = document.createElement("div"); 
	reg_keys.id = "reg_keys";
	keyboard_wrap.appendChild(reg_keys);
	reg_keys = document.getElementById("reg_keys");

	var sh_keys = document.createElement("div"); 
	sh_keys.id = "sh_keys";
	keyboard_wrap.appendChild(sh_keys);
	sh_keys = document.getElementById("sh_keys");

	var key_space = [[ 49,  33],[ 50,  34],[ 51, 167],[ 52,  36],[ 53,  37],[ 54,  38],
					 [ 55,  47],[ 56,  40],[ 57,  41],[ 48,  61],[001, 001],[113,  81],
					 [119,  87],[101,  69],[114,  82],[116,  84],[122,  90],[117,  85],
					 [105,  73],[111,  79],[112,  80],[252, 220],[ 97,  65],[115,  83],
					 [100,  68],[102,  70],[103,  71],[104,  72],[106,  74],[107,  75],
					 [108,  76],[246, 214],[228, 196],[ 15,  15],[121,  89],[120,  88], 
					 [ 99,  67],[118,  86],[ 98,  66],[110,  78],[109,  77],[000, 000]];

	for(var i = 0, k = key_space.length; i < k; i++)
	{

		//DEFAULT KEYS				
		create_key(reg_keys,key_space[i][0]);

		//SHIFT KEYS
		create_key(sh_keys,key_space[i][1]);

		// set float kills for line breaks
		if(i === 10 || i === 21 || i === 32)
		{
			var fk = document.createElement("div"); 
			fk.className = "float_kill";
			reg_keys.appendChild(fk);	
			var fk = document.createElement("div"); 
			fk.className = "float_kill";
			sh_keys.appendChild(fk);			
		}
	}
}

add_keys();

document.body.onclick = function() {

	var inputs = document.getElementsByTagName('input');

	if(document.activeElement.tagName == 'INPUT'){
		// set keyboard visible
		keyboard_wrap.style.display = "block";

		document.activeElement.className += " "+"active_input";

		for(var i = 0, l = inputs.length; i < l; i++)
		{
			inputs[i].onclick = function() 
			{
				// if active input exist remove class
				var ca = document.getElementsByClassName("active_input")[0];
				if(typeof ca !=="undefined")
				{
					ca.className = ca.className.replace( /(?:^|\s)active_input(?!\S)/ , '' );
				}
			}
		}
	} 
	else 
	{
		//keyboard_wrap.style.display = "none";
	}
};

var keyz = document.getElementsByClassName('key_');

for(var i = 0, l = keyz.length; i < l; i++)
{
	keyz[i].onclick = function() 
	{ 
		if(this.innerHTML === "shift")
		{
			if(state === 0)
			{
				state = 1;
				reg_keys.style.display = "none";
				sh_keys.style.display = "block";
			} 
			else 
			{
				state = 0;
				sh_keys.style.display = "none";
				reg_keys.style.display = "block";
			}

		}
		else if(this.innerHTML === "back")
		{

			//var startpos = document.getElementsByClassName("active_input")[0].selectionStart;
			//var val_len = document.getElementsByClassName("active_input")[0].value.length;
			var str = document.getElementsByClassName("active_input")[0].value;
			str = str.slice(0, -1);
			document.getElementsByClassName("active_input")[0].value = str;
		}
		else 
		{
			document.getElementsByClassName("active_input")[0].value += this.innerHTML;
		}
	}
}
