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
//Full Constructor for glove armor
function GloveArmor(name, armor, statLayout, talent,majorAttributeOne,majorAttributeTwo,majorAttributeThree) {
    this.name                 = name;
    this.armor                = armor;
	
    this.statLayout           = statLayout;
    this.talent               = talent;
	
	this.majorAttributeOne    = majorAttributeOne;
	this.majorAttributeTwo    = majorAttributeTwo;
	this.majorAttributeThree  = majorAttributeThree;
	this.type = "glove";
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
	
	majorAttributeOne_propertyInput     = document.getElementById("majorAttributeOne_propertyInput");
	majorAttributeOne_valueInput        = document.getElementById("majorAttributeOne_valueInput");
	
	majorAttributeOne_propertyInput.addEventListener('change', function () {
	majorAttributeOne_propertyInput.addEventListener("change", updateValues(majorAttributeOne_propertyInput,majorAttributeOne_valueInput));
                                                                           } );
	
	majorAttributeTwo_propertyInput     = document.getElementById("majorAttributeTwo_propertyInput");
	majorAttributeTwo_valueInput        = document.getElementById("majorAttributeTwo_valueInput");
	
	majorAttributeTwo_propertyInput.addEventListener('change', function () {
	majorAttributeTwo_propertyInput.addEventListener("change", updateValues(majorAttributeTwo_propertyInput,majorAttributeTwo_valueInput));
                                                                           } );
	
	majorAttributeThree_propertyInput     = document.getElementById("majorAttributeThree_propertyInput");
	majorAttributeThree_valueInput        = document.getElementById("majorAttributeThree_valueInput");
	
	majorAttributeThree_propertyInput.addEventListener('change', function () {
	majorAttributeThree_propertyInput.addEventListener("change", updateValues(majorAttributeThree_propertyInput,majorAttributeThree_valueInput));
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

//Pull values from inputfields, create a knee piece using them.
function createChest(){
	
 if(DuplicatesDontExist()){
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
									  
	majorAttributeThreeIn = new Attribute(majorAttributeThree_propertyInput.value,
									      majorAttributeThree_valueInput.value);
	
	userArmor = new GloveArmor(nameIn,
							  armorIn,
							  statLayoutIn,
							  talentIn,
							  majorAttributeOneIn,
							  majorAttributeTwoIn,
							  majorAttributeThreeIn);


	var jsonObject = JSON.stringify(userArmor); //stringify it
	localStorage.setItem(nameIn, jsonObject); //store it
	
	option    = document.createElement("option");
	option.text   = nameIn;
	savedGear.add(option);
	//store in loadable chest pieces

	alert("Glove Piece created.");
	//Let user know it worked
  }else{
	alert("The major attributes cannot be duplicates.\n To continue, ensure each major attribute is different.");
  }
	
}

function loadSavedGear(){
			for (var key in localStorage){
			var obj = localStorage.getItem(key);
				obj = JSON.parse(obj);
				if(obj.type == "glove"){
			
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
	
	majorAttributeOne_propertyInput.value= selectedItem.majorAttributeOne.property;
	addValue(majorAttributeOne_valueInput, selectedItem.majorAttributeOne.value);
	
	majorAttributeTwo_propertyInput.value= selectedItem.majorAttributeTwo.property;
	addValue(majorAttributeTwo_valueInput, selectedItem.majorAttributeTwo.value);
	
	majorAttributeThree_propertyInput.value= selectedItem.majorAttributeThree.property;
	addValue(majorAttributeThree_valueInput, selectedItem.majorAttributeThree.value);
	
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
	alert("Glove Piece deleted.");
}

//Major Attribute Event Handlers
function updateValues(propertyInput,valueInput){	
	removeOptions(valueInput);
	
	switch(propertyInput.value){
		case "Crit Chance":
			valueInputsOne(valueInput);
			break;
		case "Crit Damage":
			valueInputsTwo(valueInput);
			break;
		case "Damage vs Elites":
			valueInputsThree(valueInput);
			break;
		case "HP on Kill":
			valueInputsFour(valueInput);
			break;
		case "Submachinegun Damage":
			valueInputsFive(valueInput);
			break;
		case "Assault Rifle Damage":
			valueInputsSix(valueInput);
			break;
		case "Shotgun Damage":
			valueInputsSix(valueInput);
			break;
		case "Lightmachinegun Damage":
			valueInputsSix(valueInput);
			break;
		case "Pistol Damage":
			valueInputsSix(valueInput);
			break;
		case "Marksman Rifle Damage":
			valueInputsSeven(valueInput);
			break;
    default:
        text = "N/A";
	}	
}
function valueInputsOne(valueInput){
	for(var i = 5; i < 7; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}
}
function valueInputsTwo(valueInput){
	for(var i = 14; i < 18; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}
}
function valueInputsThree(valueInput){
	for(var i = 8; i < 11; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
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
	var userInput = prompt("Please enter your submachinegun damage roll (852 - 1001)");
	if(userInput < 852 || userInput > 1001){
		alert("invalid value entered");
	}
	else{
		option    = document.createElement("option");
		option.text   = userInput;
	valueInput.add(option);
	valueInput.value = userInput;
	}	
}
function valueInputsSix(valueInput){
	var userInput = prompt("Please enter your submachinegun damage roll (1135 - 1334)");
	if(userInput < 1135 || userInput > 1334){
		alert("invalid value entered");
	}
	else{
		option    = document.createElement("option");
		option.text   = userInput;
	valueInput.add(option);
	valueInput.value = userInput;
	}	
}
function valueInputsSeven(valueInput){
	var userInput = prompt("Please enter your submachinegun damage roll (3982 - 4681)");
	if(userInput < 3982 || userInput > 4681){
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

function DuplicatesDontExist(){
	var result = true;
	
	switch(majorAttributeOne_propertyInput.value){
		
		case majorAttributeTwo_propertyInput.value:
			result=false;
			break;
		case majorAttributeThree_propertyInput.value:
			result=false;
			break;
		default:
			text = "N/A";
	}
	
	switch(majorAttributeTwo_propertyInput.value){
		
		case majorAttributeOne_propertyInput.value:
			result=false;
			break;
		case majorAttributeThree_propertyInput.value:
			result=false;
			break;
		default:
			text = "N/A";
	}
	return result;
}



window.addEventListener( "load", start, false );

