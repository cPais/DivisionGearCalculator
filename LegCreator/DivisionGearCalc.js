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
//Full Constructor for knee armor
function KneeArmor(name, armor, statLayout, talent, majorAttribute,minorAttributeOne,minorAttributeTwo,minorAttributeThree) {
    this.name                 = name;
    this.armor                = armor;
	
    this.statLayout           = statLayout;
    this.talent               = talent;
	
	this.majorAttribute       = majorAttribute;
	
	this.minorAttributeOne    = minorAttributeOne;
	this.minorAttributeTwo    = minorAttributeTwo;
	this.minorAttributeThree  = minorAttributeThree;
	this.type = "knee";
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
	
	firearmsInput   .addEventListener("click", inputFirearms,    false);
	staminaInput    .addEventListener("click", inputStamina,     false);
	electronicsInput.addEventListener("click", inputElectronics, false);
	
	talentInput      		  = document.getElementById("talentInput");
	
	
	majorAttribute_propertyInput  = document.getElementById("majorAttribute_propertyInput");
	majorAttribute_valueInput     = document.getElementById("majorAttribute_valueInput");
	
	majorAttribute_propertyInput.addEventListener('change', function () {
	majorAttribute_propertyInput.addEventListener("change", updateValues(majorAttribute_propertyInput,majorAttribute_valueInput));
                                                                           } );
	
	minorAttributeOne_propertyInput     = document.getElementById("minorAttributeOne_propertyInput");
	minorAttributeOne_valueInput        = document.getElementById("minorAttributeOne_valueInput");
	
	minorAttributeOne_propertyInput.addEventListener('change', function () {
	minorAttributeOne_propertyInput.addEventListener("change", updateValuesMinor(minorAttributeOne_propertyInput,minorAttributeOne_valueInput));
                                                                           } );
	
	minorAttributeTwo_propertyInput     = document.getElementById("minorAttributeTwo_propertyInput");
	minorAttributeTwo_valueInput        = document.getElementById("minorAttributeTwo_valueInput");
	
	minorAttributeTwo_propertyInput.addEventListener('change', function () {
	minorAttributeTwo_propertyInput.addEventListener("change", updateValuesMinor(minorAttributeTwo_propertyInput,minorAttributeTwo_valueInput));
                                                                           } );
	
	minorAttributeThree_propertyInput     = document.getElementById("minorAttributeThree_propertyInput");
	minorAttributeThree_valueInput        = document.getElementById("minorAttributeThree_valueInput");
	
	minorAttributeThree_propertyInput.addEventListener('change', function () {
	minorAttributeThree_propertyInput.addEventListener("change", updateValuesMinor(minorAttributeThree_propertyInput,minorAttributeThree_valueInput));
                                                                           } );
	
	
	savedGear                 = document.getElementById("savedGear");
	if(localStorage.length != 0){
		loadSavedGear();
	}
	
	
	loadButton                = document.getElementById("loadChest");
	loadButton.addEventListener("click", loadSelected, false);
	
	submitButton              = document.getElementById("submitChest");
	submitButton.addEventListener("click", createArmor, false);
	
	deleteButton              = document.getElementById("deleteChest");
	deleteButton.addEventListener("click", deleteSelected, false);
	
} 

//Pull values from inputfields, create a knee piece using them.
function createArmor(){
	
 if(DuplicatesDontExist()){
	nameIn                = nameInput.value;
	armorIn               = armorInput.value;
	talentIn              = talentInput.value;
	
	statLayoutIn          = new StatLayout(firearmsInput.value,
								   staminaInput.value,
								   electronicsInput.value);
	
	majorAttributeIn      = new Attribute(majorAttribute_propertyInput.value,
									      majorAttribute_valueInput.value);
									  
	minorAttributeOneIn   = new Attribute(minorAttributeOne_propertyInput.value,
										  minorAttributeOne_valueInput.value);
									  
	minorAttributeTwoIn   = new Attribute(minorAttributeTwo_propertyInput.value,
									      minorAttributeTwo_valueInput.value);
									  
	minorAttributeThreeIn = new Attribute(minorAttributeThree_propertyInput.value,
									      minorAttributeThree_valueInput.value);
	
	userArmor = new KneeArmor(nameIn,
							  armorIn,
							  statLayoutIn,
							  talentIn,
							  majorAttributeIn,
							  minorAttributeOneIn,
							  minorAttributeTwoIn,
							  minorAttributeThreeIn);


	var jsonObject = JSON.stringify(userArmor); //stringify it
	localStorage.setItem(nameIn, jsonObject); //store it
	
	option    = document.createElement("option");
	option.text   = nameIn;
	savedGear.add(option);
	//store in loadable chest pieces

	alert("Knee Piece created.");
	//Let user know it worked
  }else{
	alert("The minor attributes cannot be duplicates.\n To continue, ensure each minor attribute is different.");
  }
	
}

