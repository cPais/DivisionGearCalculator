var userArmor;//The user-entered stats will be saved in this variable
var option;
var stats = new AllStats();





//A sub-component of armor
function Attribute(property, value){
	this.property = property;
	this.value    = value;
}

//A sub-component of armor
function StatLayout(firearms, stamina, electronics){
	this.firearms    = firearms;
	this.stamina     = stamina;
	this.electronics = electronics;
}
//Full Constructor for a GearSet
function GearSet(name,bodyarmor,backpack,mask,gloves,kneepads,holster) {
    this.name                 = name;
	
    this.bodyarmor            = bodyarmor;
	this.backpack             = backpack;
	
    this.mask                 = mask;
    this.gloves               = gloves;
	
	this.kneepads             = kneepads;
	this.holster              = holster;
	this.type = "gearset";
	
	
}
function AllStats(){

	
	

	this.load = function () {
    /*
	for(var member in this){
		if(member != "load"){
		alert(member);
		alert(member.value);
		}
	}
	*/
	};
//Need to identify valueinputs by variables and insert them


	/*
	critChance=x;
	critDamage=x;
	weaponDamage=x;
	damageVsElites=x;
	
	bonusHealth=x;
	hpOnKill=x;
	exoticDamageResilience=x;
	protectionvsElites=x;
	
	skillPower=x;
	skillHaste=x;
	sigResGain=x;
	
	enemyArmorDamage=x;
	ammoCapacity=x;
	killXP=x;
	shockResist=x;
	burnResist=x;
	disorientResist=x;
	blindResist=x;
	disruptResist=x;
	bleedResist=x;
	*/
}




//Get all the elements in the work environment by id for later use. Add event listeners.
function start()
{
	integers();
	nameInput        		  = document.getElementById("nameInput");
	
	
	firearmsInput    	      = document.getElementById("firearmsInput");
	staminaInput     		  = document.getElementById("staminaInput");
	electronicsInput 		  = document.getElementById("electronicsInput");
	armorInput                = document.getElementById("armorInput");
	
//	firearmsInput   .addEventListener("click", inputFirearms,    false);
//	staminaInput    .addEventListener("click", inputStamina,     false);
//	electronicsInput.addEventListener("click", inputElectronics, false);
	
	bodyarmorInput = document.getElementById("bodyarmorInput");
	loadSavedGear(bodyarmorInput,"body");
	backpackInput  = document.getElementById("backpackInput");
	loadSavedGear(backpackInput,"back");
	
	maskInput      = document.getElementById("maskInput");
	loadSavedGear(maskInput,"mask");
	glovesInput    = document.getElementById("glovesInput");
	loadSavedGear(glovesInput,"glove");
	
	kneepadsInput  = document.getElementById("kneepadsInput");
	loadSavedGear(kneepadsInput,"knee");
	holsterInput   = document.getElementById("holsterInput");
	loadSavedGear(holsterInput,"holster");
	
	savedGear      = document.getElementById("savedGear");
	loadSavedGear(savedGear,"gearset");
	
	
		
	
	
	loadButton                = document.getElementById("loadChest");
	loadButton.addEventListener("click", loadSelected, false);
	
	submitButton              = document.getElementById("submitChest");
	submitButton.addEventListener("click",createChest, false);
	
	deleteButton              = document.getElementById("deleteChest");
	deleteButton.addEventListener("click",deleteSelected, false);
	
} 


//Pull values from inputfields, create a knee piece using them.
function createChest(){
	
 
	nameIn                = nameInput.value;
	
	bodyarmorIn           = bodyarmorInput.value;
	backpackIn            = backpackInput.value;
	
	maskIn                = maskInput.value;
	glovesIn              = glovesInput.value;
	
	kneepadsIn            = kneepadsInput.value;
	holsterIn             = holsterInput.value;
	
									  
									  
	userArmor = new GearSet(nameIn,
							bodyarmorIn,
							backpackIn,
							maskIn,
							glovesIn,
							kneepadsIn,
							holsterIn);


	var jsonObject = JSON.stringify(userArmor); //stringify it
	localStorage.setItem(nameIn, jsonObject); //store it
	
	option    = document.createElement("option");
	option.text   = nameIn;
	savedGear.add(option);
	//store in loadable  pieces

	alert("Gearset created.");
	//Let user know it worked
	
}

function loadSavedGear(field,type){
	if(localStorage.length != 0){
			for (var key in localStorage){
			var obj = localStorage.getItem(key);
				obj = JSON.parse(obj);
				if(obj.type == type){
			
				option = document.createElement("option");
				option.text = obj.name;
				field.add(option);
				}
			}
		}
		
}












