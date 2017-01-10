var userArmor;//The user-entered stats will be saved in this variable
var option;




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
//Full Constructor for chest armor
function ChestArmor(name, armor, statLayout, talent, majorAttributeOne,majorAttributeTwo,minorAttribute) {
    this.name               = name;
    this.armor              = armor;
	
    this.statLayout         = statLayout;
    this.talent             = talent;
	
	this.majorAttributeOne  = majorAttributeOne;
	this.majorAttributeTwo  = majorAttributeTwo;
	this.minorAttribute     = minorAttribute;
	this.type = "body";
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
	
	majorAttributeOne_propertyInput  = document.getElementById("majorAttributeOne_propertyInput");
	majorAttributeOne_valueInput     = document.getElementById("majorAttributeOne_valueInput");
	
	majorAttributeOne_propertyInput.addEventListener('change', function () {
	majorAttributeOne_propertyInput.addEventListener("change", updateValues(majorAttributeOne_propertyInput,majorAttributeOne_valueInput));
                                                                           } );
	
	majorAttributeTwo_propertyInput  = document.getElementById("majorAttributeTwo_propertyInput");
	majorAttributeTwo_valueInput     = document.getElementById("majorAttributeTwo_valueInput");
	
	majorAttributeTwo_propertyInput.addEventListener('change', function () {
	majorAttributeTwo_propertyInput.addEventListener("change", updateValues(majorAttributeTwo_propertyInput,majorAttributeTwo_valueInput));
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
	
	if(majorAttributeOne_propertyInput.value != majorAttributeTwo_propertyInput.value){
	nameIn                = nameInput.value;
	armorIn               = armorInput.value;
	talentIn              = talentInput.value;
	
	statLayoutIn          = new StatLayout(firearmsInput.value,
								   staminaInput.value,
								   electronicsInput.value);
	
	majorAttributeOneIn   = new Attribute(majorAttributeOne_propertyInput.value,
									  majorAttributeOne_valueInput.value);
									 
	majorAttributeTwoIn   = new Attribute(majorAttributeTwo_propertyInput.value,
									  majorAttributeTwo_valueInput.value);
									  
	minorAttributeIn      = new Attribute(minorAttribute_propertyInput.value,
									  minorAttribute_valueInput.value);
	
	userArmor = new ChestArmor(nameIn,
							   armorIn,
							   statLayoutIn,
							   talentIn,
							   majorAttributeOneIn,
							   majorAttributeTwoIn,
							   minorAttributeIn);


	var jsonObject = JSON.stringify(userArmor); //stringify it
	localStorage.setItem(nameIn, jsonObject); //store it
	
	option    = document.createElement("option");
	option.text   = nameIn;
	savedGear.add(option);
	//store in loadable chest pieces

	alert("Chest Piece created.");
	//Let user know it worked
	}else{
		alert("Each major attribute must be a different property.");
	}
}

function loadSavedGear(){
			for (var key in localStorage){
		
			var obj = localStorage.getItem(key);
				obj = JSON.parse(obj);
			
			if(obj.type == "body"){
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
	majorAttributeOne_propertyInput.value= selectedItem.majorAttributeOne.property;
	addValue(majorAttributeOne_valueInput, selectedItem.majorAttributeOne.value);
	
	majorAttributeTwo_propertyInput.value= selectedItem.majorAttributeTwo.property;
	addValue(majorAttributeTwo_valueInput, selectedItem.majorAttributeTwo.value);
	
	minorAttribute_propertyInput   .value   = selectedItem.minorAttribute.property;
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
	alert("Chest Piece deleted.");
}

function updateValues(propertyInput,valueInput){
	removeOptions(valueInput);
	
	switch(propertyInput.value) {
    case "Damage vs Elites":
        valueInputsOne(valueInput);
        break;
    case "Armor (additional)":
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
	case "Protection vs Elites":
        valueInputsSix(valueInput);
        break;
    default:
        text = "N/A";
	}
	
}

function valueInputsOne(valueInput){
	for(var i = 6; i < 9; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}	
}

function valueInputsTwo(valueInput){
	var userInput = prompt("Please enter your armor roll (1074 - 1263)");
	if(userInput < 1074 || userInput > 1263){
		alert("invalid value entered");
	}
	else{
		option    = document.createElement("option");
		option.text   = userInput;
	valueInput.add(option);
	valueInput.value = userInput;
	}
		
}

function valueInputsThree(valueInput){
	var userInput = prompt("Please enter your health roll (5674 - 6670)");
	if(userInput < 5674 || userInput > 6670){
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
	for(var i = 6; i < 9; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}	
}


function updateValuesMinor(propertyInput,valueInput){
	removeOptions(valueInput);
	
	switch(propertyInput.value) {
    case "Kill XP":
        valueInputsOneMinor(valueInput);
        break;
    case "Ammo Capacity":
        valueInputsTwoMinor(valueInput);
        break;
    default:
        text = "N/A";
	}
	
}

function valueInputsOneMinor(valueInput){
	for(var i = 23; i < 29; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}
}

function valueInputsTwoMinor(valueInput){
	for(var i = 46; i < 57; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}
}


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
	var userInput = prompt("Please enter your armor's native armor roll(1704 - 2003)");
	if(userInput < 1704 || userInput > 2003){
		alert("invalid value entered");
	}
	else{
	
	armorInput.value = userInput;
	}
	
}



window.addEventListener( "load", start, false );