function loadSavedGear(){
			for (var key in localStorage){
			var obj = localStorage.getItem(key);
				obj = JSON.parse(obj);
				if(obj.type == "knee"){
			
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
	
	majorAttribute_propertyInput.value= selectedItem.majorAttribute.property;
	addValue(majorAttribute_valueInput, selectedItem.majorAttribute.value);
	
	minorAttributeOne_propertyInput.value= selectedItem.minorAttributeOne.property;
	addValue(minorAttributeOne_valueInput, selectedItem.minorAttributeOne.value);
	
	minorAttributeTwo_propertyInput.value= selectedItem.minorAttributeTwo.property;
	addValue(minorAttributeTwo_valueInput, selectedItem.minorAttributeTwo.value);
	
	minorAttributeThree_propertyInput.value= selectedItem.minorAttributeThree.property;
	addValue(minorAttributeThree_valueInput, selectedItem.minorAttributeThree.value);
	
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
	alert("Knee Piece deleted.");
}

//Major Attribute Event Handlers
function updateValues(propertyInput,valueInput){	
	removeOptions(valueInput);
	
	switch(propertyInput.value){
		case "Damage vs Elites":
			valueInputsOne(valueInput);
			break;
		case "Armor (additional)":
			valueInputsTwo(valueInput);
			break;
		case "Health":
			valueInputsThree(valueInput);
			break;
		case "Crit Damage":
			valueInputsFour(valueInput);
			break;
		case "Exotic Damage Resilience":
			valueInputsFive(valueInput);
			break;
		case "Protection vs Elites":
			valueInputsSix(valueInput);
			break;
    default:
        text = "I have never heard of that fruit...";
	}	
}
function valueInputsOne(valueInput){
	for(var i = 4; i < 6; i++){
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
	var userInput = prompt("Please enter your health roll (3179 - 3737)");
	if(userInput < 3179 || userInput > 3737){
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
	for(var i = 7; i < 10; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}
function valueInputsFive(valueInput){
	for(var i = 6; i < 9; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}
function valueInputsSix(valueInput){
	for(var i = 3; i < 5; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}
//Major Attribute Event Handlers end here

//Minor Attribute Event Handlers begin here
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
	case "Blind/Deaf Resistance":
        valueInputsThreeMinor(valueInput);
        break;
	case "Disrupt Resistance":
        valueInputsThreeMinor(valueInput);
        break;
	case "Bleed Resistance":
        valueInputsThreeMinor(valueInput);
        break;
	case "Shock Resistance":
        valueInputsThreeMinor(valueInput);
        break;
    default:
        text = "N/A";
	}
}
function valueInputsOneMinor(valueInput){
	for(var i = 46; i < 57; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}
function valueInputsTwoMinor(valueInput){
	for(var i = 9; i < 13; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}
function valueInputsThreeMinor(valueInput){
	for(var i = 27; i < 34; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
	}
}
//Minor Attribute Event Handlers end here



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
	var userInput = prompt("Please enter your armor's native armor roll(1419 - 1668)");
	if(userInput < 1419 || userInput > 1668){
		alert("invalid value entered");
	}
	else{
	
	armorInput.value = userInput;
	}
	
}

function DuplicatesDontExist(){
	var result = true;
	
	switch(minorAttributeOne_propertyInput.value){
		
		case minorAttributeTwo_propertyInput.value:
			result=false;
			break;
		case minorAttributeThree_propertyInput.value:
			result=false;
			break;
		default:
			text = "N/A";
	}
	
	switch(minorAttributeTwo_propertyInput.value){
		
		case minorAttributeOne_propertyInput.value:
			result=false;
			break;
		case minorAttributeThree_propertyInput.value:
			result=false;
			break;
		default:
			text = "N/A";
	}
	return result;
}



window.addEventListener( "load", start, false );