function loadSelected(){
	resetValues();
	document.getElementById("gearsetName").innerHTML = savedGear.value;
		var selectedItem = localStorage.getItem(savedGear.value);
		var selectedItem = JSON.parse(selectedItem);
	
	
		document.getElementById("bodyTalent").innerHTML = JSON.parse(localStorage.getItem(selectedItem.bodyarmor)).talent;
		document.getElementById("backTalent").innerHTML = JSON.parse(localStorage.getItem(selectedItem.backpack)).talent;
		document.getElementById("maskTalent").innerHTML = JSON.parse(localStorage.getItem(selectedItem.mask)).talent;
		document.getElementById("kneesTalent").innerHTML = JSON.parse(localStorage.getItem(selectedItem.kneepads)).talent;
		document.getElementById("holsterTalent").innerHTML = JSON.parse(localStorage.getItem(selectedItem.holster)).talent;
		document.getElementById("glovesTalent").innerHTML = JSON.parse(localStorage.getItem(selectedItem.gloves)).talent;
		
			processItem(localStorage.getItem(selectedItem.bodyarmor));
			processItem(localStorage.getItem(selectedItem.backpack));
			processItem(localStorage.getItem(selectedItem.mask));
			processItem(localStorage.getItem(selectedItem.kneepads));
			processItem(localStorage.getItem(selectedItem.holster));
			processItem(localStorage.getItem(selectedItem.gloves));
			
			firearmsInput.value    = "Firearms: "    + firearmsInput.value;
			staminaInput.value     = "Stamina: "     + staminaInput.value;
			electronicsInput.value = "Electronics: " + electronicsInput.value;
			armorInput.value       = "Armor: "       + armorInput.value;
	
	
}

function processItem(armorIn){
	
		var armor = JSON.parse(armorIn);
		extractStats(armor.type,armor);
}

function addValue(fieldIn, valueIn){
	option      = document.createElement("option");
	option.text = valueIn;
	fieldIn.add(option);
	fieldIn.value = valueIn;
	
}

function deleteSelected(){
	localStorage.removeItem(savedGear.value);
	savedGear.remove(savedGear.value);
	alert("Gearset deleted.");
}

//Stat Extraction Handlers
function extractStats(armorType,armor){	
	
	
	switch(armorType){
		case "body":
			extractBodyStats(armor);
			break;
		case "mask":
			extractMaskStats(armor);
			break;
		case "knee":
			extractKneeStats(armor);
			break;
		case "back":
			extractBackStats(armor);
			break;
		case "glove":
		   extractGloveStats(armor);
			break;
		case "holster":
		 extractHolsterStats(armor);
			break;
    default:
        text = "N/A";
	}	
}
function extractBodyStats(armor){
	getMainStats(armor);
	getAttribute(armor.majorAttributeOne);
	getAttribute(armor.majorAttributeTwo);
	getAttribute(armor.minorAttribute);
}
function extractMaskStats(armor){
	getMainStats(armor);
	getAttribute(armor.majorAttribute);
	getAttribute(armor.minorAttribute);
}
function extractKneeStats(armor){
	getMainStats(armor);
	getAttribute(armor.minorAttributeOne);
	getAttribute(armor.minorAttributeTwo);
	getAttribute(armor.minorAttributeThree);
}
function extractBackStats(armor){
	getMainStats(armor);
	getAttribute(armor.majorAttribute);
	getAttribute(armor.minorAttribute);
}
function extractGloveStats(armor){
	getMainStats(armor);
	getAttribute(armor.majorAttributeOne);
	getAttribute(armor.majorAttributeTwo);
	getAttribute(armor.majorAttributeThree);
}
function extractHolsterStats(armor){
	getMainStats(armor);
	getAttribute(armor.majorAttribute);
}





function getMainStats(armor){
	
	
	firearmsInput.value   = parseInt(armor.statLayout.firearms) + parseInt(firearmsInput.value);
	staminaInput.value    = parseInt(armor.statLayout.stamina) + parseInt(staminaInput.value);
	electronicsInput.value= parseInt(armor.statLayout.electronics) + parseInt(electronicsInput.value);
	armorInput.value      = parseInt(armor.armor) + parseInt(armorInput.value);

	
}
function integers(){
	firearmsInput.value = parseInt(firearmsInput.value);
	staminaInput.value = parseInt(staminaInput.value);
	electronicsInput.value = parseInt(electronicsInput.value);
	armorInput.value = parseInt(armorInput.value);
}

