/* ELEMENTS */
// tootlip...
const tooltip = document.getElementById('tooltip');
const ttUnit = document.getElementById('unit');
const ttLimit = document.getElementById('limit');
const ttExemple = document.getElementById('exemple');
//alert...
const theAlert = document.getElementById('alert');
const alertStrong = document.getElementById('alertStrong');
const alertText = document.getElementById('alertText');

var isWebSocketConnected = false;

/* DYNAMICS METHODS */

//the tooltip follows the cursor
function trackMouse(event){
    tooltip.style.top = event.pageY  + -50 + 'px';
    tooltip.style.left = event.pageX  + -245 + 'px';
}
//show the tooltip with custom values
function displayTooltip(id){
    ttUnit.innerText = '';
    ttLimit.innerText = '';
    ttExemple.innerText = '';
    switch (id) {
        case 1:
            ttUnit.innerText = 'pouces';
            ttLimit.innerText = '0 à 1000';
            ttExemple.innerText = '200';break;
        case 2:
            ttUnit.innerText = 'millisecondes';
            ttLimit.innerText = '1 à 100';
            ttExemple.innerText = '50';break;
        case 3:
            ttUnit.innerText = 'impulsions par secondes';
            ttLimit.innerText = '100 à 2000';
            ttExemple.innerText = '200';break;
        case 4:
            ttUnit.innerText = 'impulsions';
            ttLimit.innerText = '1 à 1000';
            ttExemple.innerText = '200';break;
        case 5:
            ttUnit.innerText = 'pouce';
            ttLimit.innerText = '0,01 à 0,2';
            ttExemple.innerText = '0,12';break;
        case 6:
            ttUnit.innerText = 'impulsions par centième de pouce';
            ttLimit.innerText = '0,05 à 4';
            ttExemple.innerText = '0,95';break;
        case 7:
            ttUnit.innerText = 'pouces';
            ttLimit.innerText = '0 à 1000';
            ttExemple.innerText = '200';break;
        case 8:
            ttUnit.innerText = 'Est-ce un axe circulaire ?';
            ttLimit.innerText = '0 à 1000';
            ttExemple.innerText = '200';break;
        case 9:
            ttUnit.innerText = 'millisecondes';
            ttLimit.innerText = '0 à 100 000';
            ttExemple.innerText = '5000';break;
        case 10:
            ttUnit.innerText = 'pouces';
            ttLimit.innerText = '0 à 1000';
            ttExemple.innerText = '200';break;
        case 11:
            ttUnit.innerText = 'pouce';
            ttLimit.innerText = '0 à 1000';
            ttExemple.innerText = '200';break;
        case 12:
            ttUnit.innerText = 'impulsion';
            ttLimit.innerText = '';
            ttExemple.innerText = '';break;
        case 13:
			ttUnit.innerText = 'impulsion';
            ttLimit.innerText = '';
            ttExemple.innerText = '';break;
                                                            
        default:
            break;
    }
    tooltip.style.display = "block";
}
//hide the tooltip
function hideTooltip(){
    tooltip.style.display = "none";
}

//show the alert on user action
function showAlert(type, text){
	theAlert.classList.remove('warn', 'success', 'danger');
	switch(type){
		case 'warn':
			alertStrong.innerText = "Chargement en cours...";break;
		case 'success':
			alertStrong.innerText = "Opération réussie !";break;
		case 'danger':
			alertStrong.innerText = "Erreur !";break;
		case 'info':
			alertStrong.innerText = "Info :";break;
	}
	theAlert.classList.add(type);
	alertText.innerText = text;
	theAlert.style.visibility = 'visible';
}
//hide the alert
function hideAlert(){
	theAlert.classList.remove('warn', 'success', 'danger');
	theAlert.style.visibility = 'hidden';
}

//verify for every field if the user input is correct format
function verifiyInput(type, input){
	switch (type) {
		case 'moduleName':
			//20char max, pas d'espaces, pas de ponctuation
			var regex = new RegExp("^[a-zA-Z0-9]{1,20}$");break;
		case 'ssid':
			//15char max, pas d'espaces, pas de ponctuation
			var regex = new RegExp("");break;
		case 'password':
			//15char max
			var regex = new RegExp("");break;
		case 'nodeAddress':
			//int de 1 à 99
			var regex = new RegExp("");break;
		case 'actualPosition':
			//int de 0 à 1000
			var regex = new RegExp("");break;
		case 'timeToStart':
			//int de 1 à 100
			var regex = new RegExp("");break;
		case 'motorSpeed':
			//int de 100 à 2000
			var regex = new RegExp("");break;
		case 'nbPulsesToStop':
			//int de 1 à 1000
			var regex = new RegExp("");break;
		case 'tolerance':
			//float de 0.01 à 0.2
			var regex = new RegExp("");break;
		case 'scaleFactor':
			//float de 0.05 à 4
			var regex = new RegExp("");break;
		case 'maxRange':
			//float de 0 à 1000
			var regex = new RegExp("");break;
		case 'runTime':
			//int de 1 à 100k  
			var regex = new RegExp("");break;
		case 'goToPos':
			//int de 1 à 1000
			var regex = new RegExp("");break;
		case 'ipAdress':
			//int de 1 à 1000
			var regex = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
		break;
	}
	if(!regex.test(input)){
		return false;
	}
}

