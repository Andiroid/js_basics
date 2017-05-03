		
		/*
		 *
		 * JS APPEND STYLESHEET START
		 *
		 */

		var css = 'html,body{height:100%;padding:0px;margin:0px;}.keyboard_wrap{position:fixed;z-index:999999999999999999;bottom:0px;width:100%;height:35%;background-color: black;/*display:none;*/}.keyboard_close{position:absolute;right:0px;top:0px;text-align: center;font-family: helvetica;font-weight: 700;font-size: 25px;line-height:30px;background-color: red;color: #fff;width:30px;height:35px;}.key_{cursor:pointer;color:#000;background-color: #fff;border-radius: 3px;width:2%;height:15px;padding:5px;margin:1%;float:left;text-align:center;}.float_kill{content: "";clear: both;display: table;}}',
		    head = document.head || document.getElementsByTagName('head')[0],
		    style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet)
		{
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);

		/*
		 *
		 * JS APPEND STYLESHEET END
		 *
		 */
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
		x.onclick = function() { keyboard_wrap.style.display = "none"; };

		// init created elements input location
		var node_pointer;

		var inputs = document.getElementsByTagName('input');
		
		for(var i = 0, l = inputs.length; i < l; i++)
		{
			inputs[i].onclick = function() { 
				
				// set keyboard visible
				keyboard_wrap.style.display = "block";

				// if active input exist remove class
				var ca = document.getElementsByClassName("active_input")[0];
				if(typeof ca !=="undefined")
				{
					ca.className = ca.className.replace( /(?:^|\s)active_input(?!\S)/ , '' );
				}

				// set current input (inputs[i] aka "this" as active class)
				this.className += " "+"active_input";
			};
		}

		// document.body.onload = add_keys;

		// create keyboard dom elements
		function add_keys () { 

			var key_space = [  49,  50,  51,  52,  53,  54,  55, 
							   56,  57,  48, 113, 119, 101, 114, 
							  116, 122, 117, 105, 111, 112, 252, 
							   97, 115, 100, 102, 103, 104, 106, 
							  107, 108, 246, 228,  15, 121, 120,  
							  99,  118,  98, 110, 109  ];

			var shift_key = [  49,  50,  51,  52,  53,  54,  55, 
							   56,  57,  48,  81,  87,  69,  82, 
							   84,  90,  85,  73,  79,  80, 220, 
							   65, 115, 100, 102, 103, 104, 106, 
							  107, 108, 246, 228,  15, 121, 120,  
							  99,  118,  98, 110, 109  ];

		var reg_keys = document.createElement("div"); 
		reg_keys.id = "reg_keys";
		keyboard_wrap.appendChild(reg_keys);
		reg_keys = document.getElementById("reg_keys");

		var sh_keys = document.createElement("div"); 
		sh_keys.id = "sh_keys";
		keyboard_wrap.appendChild(sh_keys);
		sh_keys = document.getElementById("sh_keys");

			for(var i = 0, k = key_space.length; i < k; i++)
			{

				// translate current keyspace array code to its ascii compliment
				if(key_space[i] === 15)
				{
					var ascii = "shift";
				} else {
					var ascii = String.fromCharCode(key_space[i]);
				}
				

				// create a new key div element
				var new_key = document.createElement("div"); 
				new_key.className = "key_";
				
				// set key text
				var set_key_val = document.createTextNode(ascii); 
				new_key.appendChild(set_key_val); 

 				// insert new key
				//keyboard_wrap.insertBefore(new_key, node_pointer);	
				reg_keys.appendChild(new_key);

//SHIFT KEYS
				if(shift_key[i] === 15)
				{
					var ascii = "shift";
				} else {
					var ascii = String.fromCharCode(shift_key[i]);
				}
				// translate current keyspace array code to its ascii compliment
				//var ascii = String.fromCharCode(shift_key[i]);

				// create a new key div element
				var new_key = document.createElement("div"); 
				new_key.className = "key_";
				
				// set key text
				var set_key_val;

				set_key_val = document.createTextNode(ascii)

				new_key.appendChild(set_key_val); 

 				// insert new key
				//keyboard_wrap.insertBefore(new_key, node_pointer);	
				sh_keys.appendChild(new_key);
//SHIFT KEYS				
				// set float kills for line breaks
				if(i === 9 || i === 20 || i === 31)
				{
					var fk = document.createElement("div"); 
					fk.className = "float_kill";
					//keyboard_wrap.insertBefore(fk, node_pointer);
					reg_keys.appendChild(fk);	
					var fk = document.createElement("div"); 
					fk.className = "float_kill";
					sh_keys.appendChild(fk);			
				}

			}
		}

		add_keys();

		var keyz = document.getElementsByClassName('key_');
		
		for(var i = 0, l = keyz.length; i < l; i++)
		{

			keyz[i].onclick = function() { 
				if(this.innerHTML === "shift")
				{
					if(state === 0){
						state = 1;
						reg_keys.style.display = "none";
						sh_keys.style.display = "block";
					} else {
						state = 0;
						sh_keys.style.display = "none";
						reg_keys.style.display = "block";
					}

				} else {
					document.getElementsByClassName("active_input")[0].value += this.innerHTML;
				}
				//alert(this.innerHTML);
			}
		}
