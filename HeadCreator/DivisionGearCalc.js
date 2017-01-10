var userArmor;//The user-entered stats will be saved in this variable
var option;




//A sub-component of mask armor
function Attribute(property, value){
	this.property = property;
	this.value    = value;
}

//A sub-component of mask armor
function StatLayout(firearms, stamina, electronics){
	this.firearms    = firearms;
	this.stamina     = stamina;
	this.electronics = electronics;
}
//Full Constructor for mask armor
function MaskArmor(name, armor, statLayout, talent, majorAttribute,minorAttribute) {
    this.name               = name;
    this.armor              = armor;
	
    this.statLayout         = statLayout;
    this.talent             = talent;
	
	this.majorAttribute     = majorAttribute;
	this.minorAttribute     = minorAttribute;
	this.type = "mask";
}



//Get all the elements in the work environment by id for later use. Add event listeners.
function start()
{
	nameInput        		  = document.getElementById("nameInput");
	armorInput       		  = document.getElementById("armorInput");
	armorInput.addEventListener("click", inputArmor,false);
	
	firearmsInput    	      = document.getElementById("firearmsInput");
	staminaInput     		  = document.getElementById("staminaInput");
	electronicsInput 		  = document.getElementById("electronicsInput");
	firearmsInput   .addEventListener("click", inputFirearms, false);
	staminaInput    .addEventListener("click", inputStamina, false);
	electronicsInput.addEventListener("click", inputElectronics, false);
	
	talentInput      		  = document.getElementById("talentInput");
	
	majorAttribute_propertyInput  = document.getElementById("majorAttribute_propertyInput");
	majorAttribute_valueInput     = document.getElementById("majorAttribute_valueInput");
	
	majorAttribute_propertyInput.addEventListener('change', function () {
	majorAttribute_propertyInput.addEventListener("change", updateValues(majorAttribute_propertyInput,majorAttribute_valueInput));
                                                                           } );
	
	minorAttribute_propertyInput     = document.getElementById("minorAttribute_propertyInput");
	minorAttribute_valueInput        = document.getElementById("minorAttribute_valueInput");
	
	minorAttribute_propertyInput.addEventListener('change', function () {
	minorAttribute_propertyInput.addEventListener("change", updateValuesMinor(minorAttribute_propertyInput,minorAttribute_valueInput));
                                                                           } );
	
	savedGear                 = document.getElementById("savedGear");
	if(localStorage.length != 0){
		loadSavedGear();
	}
	
	
	loadButton                = document.getElementById("loadChest");
	loadButton.addEventListener("click", loadSelected, false);
	
	submitButton              = document.getElementById("submitChest");
	submitButton.addEventListener("click", createChest, false);
	
	deleteButton              = document.getElementById("deleteChest");
	deleteButton.addEventListener("click", deleteSelected, false);
	
} 

//Pull values from inputfields, create a chest piece using them.
function createChest(){
	
	
	nameIn                = nameInput.value;
	armorIn               = armorInput.value;
	talentIn              = talentInput.value;
	
	statLayoutIn          = new StatLayout(firearmsInput.value,
								   staminaInput.value,
								   electronicsInput.value);
	
	majorAttributeIn   = new Attribute(majorAttribute_propertyInput.value,
									   majorAttribute_valueInput.value);
									  
	minorAttributeIn      = new Attribute(minorAttribute_propertyInput.value,
									      minorAttribute_valueInput.value);
	
	userArmor = new MaskArmor(nameIn,
							   armorIn,
							   statLayoutIn,
							   talentIn,
							   majorAttributeIn,
							   minorAttributeIn);


	var jsonObject = JSON.stringify(userArmor); //stringify it
	localStorage.setItem(nameIn, jsonObject); //store it
	
	option    = document.createElement("option");
	option.text   = nameIn;
	savedGear.add(option);
	//store in loadable chest pieces

	alert("Mask Piece created.");
	//Let user know it worked
	
}

function loadSavedGear(){
			for (var key in localStorage){
			var obj = localStorage.getItem(key);
				obj = JSON.parse(obj);
				if(obj.type == "mask"){
			
				option = document.createElement("option");
				option.text = obj.name;
				savedGear.add(option);
				}
			}		
}

