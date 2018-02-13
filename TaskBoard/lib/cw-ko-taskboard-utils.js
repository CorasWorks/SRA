var cw = cw || {};
cw.utils = (function($) {

	
	// BEGIN KNOCKOUT BINDING HANDLERS

	//jqAuto -- main binding (should contain additional options to pass to autocomplete)
	//jqAutoSource -- the array of choices
	//jqAutoValue -- where to write the selected value
	//jqAutoSourceLabel -- the property that should be displayed in the possible choices
	//jqAutoSourceInputValue -- the property that should be displayed in the input box
	//jqAutoSourceValue -- the property to use for the value
	ko.bindingHandlers.jqAuto = {
	    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
	        var options = valueAccessor() || {},
	            allBindings = allBindingsAccessor(),
	            unwrap = ko.utils.unwrapObservable,
	            modelValue = allBindings.jqAutoValue,
	            source = allBindings.jqAutoSource,
	            valueProp = allBindings.jqAutoSourceValue,
	            inputValueProp = allBindings.jqAutoSourceInputValue || valueProp,
	            labelProp = allBindings.jqAutoSourceLabel || valueProp;
	
	        //function that is shared by both select and change event handlers
	        function writeValueToModel(valueToWrite) {
	            if (ko.isWriteableObservable(modelValue)) {
	               modelValue(valueToWrite );  
	            } else {  //write to non-observable
	               if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers']['jqAutoValue'])
	                        allBindings['_ko_property_writers']['jqAutoValue'](valueToWrite );    
	            }
	        }
	        
	        //on a selection write the proper value to the model
	        options.select = function(event, ui) {
	            writeValueToModel(ui.item ? ui.item.actualValue : null);
	        };
	            
	        //on a change, make sure that it is a valid value or clear out the model value
	        options.change = function(event, ui) {
	            var currentValue = $(element).val();
	            var matchingItem =  ko.utils.arrayFirst(unwrap(source), function(item) {  
	               return unwrap(inputValueProp ? item[inputValueProp] : item) === currentValue; 
	            });
	            
	            if (!matchingItem) {
	               writeValueToModel(null);
	            }    
	        }
	        
	        
	        //handle the choices being updated in a DO, to decouple value updates from source (options) updates
	        var mappedSource = ko.dependentObservable(function() {
	                mapped = ko.utils.arrayMap(unwrap(source), function(item) {
	                    var result = {};
	                    result.label = labelProp ? unwrap(item[labelProp]) : unwrap(item).toString();  //show in pop-up choices
	                    result.value = inputValueProp ? unwrap(item[inputValueProp]) : unwrap(item).toString();  //show in input box
	                    result.actualValue = valueProp ? unwrap(item[valueProp]) : item;  //store in model
	                    return result;
	            });
	            return mapped;                
	        }, null, { disposeWhenNodeIsRemoved: element });
	        
	        //whenever the items that make up the source are updated, make sure that autocomplete knows it
	        mappedSource.subscribe(function(newValue) {
	           $(element).autocomplete("option", "source", newValue); 
	        });
	        
	        options.source = mappedSource();
	        
	        //initialize autocomplete
	        $(element).autocomplete(options);
	    },
	    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
	       //update value based on a model change
	       var allBindings = allBindingsAccessor(),
	           unwrap = ko.utils.unwrapObservable,
	           modelValue = unwrap(allBindings.jqAutoValue) || '', 
	           valueProp = allBindings.jqAutoSourceValue,
	           inputValueProp = allBindings.jqAutoSourceInputValue || valueProp;
	        
	       //if we are writing a different property to the input than we are writing to the model, then locate the object
	       if (valueProp && inputValueProp !== valueProp) {
	           var source = unwrap(allBindings.jqAutoSource) || [];
	           var modelValue = ko.utils.arrayFirst(source, function(item) {
	                 return unwrap(item[valueProp]) === modelValue;
	           }) || {};  //probably don't need the || {}, but just protect against a bad value          
	       } 
	
	       //update the element with the value that should be shown in the input
	       $(element).val(modelValue && inputValueProp !== valueProp ? unwrap(modelValue[inputValueProp]) : modelValue.toString());    
	    }
	};
	
	//custom binding to initialize a jQuery UI dialog
	ko.bindingHandlers.jqDialog = {
	    init: function(element, valueAccessor) {
	        var options = ko.utils.unwrapObservable(valueAccessor()) || {};
	        
	        //handle disposal
	        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	            $(element).dialog("destroy");
	        }); 
	        
	        //dialog is moved to the bottom of the page by jQuery UI. Prevent initial pass of ko.applyBindings from hitting it
	        setTimeout(function() {
	            $(element).dialog(options);  
	        }, 0);
	    }
	};

	//custom binding handler that opens/closes the dialog
	ko.bindingHandlers.openDialog = {
	    update: function(element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        $(element).dialog();
	        if (value) {
	            $(element).dialog("open");
	        } else {
	            $(element).dialog("close");
	        }
	    }
	}

	//custom binding to initialize a jQuery UI button
	ko.bindingHandlers.jqButton = {
	    init: function(element, valueAccessor) {
	        var options = ko.utils.unwrapObservable(valueAccessor()) || {};
	        
	        //handle disposal
	        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	            $(element).button("destroy");
	        }); 
	        
	        $(element).button(options);  
	    }    
	};

	//Binding Handler to set value of progress bar jqueryui widget
	ko.bindingHandlers.progress = {
	    init: function(element, valueAccessor) {
	        $(element).progressbar({
	            value: 0
	        });
	    },
	    update: function(element, valueAccessor) {
	        var val = ko.utils.unwrapObservable(valueAccessor());
	       $(element).progressbar("value", parseFloat(val));
	    }
	};
	

	// Custom Binding for JQUERYUI DatePicker
	ko.bindingHandlers.datepicker = {
	    init: function(element, valueAccessor, allBindingsAccessor) {
	        var options = allBindingsAccessor().datepickerOptions || {},
	            $el = $(element);
	
	        //initialize datepicker with some optional options
	        $el.datepicker(options);
	
	        //handle the field changing
	        ko.utils.registerEventHandler(element, "change", function() {
	            var observable = valueAccessor();
	            //alert($.datepicker.parseDate('yy-mm-dd', $el.datepicker("getDate")));
	            //var test = $el.datepicker("getDate");
	            //observable($el.val());
	            observable($el.datepicker("getDate"));
	        });
	
	        //handle disposal (if KO removes by the template binding)
	        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	            $el.datepicker("destroy");
	        });
	
	    },
	    update: function(element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor()),
	            $el = $(element),
	            current = $el.datepicker("getDate");
	
	        if (value - current !== 0) {
	            $el.datepicker("setDate", value);   
	        }
	    }
	};

	ko.bindingHandlers.slider = {
	  init: function (element, valueAccessor, allBindingsAccessor) {
	    var options = allBindingsAccessor().sliderOptions || {};
	    $(element).slider(options);
	    ko.utils.registerEventHandler(element, "slidechange", function (event, ui) {
	        var observable = valueAccessor();
	        observable(ui.value);
	    });
	    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
	        $(element).slider("destroy");
	    });
	    ko.utils.registerEventHandler(element, "slide", function (event, ui) {
	        var observable = valueAccessor();
	        observable(ui.value);
	    });
	  },
	  update: function (element, valueAccessor) {
	    var value = ko.utils.unwrapObservable(valueAccessor());
	    if (isNaN(value)) value = 0;
	    $(element).slider("value", value);

	  }
};

	// Logging utility to track observables and how frequently binding is happening.
	ko.bindingHandlers.logger = {
        update: function(element, valueAccessor, allBindings) {
            //store a counter with this element
            var count = ko.utils.domData.get(element, "_ko_logger") || 0,
                data = ko.toJS(valueAccessor() || allBindings());

            ko.utils.domData.set(element, "_ko_logger", ++count);

            if (console && console.log) {
                //console.log(count, element, data);
            }
        }
    };

	// END KNOCKOUT BINDING HANDLERS

	// BEGIN TASK BOARD HELPER FUNCTIONS
	//Date Stuff
	// THis function isn't used any longer it doesn't seem to work well with IE.
	function formatDateNew(date)
	{
		var newDate;
		if (date){
			var dtStr = date.split(' ')[0];
			var dtParts = dtStr.split('-');
			var dd = dtParts[1];
			var mm = dtParts[2];
			var yyyy = dtParts[0];
			newDate = mm+'-'+dd+'-'+yyyy;
		} else { newDate = date }
		return newDate;
		/*var testDate = date.getMonth();
		if (date.getMonth() != NaN){
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} newDate = mm+'-'+dd+'-'+yyyy;
		}
		else { newDate = date; }
		return newDate;*/
		
	}
	
	function formatDateForSave(date)
	{
		var newDate;
		date = new Date(date);
		if (date.getMonth() !== NaN){
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} newDate = yyyy+'-'+mm+'-'+dd;
		} else { newDate = date; }
		return newDate;

	}

	function formatDate(date, dateFormat)
	{
		var dateParts;
		var	timeParts;
		var theDate;
		
		var year;
		var monthText;
		var day;
		var hour;
		var minute;

		if (Object.prototype.toString.call(date) === '[object Date]'){
			date = date.toString();
		}
		
		if (date){
			dateParts = (date.slice(0,10)).split('-');
			timeParts = (date.slice(12)).split(':');
			
			if (dateParts[0].length > 2){
				year = dateParts[0];
				month =dateParts[1];
				day = dateParts[2];
			} else {
				year = dateParts[2];
				month = dateParts[0];
				day = dateParts[1];
			}
			
			switch(month)
			{
				case '01':
					monthText = 'Jan';
					break;
				case '02':
					monthText = 'Feb';
					break;
				case '03':
					monthText = 'Mar';
					break;
				case '04':
					monthText = 'Apr';
					break;
				case '05':
					monthText = 'May';
					break;
				case '06':
					monthText = 'Jun';
					break;
				case '07':
					monthText = 'Jul';
					break;
				case '08':
					monthText = 'Aug';
					break;
				case '09':
					monthText = 'Sep';
					break;
				case '10':
					monthText = 'Oct';
					break;
				case '11':
					monthText = 'Nov';
					break;
				case '12':
					monthText = 'Dec';
					break;			
			}
	
			//day = dateParts[2];
			//month = parseInt(month);
			//if(day<10){day='0'+day} if(month<10){month='0'+month} 
			
			hour = timeParts[0];
			minute = timeParts[1];
			
			switch(dateFormat)
			{
				case 'dd/MM/yyyy':
					theDate = day+"/"+month+"/"+year;
					break;
				case 'dd-MM-yyyy':
					theDate = day+"-"+month+"-"+year;
					break;					
				case 'MM/dd/yyyy':
					theDate = month+"/"+day+"/"+year;
					break;
				case 'MM-dd-yyyy':
					theDate = month+"-"+day+"-"+year;
					break;
				case 'MMM d, yyyy':
					theDate = monthText+" "+day+", "+year;	
					break;
				case 'UTC':
					theDate = new Date(year, month-1, day, hour, minute,0,0);
					break;
				case 'Primitive':
					theDate = new Date(year, month-1, day, hour != undefined ? hour : 0, minute != undefined ? minute : 0,0,0).valueOf();
					break;				 
			}	
			
			return theDate;}
		else
			return date;
			
	}

	// This is crazy user parsing, this could be done better if collected more
	// efficiently from the server :(
		//"6;#Joe Lewis;#1;#David Smiley"
	function getSPUserArray1(assignedToVal){	
		var assignedToTemp = [];
		var assignedToIdsTemp = [];
		if (assignedToVal){
			if (assignedToVal.value.split(';#').length > 1){
				var counter = 1;
				var newID, newName;
				$.each(assignedToVal.value.split(';#'), function(index, str){
					if (index == 0){
						assignedToTemp.push({id: assignedToVal.ID, val: str, selected: true});
						assignedToIdsTemp.push(assignedToVal.ID); 
					}
					else{
						if (index % 2 > 0){ newID = str; }
						else { newName = str; }
						if (counter == 2) { 
							//assignedToTemp.push(new SPUserModel(newID, newName, true)); 
							assignedToTemp.push({id: newID, val: newName, selected: true});
							assignedToIdsTemp.push(newID); 
							counter = 1;
						}
						else { counter++; }
					}
				});
			}
			else { 
				//assignedToTemp.push(new SPUserModel(item.AssignedTo.ID, item.AssignedTo.value, true));
				assignedToTemp.push({id: assignedToVal.ID, val: assignedToVal.value, selected: true}) 
				assignedToIdsTemp.push(assignedToVal.ID); 
			}
		}
		return {users: assignedToTemp, ids: assignedToIdsTemp};
	}

	// This is crazy user parsing, this could be done better if collected more
	// efficiently from the server :(
		//"6;#Joe Lewis;#1;#David Smiley"
	function getSPUserArray(assignedToVal){	
		var assignedToTemp = [];
		var assignedToIdsTemp = [];
		//if(typeof myVar != 'undefined')
		if (typeof assignedToVal != 'undefined'){
			if (assignedToVal.split(';#').length > 1){
				var counter = 1;
				var newID, newName;

				$.each(assignedToVal.split(';#'), function(index, str){
					if (index % 2 == 0) { newID = str; }
					else { newName = str; }
					if (counter == 2) { 
							//assignedToTemp.push(new SPUserModel(newID, newName, true)); 
							assignedToTemp.push({id: newID, val: newName, selected: true});
							assignedToIdsTemp.push(newID); 
							counter = 1;
						}
						else { counter++; }
				});
			}

		}
		return {users: assignedToTemp, ids: assignedToIdsTemp};
	}

	// END TASKBOARD HELPER FUNCTIONS
	   return { formatDateNew: formatDateNew, formatDateForSave: formatDateForSave, getSPUserArray: getSPUserArray, formatDate: formatDate };
})(jQuery);



	
	





