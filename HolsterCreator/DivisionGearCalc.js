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
//Full Constructor for holster armor
function HolsterArmor(name, armor, statLayout, talent, majorAttribute) {
    this.name                 = name;
    this.armor                = armor;
	
    this.statLayout           = statLayout;
    this.talent               = talent;
	
	this.majorAttribute    = majorAttribute;
	this.type = "holster";
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
	
 
	nameIn                = nameInput.value;
	armorIn               = armorInput.value;
	talentIn              = talentInput.value;
	
	statLayoutIn          = new StatLayout(firearmsInput.value,
								   staminaInput.value,
								   electronicsInput.value);
	
	majorAttributeIn      = new Attribute(majorAttribute_propertyInput.value,
									      majorAttribute_valueInput.value);
									  
									  
	userArmor = new HolsterArmor(nameIn,
							  armorIn,
							  statLayoutIn,
							  talentIn,
							  majorAttributeIn);


	var jsonObject = JSON.stringify(userArmor); //stringify it
	localStorage.setItem(nameIn, jsonObject); //store it
	
	option    = document.createElement("option");
	option.text   = nameIn;
	savedGear.add(option);
	//store in loadable chest pieces

	alert("Holster created.");
	//Let user know it worked
	
}

function loadSavedGear(){
			for (var key in localStorage){
			var obj = localStorage.getItem(key);
				obj = JSON.parse(obj);
				if(obj.type == "holster"){
			
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
	
	majorAttribute_propertyInput.value=selectedItem.majorAttribute.property;
	addValue(majorAttribute_valueInput,selectedItem.majorAttribute.value);
	
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
	alert("Holster deleted.");
}

//Major Attribute Event Handlers
function updateValues(propertyInput,valueInput){	
	removeOptions(valueInput);
	
	switch(propertyInput.value){
		case "Protection vs Elites":
			valueInputsOne(valueInput);
			break;
		case "Skill Haste":
			valueInputsTwo(valueInput);
			break;
		case "Pistol Damage":
			valueInputsThree(valueInput);
			break;
		case "Armor (additional)":
			valueInputsFour(valueInput);
			break;
    default:
        text = "N/A";
	}	
}
function valueInputsOne(valueInput){
	for(var i = 3; i < 5; i++){
		option        = document.createElement("option");
		option.text   = i+"%";
		valueInput.add(option);
		
	}
}
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