function goHome(){
    window.location.href='/';
}

function changeModuleName(){
	showAlert('warn', 'Changement du nom de module...');
	try {
		websocket.send(JSON.stringify({"moduleName":document.getElementById("moduleName").value}));
	}
	catch(ex){
		showAlert('error', 'Une erreur est survenue, merci de réessayer plus tard.')
	}
	//banners
	showAlert('success', 'Le nom du module a bien été changé.')
	console.log("Message moduleName envoyé");
}

function goToSettings(){
    marcheRelay = document.getElementById('marcheRelay');
	(marcheRelay.checked ? marcheRelay.checked = false & runMarche() : false);

	sensRelay = document.getElementById('sensRelay');
	(sensRelay.checked ? sensRelay.checked = false & runSens() : false);

	ledRelay = document.getElementById('ledRelay');
	(ledRelay.checked ? ledRelay.checked = false & runLed() : false);

    window.location.href='reglages.html';
}

function saveNodeAddress(){
	try {
		websocket.send(JSON.stringify({"nodeAddress":document.getElementById("nodeAddress").value}));
	}
	catch (ex) {
		console.error("Caramba !", ex.message);
	}
    //banners
	console.log("Message save node adresse envoyé");
}

function saveMechanicals(){ 
	console.log("Bouton save mechanicals");
	const isDeviceRotatif = document.getElementById('isDeviceRotatif');
	(isDeviceRotatif.checked == true ? rep = 'checked' : rep = 'unchecked');
	
	var t = JSON.stringify(
        {
            "scaleFactor":document.getElementById("scaleFactor").value,
	        "actualPosition":document.getElementById("actualPosition").value,
	        "timeToStart":document.getElementById("timeToStart").value,
	        "nbPulsesToStop":document.getElementById("nbPulsesToStop").value,
	        "motorSpeed":document.getElementById("motorSpeed").value,
	        "tolerance":document.getElementById("tolerance").value,
	        "maxRange":document.getElementById("maxRange").value,
	        "isDeviceRotatif":rep
        }
    );
	try{
		websocket.send(t);
	}
	catch (ex) {
		console.error("Caramba !", ex.message);
	}
	//banners
	console.log("Message save mechanicals envoyé");
}

function runForA_GivenTime(){
	console.log("Bouton runForA_GivenTime");
	const sensDep = document.getElementById('sensDep');
	(sensDep.checked ? rep = 'checked' : rep = 'unchecked');
	try {
		websocket.send(JSON.stringify({"time":document.getElementById('runTime').value, "sensDep":rep}));
		console.log("Message time envoyé");
	} 
	catch (ex) {
		console.error("Caramba !", ex.message);
	}
    //banners
}

function moveWith(dep){
	console.log("Bouton déplacement relatif");
	try {
		websocket.send(JSON.stringify({"relativeMove":dep}));
		console.log("Message relativeMove envoyé");
	}
	catch (ex) {
		console.error("Caramba !", ex.message);
	}
    //banners
}

function runRelay(relay){
	theRelay = document.getElementById(relay);
	(theRelay.checked ? rep = 'checked' : rep = 'unchecked');
	try {
		if(relay === 'marcheRelay')
			websocket.send(JSON.stringify({marcheRelay:rep}));
		if(relay === 'sensRelay')
			websocket.send(JSON.stringify({sensRelay:rep}));
		if(relay === 'ledRelay')
			websocket.send(JSON.stringify({ledRelay:rep}));
	}
	catch(ex) {
		console.error("Caramba !", ex.message);
	}
}

function goToPos(){
	try{
		websocket.send(JSON.stringify({"newPos":document.getElementById('goToPos').value}));
	} 
	catch(ex) {
		console.error("Caramba !", ex.message);
	}
	console.log("Message goToPos envoyé");
}

function validateIpParameters(){
	// if(ValidateIPaddress(document.getElementById("ipAddress"))&& ValidateIPaddress(document.getElementById("mask"))){
		alert("Attention, le module va changer de paramètres wifi!");
		
		websocket.send(JSON.stringify(
			{
				"ssid":document.getElementById("ssid").value,
				"password":document.getElementById("password").value
			}
		));
	// } else {
		alert("Un ou plusieurs paramètres ne sont pas corrects");
	// }	
}

function OnStateChange(){
	switch (this.readyState) {
		case 0:
		   console.log("The httpRequest object is not initialized");break;
		case 1:
		   console.log("Waiting for the send method");break;
		case 2:
		   console.log("The send method has been called, but no content is available at this time");break;
		case 3:
		   consol.log("Partial data has been received, but this content is not available yet");break;
		case 4:
		   console.log("All data has been received:");break;
	};
}

function indexOnloadfunction(){
	initWebSocket();
}

function indexunloadfunction(){
	console.trace();
}