function loadSelected(){
	var selectedItem = localStorage.getItem(savedGear.value);
	var selectedItem = JSON.parse(selectedItem);
	
	nameInput                      .value   = selectedItem.name;
	armorInput                     .value   = selectedItem.armor;
	
	firearmsInput                  .value   = selectedItem.statLayout.firearms;
	staminaInput                   .value   = selectedItem.statLayout.stamina;
	electronicsInput               .value   = selectedItem.statLayout.electronics;
	
	talentInput                    .value   = selectedItem.talent;
	//Add node text then choose option for each blank value.
	majorAttribute_propertyInput.value= selectedItem.majorAttribute.property;
	addValue(majorAttribute_valueInput, selectedItem.majorAttribute.value);
	
	minorAttribute_propertyInput.value= selectedItem.minorAttribute.property;
	addValue(minorAttribute_valueInput, selectedItem.minorAttribute.value);
	
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
	alert("Mask Piece deleted.");
}

function updateValues(propertyInput,valueInput){
	removeOptions(valueInput);
	
	switch(propertyInput.value) {
    case "Damage vs Elites":
        valueInputsOne(valueInput);
        break;
    case "Crit Chance":
        valueInputsTwo(valueInput);
        break;
    case "Health":
        valueInputsThree(valueInput);
        break;
	case "HP on Kill":
        valueInputsFour(valueInput);
        break;
	case "Exotic Damage Resilience":
        valueInputsFive(valueInput);
        break;
	case "Skill Power":
        valueInputsSix(valueInput);
        break;
    default:
        text = "N/A";
	}
	
}

function valueInputsOne(valueInput){
	for(var i = 8; i < 11; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}
	
}

function valueInputsTwo(valueInput){
	for(var i = 3; i < 5; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}

function valueInputsThree(valueInput){
	var userInput = prompt("Please enter your health roll (4788 - 5629)");
	if(userInput < 4788 || userInput > 5629){
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
	for(var i = 4; i < 6; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}

function valueInputsFive(valueInput){
	for(var i = 9; i < 12; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}

function valueInputsSix(valueInput){
	var userInput = prompt("Please enter your armor's skill power roll(8532 - 10030)");
	if(userInput < 8532 || userInput > 10030){
		alert("invalid value entered");
	}
	else{
	
	addValue(valueInput,userInput);
	}
	
}

//Shameless copy-paste(For minor attribute) begins here
function updateValuesMinor(propertyInput,valueInput){
	removeOptions(valueInput);
	
	switch(propertyInput.value) {
    case "Kill XP":
        valueInputsOneMinor(valueInput);
        break;
    case "Enemy Armor Damage":
        valueInputsTwoMinor(valueInput);
        break;
	case "Burn Resistance":
        valueInputsThreeMinor(valueInput);
        break;
	case "Disorient Resistance":
        valueInputsThreeMinor(valueInput);
        break;
	case "Blind/Deaf Resitance":
        valueInputsThreeMinor(valueInput);
        break;
    default:
        text = "N/A";
	}
	
}

function valueInputsOneMinor(valueInput){
	for(var i = 12; i < 15; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
	
}

function valueInputsTwoMinor(valueInput){
	for(var i = 7; i < 10; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}

function valueInputsThreeMinor(valueInput){
	for(var i = 14; i < 18; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
	
}

//shameless copy-paste ends here
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
	staminaInput.value = 205;
	electronicsInput.value = 205;
	}
	
}

function inputStamina(){
	var userInput = prompt("Please enter your stamina roll (1114 - 1272)");
	if(userInput < 1114 || userInput > 1272){
		alert("invalid value entered");
	}
	else{
	staminaInput.value = userInput;
	firearmsInput.value = 205;
	electronicsInput.value = 205;
	}
	
}

function inputElectronics(){
	var userInput = prompt("Please enter your electronics roll (1114 - 1272)");
	if(userInput < 1114 || userInput > 1272){
		alert("invalid value entered");
	}
	else{
	firearmsInput.value = 205;
	staminaInput.value = 205;
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