function getAttribute(attribute){
	
	var valueIn = attribute.value;
	var needAppend = false;
	
	if(document.getElementById(attribute.property) == null){
		document.getElementById("Weapon Name").innerHTML = attribute.property;
		document.getElementById("Weapon Damage").innerHTML = valueIn;
		
	}else{
	//If the attribute uses percentages, the % is removed.
	if(valueIn.slice(-1) == "%"){
		valueIn = valueIn.substring(0, valueIn.length - 1);
		needAppend = true;
	}
	
	if(document.getElementById(attribute.property).innerHTML == "-" ){
		document.getElementById(attribute.property).innerHTML = valueIn;
	}
	else{
	var	prexisting = parseInt(document.getElementById(attribute.property).innerHTML);
	valueIn = parseInt(valueIn);
	   document.getElementById(attribute.property).innerHTML = valueIn + prexisting;
	}
	if(needAppend){
		document.getElementById(attribute.property).innerHTML +="%";
		needAppend = false;
	}
}
//	document.getElementById(attribute.property).innerHTML = attribute.value;
	
}

function resetValues(){
	firearmsInput.value=0;
	staminaInput.value=0;
	electronicsInput.value=0;
	armorInput.value=0;
	document.getElementById("Crit Chance").innerHTML = "-";
	document.getElementById("Crit Damage").innerHTML = "-";
	document.getElementById("Weapon Damage").innerHTML = "-";
	document.getElementById("Damage vs Elites").innerHTML = "-";
	
	document.getElementById("Armor (additional)").innerHTML = "-";
	document.getElementById("Health").innerHTML = "-";
	document.getElementById("HP on Kill").innerHTML = "-";
	document.getElementById("Exotic Damage Resilience").innerHTML = "-";
	document.getElementById("Protection vs Elites").innerHTML = "-";
	
	document.getElementById("Skill Haste").innerHTML = "-";
	document.getElementById("Skill Power").innerHTML = "-";
	document.getElementById("Signature Resource Gain").innerHTML = "-";
	
	document.getElementById("Enemy Armor Damage").innerHTML = "-";
	document.getElementById("Kill XP").innerHTML = "-";
	document.getElementById("Ammo Capacity").innerHTML = "-";
	document.getElementById("Shock Resistance").innerHTML = "-";
	document.getElementById("Burn Resistance").innerHTML = "-";
	document.getElementById("Disorient Resistance").innerHTML = "-";
	document.getElementById("Blind/Deaf Resistance").innerHTML = "-";
	document.getElementById("Disrupt Resistance").innerHTML = "-";
	document.getElementById("Bleed Resistance").innerHTML = "-";
	
		document.getElementById("bodyTalent").innerHTML = "-";
		document.getElementById("backTalent").innerHTML = "-";
		document.getElementById("maskTalent").innerHTML = "-";
		document.getElementById("kneesTalent").innerHTML = "-";
		document.getElementById("holsterTalent").innerHTML = "-";
		document.getElementById("glovesTalent").innerHTML = "-";
}

/*
function Attribute(property, value){
	this.property = property;
	this.value    = value;
}


*/








function valueInputsTwo(valueInput){
	for(var i = 5; i < 7; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}
}
function valueInputsThree(valueInput){
	var userInput = prompt("Please enter your roll (568 - 667)");
	if(userInput < 568 || userInput > 667){
		alert("invalid value entered");
	}
	else{
		option    = document.createElement("option");
		option.text   = userInput;
	valueInput.add(option);
	valueInput.value = userInput;
	}	
}
function valueInputsFour(valueInput){
	var userInput = prompt("Please enter your roll (573 - 673)");
	if(userInput < 573 || userInput > 673){
		alert("invalid value entered");
	}
	else{
		option    = document.createElement("option");
		option.text   = userInput;
	valueInput.add(option);
	valueInput.value = userInput;
	}	
}
//Major Attribute Event Handlers end here



function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function inputFirearms(){
	var userInput = prompt("Please enter your firearms roll (1114 - 1272)");
	if(userInput < 1114 || userInput > 1272){
		alert("invalid value entered");
	}
	else{
	firearmsInput.value = userInput;
	}
	
}

function inputStamina(){
	var userInput = prompt("Please enter your stamina roll (1114 - 1272)");
	if(userInput < 1114 || userInput > 1272){
		alert("invalid value entered");
	}
	else{
	staminaInput.value = userInput;
	}
	
}

function inputElectronics(){
	var userInput = prompt("Please enter your electronics roll (1114 - 1272)");
	if(userInput < 1114 || userInput > 1272){
		alert("invalid value entered");
	}
	else{
	electronicsInput.value = userInput;
	}
	
}

function inputArmor(){
	var userInput = prompt("Please enter your armor's native armor roll(852 - 1001)");
	if(userInput < 852 || userInput > 1001){
		alert("invalid value entered");
	}
	else{
	
	armorInput.value = userInput;
	}
	
}


window.addEventListener( "load", start, false );

