var userArmor;//The user-entered chest stats will be saved in this variable


//A sub-component of chest armor
function Attribute(property, value){
	this.property = property;
	this.value    = value;
}

//A sub-component of chest armor
function StatLayout(firearms, stamina, electronics){
	this.firearms    = firearms;
	this.stamina     = stamina;
	this.electronics = electronics;
}
//Full Constructor for chest armor
function ChestArmor(name, armor, statLayout, talent, majorAttributeI,majorAttributeII,minorAttribute) {
    this.name             = name;
    this.armor            = armor;
	
    this.statLayout       = statLayout;
    this.talent           = talent;
	
	this.majorAttributeI  = majorAttributeI;
	this.majorAttributeII = majorAttributeII;
	this.minorAttribute   = minorAttribute;
}



//Get all the elements in the work environment by id for later use. Set button click event.
function start()
{
	nameInput        		  = document.getElementById("nameInput");
	armorInput       		  = document.getElementById("armorInput");
	
	firearmsInput    	      = document.getElementById("firearmsInput");
	staminaInput     		  = document.getElementById("staminaInput");
	electronicsInput 		  = document.getElementById("electronicsInput");
	
	talentInput      		  = document.getElementById("talentInput");
	
	majorAttributeI_property  = document.getElementById("majorAttributeIProperty");
	majorAttributeI_value     = document.getElementById("majorAttributeIValue");
	
	majorAttributeII_property = document.getElementById("majorAttributeIIProperty");
	majorAttributeII_value    = document.getElementById("majorAttributeIIValue");
	
	minorAttribute_property   = document.getElementById("minorAttributeProperty");
	minorAttribute_value      = document.getElementById("minorAttributeValue");
	
	savedGear                 = document.getElementById("savedGear");
	loadSavedGear();
	
	loadButton                = document.getElementById("loadChest");
	loadButton.addEventListener("click", loadSelected, false);
	
	submitButton              = document.getElementById("submitChest");
	submitButton.addEventListener("click", createChest, false);
	
	deleteButton              = document.getElementById("deleteChest");
	deleteButton.addEventListener("click", deleteSelected, false);
	
} 

//Pull values from inputfields, create a chest piece using them.
function createChest(){
	nameIn        = nameInput.value;
	armorIn       = armorInput.value;
	talentIn      = talentInput.value;
	
	statLayoutIn  = new StatLayout(firearmsInput.value,
								   staminaInput.value,
								   electronicsInput.value);
	
	majorAttributeI  = new Attribute(majorAttributeI_property,majorAttributeI_value);
	majorAttributeII = new Attribute(majorAttributeII_property,majorAttributeII_value);
	minorAttribute   = new Attribute(minorAttribute_property,minorAttribute_value);
	
	userArmor = new ChestArmor(nameIn,
							   armorIn,
							   statLayoutIn,
							   talentIn,
							   majorAttributeI,
							   majorAttributeII,
							   minorAttribute);
alert("Chest Piece created!");

	var jsonObject = JSON.stringify(userArmor); //stringify it
	localStorage.setItem(nameIn, jsonObject); //store it
	
	var option    = document.createElement("option");
	option.text   = nameIn;
	savedGear.add(option);
	//store in loadable chest pieces.

}


function getValue() {
    var json_string = sessionStorage.getItem("Gupta"); //retrieve it
    var obj = JSON.parse(json_string)  //de-stringify
   // alert("Name = "+obj.Name + ", Age = " + obj.Age); //pull values
}

function loadSavedGear(){
	for (var key in localStorage){
   alert(/*key*/"Wow")
}
	
	if(localStorage.length > 0){
		for(var i = 0; localStorage.length > 0; i++){
			if(localStorage.getItem(i) !== "undefined"){
			//	alert(localStorage.getItem(i));
				var json_string = localStorage.getItem(i);
				var obj = JSON.parse(json_string);
			
				option = document.createElement("option");
				option.text = obj.name;
				savedGear.add(option);
			}
		}
	}
}

function loadSelected(){
	var json_string = localStorage.getItem(savedGear.value);
	var obj = JSON.parse(json_string);
	
	nameInput.value                  = obj.name;
	armorInput.value                 = obj.armor;
	
	firearmsInput.value              = obj.statLayout.firearms;
	staminaInput.value               = obj.statLayout.stamina;
	electronicsInput.value           = obj.statLayout.electronics;
	
	talentInput.value                = obj.talent;
	
	majorAttributeIProperty.value    = obj.majorAttributeI.property;
	majorAttributeIValue.value       = obj.majorAttributeI.value;
	
	majorAttributeIIProperty.value   = obj.majorAttributeII.property;
	majorAttributeIIValue.value      = obj.majorAttributeII.value;
	
	minorAttributeProperty.value     = obj.minorAttribute.property;
	minorAttributeValue.value        = obj.minorAttribute.value;
	
}

function deleteSelected(){
	localStorage.removeItem(savedGear.value);
}




window.addEventListener( "load", start, false );