function onOpen(event) {
	isWebSocketConnected = true;
	websocket.send(JSON.stringify({"url":location.pathname}));
	if(window.location.pathname.includes("reglages")){
		websocket.send(JSON.stringify({"reglagesInitialParameters":true}));
	} else {
	  	websocket.send(JSON.stringify({"indexInitialParameters":true}));
	}
}

function onClose(event) {
	isWebSocketConnected = false;
	console.log('Connection closed', event);
	setTimeout(initWebSocket, 2000);
}

function onMessage(event){
	try {
		console.log("message reçu par le web socket", event.data);
	   	var obj = JSON.parse(event.data);
		
	   	if (obj.hasOwnProperty("actualPosition")){
			document.getElementById("actualPosition").value = obj["actualPosition"]; // reglage.html ou index.html
		   	
			var elmsToDisable = document.getElementsByClassName("toDisable");
			var navBtn = document.getElementById('navigationBtn');
			navBtn.classList.remove('navDisabled');
			navBtn.classList.add('green');

		   	for(let i = 0; i < elmsToDisable.length; i++) {
				elem = elmsToDisable[i];
				elem.disabled = false;
				if(elem.tagName === 'INPUT') {
					elem.classList.remove('inputsDisabled');
				} else if(elem.tagName === 'BUTTON') {
					elem.classList.remove('btnsDisabled');
					elem.classList.add('blue');
				}
			}
	   	}
		var rep; // for isDeviceRotatif
	    switch(true){
			case obj.hasOwnProperty("tooMuchClients"):
				document.location.href='tooMuchClients.html';
				break;
			case obj.hasOwnProperty("movePulses"):
				document.getElementById("moveInpuls").value = obj["movePulses"];					
				document.getElementById("moveInches").value = obj["move"];
				document.getElementById("inertia").value = obj["inertia"];
				break;
		   	case obj.hasOwnProperty("hideButtons"):
			   	websocket.send(JSON.stringify({"handshake":"buttons"}));
				
				navBtn.classList.remove('green');
				navBtn.classList.add('navDisabled');
	   
				for(let i = 0; i < elmsToDisable.length; i++) {
					elem = elmsToDisable[i];
					elem.disabled = true;
					if(elem.tagName === 'INPUT') {
						elem.classList.add('inputsDisabled');
					} else if(elem.tagName === 'BUTTON') {
						elem.classList.remove('blue');
						elem.classList.add('btnsDisabled');
					}
				}
				break;
			case obj.hasOwnProperty("moduleName"):
				if (!window.location.pathname.includes("reglages")){ 
					// index.html initials parameters
					document.getElementById("moduleName").value = obj.moduleName;
					document.title=obj.moduleName;
					document.getElementById("nodeAddress").value = obj.nodeAddress;
					document.getElementById("actualPosition").value = obj.actualPosition;
					document.getElementById("ssid").value = obj.ssid;
					document.getElementById("password").value = obj.password;
					document.getElementById("scaleFactor").value = obj.scaleFactor;
					document.getElementById("timeToStart").value = obj.timeToStart;
					document.getElementById("nbPulsesToStop").value = obj.nbPulsesToStop;
					document.getElementById("motorSpeed").value = obj.motorSpeed;
					document.getElementById("tolerance").value = obj.tolerance;
					document.getElementById("maxRange").value = obj.maxRange; 
					rep = (obj.isDeviceRotatif == "true" ? true : false);
					document.getElementById("isDeviceRotatif").checked = rep;
				} else { 
					// page "reglages"
				  	document.getElementById("moduleName").value = obj.moduleName;
				   	document.title=obj.moduleName;
				   	document.getElementById("actualPosition").value = obj.actualPosition; 
				}
				break;
			case obj.hasOwnProperty("handshake"):
				var t = obj.handshake;
				if(t.includes("wifi")){
				   console.log("Paramètres wifi enregistrés avec succés sur le module");
				}
				if (t.includes("nodeAddress")){
				   console.log("Adresse du node RS422 enregistré avec succés sur le module");
				}
				if (t.includes("mechanicals")){
				   console.log("Paramètres mécaniques enregistrés avec succés sur le module");
				}
				if (t.includes("moduleName")){
				   var t = "Le nom du module est enregistré avec succés sur le module.\rAttention à la nouvelle mise sous tension, l'url sera: ";
				   t = t.concat("http://" + document.getElementById("moduleName").value + ".local");
				   console.log(t);
				}
				break;
			case obj.hasOwnProperty('heartbeat'):
				console.log("heartbeat reçu")
			break;	
	   	} 
		//switch
	} 	catch (e) {
		(console.error || console.log).call(console, e.stack || e);
	}
}

function onError(event){
	showAlert('danger', '[error] ${event.message}');
}

function initWebSocket() {
	if (!isWebSocketConnected){
	  	console.log('Trying to open a WebSocket connection…');
	  	websocket = new WebSocket("ws://" + window.location.hostname + "/ws");
	  	websocket.onopen = onOpen;
	  	websocket.onclose = onClose;
	  	websocket.onmessage = onMessage;
	  	websocket.onerror = onError;
	}
}

function reglagesOnloadfunction() {
	initWebSocket();
}