var jQueryWidget = function(element, valueAccessor, name, constructor) {
    var options = ko.utils.unwrapObservable(valueAccessor());
    var $element = $(element);
    setTimeout(function() { constructor($element, options) }, 0);
    //$element.data(name, $widget);

};


var my = my || {};

my.narrativeTip = 'Click to enter text';
my.availableKPIsVM = [];
my.projectKPIsVM = [];
my.removedKPIsVM = [];
my.history = [];
    
//ko ViewModel
projectVM = function () {
    var self = this;
    
    self.canEdit = ko.observable();
    self.changeStatusLU = ko.observable(false);
    self.maxChars = ko.observable();
    self.busyMessage = ko.observable('Loading')
    
    self.dialogIsOpen = ko.observable(false);
    
    self.ProjectID = '';
    self.ProjectStatusID = ko.observable('');
    self.SelectProjectStatus = ko.observable('');
    self.KeyAccomplishments = ko.observable('');
    self.KeyUpcomingEvents = ko.observable('');
    self.KeyRisksIssues = ko.observable('');
    
    self.ProjectKPI = {
    	status:ko.observable(),
    	level:ko.observable(),
    	levelID:ko.observable(),
    	icon:ko.observable(),
    	title:ko.observable()	
    };

    self.statusLookups = ko.observableArray();  
	self.kpis = ko.observableArray(my.projectKPIsVM).extend({trackChange:true});
	self.availableKpis = ko.observableArray(my.availableKPIsVM);
	self.history = ko.observableArray(my.history);
	
	self.isDirty = true;
	self.showHistory = false;
	self.allowUpdate = ko.observable(false);
	
	self.remainingCharsKey1 = ko.computed(function(){
		return self.KeyAccomplishments().length +' of ' +self.maxChars()+' chars';
	});
	self.remainingCharsKey2 = ko.computed(function(){
		return self.KeyUpcomingEvents().length +' of ' +self.maxChars()+' chars';
	});
	self.remainingCharsKey3 = ko.computed(function(){
		return self.KeyRisksIssues().length +' of ' +self.maxChars()+' chars';
	});
	
	self.narrativeEdit = function(item, event){
		$(event.target).text() == my.narrativeTip ? $(event.target).text('') : false;
	};
	self.showAvailableKPIs = function(){
		$('.projectStatusAvailableKPIsWrapper').show();
	};
	self.changeStatus = function(item, events){
		self.changeStatusLU(true);
	};
    self.addKPI = function(item, events){
    	self.availableKpis.remove(item);
    	self.kpis.push(item); 
    };
    self.removeKPI = function(item, events)
    { 	
    	//add the KPI to the list of KPIs to be removed
		if(item.kpiID() != 'New'){
			my.removedKPIsVM.push(ko.mapping.fromJS(ko.toJS(item)));}

    	//remove the KPI from the project
    	self.kpis.remove(item);  
		//add the KPI to the list of available KPIs that can be added to the project
    	self.availableKpis.push(item);
			self.availableKpis()[self.availableKpis().length - 1].kpiID('New');  // change the KPI's Cmd for the PBD to "New"
   				    	
    };
    self.changeKPILevel = function(item, event){
    	//debugger;
    	var x;
		$.each(my.KPILevels.KPILevel, function(i,v){			
			if( v.level == item.level()){
				x = i;	
			}
		});

    	var i = x+1 == my.KPILevels.KPILevel.length ? 0 : x+1;
    	//var i = item.level() == my.KPILevels.KPILevel[my.KPILevels.KPILevel.length-1].level ? 0 : item.level();
    	item.icon(my.KPILevels.KPILevel[parseInt(i)]['icon']).level(my.KPILevels.KPILevel[parseInt(i)]['level']).levelID(my.KPILevels.KPILevel[parseInt(i)]['levelID']);
    	//console.log(item.level()+' - '+item.levelID());
    };
    self.update = function(item, event){
    	self.allowUpdate(false);
    	self.busyMessage('Updating');
    	var KeyStatusText = '';
		KeyStatusText += '<SetList>%Projects%</SetList>\
						<SetVar Name="ID">'+self.ProjectID+'</SetVar><SetVar Name="Cmd">Save</SetVar>\
						<SetVar Name="urn:schemas-microsoft-com:office:office#KeyAccomplishments">'+self.KeyAccomplishments()+'</SetVar>\
						<SetVar Name="urn:schemas-microsoft-com:office:office#KeyUpcomingEvents">'+self.KeyUpcomingEvents()+'</SetVar>\
						<SetVar Name="urn:schemas-microsoft-com:office:office#KeyRisksIssues">'+self.KeyRisksIssues()+'</SetVar>\
						<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectStatusKPI">'+self.ProjectKPI.levelID()+'</SetVar>\
						<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectStatusID">'+self.ProjectStatusID()+'</SetVar>\
						<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectStatus">'+self.ProjectKPI.status()+'</SetVar>\
						<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_2"><Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+self.ProjectKPI.status()+'</LookupDbStoreValue><LookupDisplayValue>'+self.ProjectKPI.status()+'</LookupDisplayValue></Property></Properties></SetVar>';						
		var KPIUpdate = '';
		$.each(self.kpis(), function(i,v){			
			KPIUpdate += '<Method ID="B'+i+'">\
				<SetList>%ProjectKPIs%</SetList>\
				<SetVar Name="ID">'+v.kpiID()+'</SetVar><SetVar Name="Cmd">Save</SetVar>\
				<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectKPICategory">'+ v.categoryID +'</SetVar>\
				<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectKPILevel">'+ v.levelID() +'</SetVar>\
			</Method>';
		});
		$.each(my.removedKPIsVM, function(i,v){	
			KPIUpdate += '<Method ID="B'+i+'">\
				<SetList>%ProjectKPIs%</SetList>\
				<SetVar Name="ID">'+v.kpiID()+'</SetVar><SetVar Name="Cmd">Delete</SetVar>\
			</Method>';
		});
		my.removedKPIsVM = [];
		//console.log(KPIUpdate);
		saveData(KeyStatusText, KPIUpdate);
    }
    self.openDialog = function(){
    	self.dialogIsOpen(true);
    }
    self.closeDialog = function(){
    	self.dialogIsOpen(false);
    }
    self.ProjectStatusID.subscribe(function(newValue){
    	console.log(newValue.statusID);
    	self.changeStatusLU(false);
    	self.ProjectKPI.status('')
    });
};

//custom binding to handle contenteditable div
ko.bindingHandlers.editableText = {
    init: function(element, valueAccessor) {
        $(element).on('blur', function() {
            var observable = valueAccessor();
            observable( $(this).text() );
        });
    },
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).text(value);
    }
};
//custom binding for remaining characters
ko.bindingHandlers.limitCharacters = {
    update: function(element, valueAccessor, allBindingsAccessor, viewModel)
    {
    	//console.log(element.value.length +' | '+valueAccessor());
    	if(element.value.length > valueAccessor()){
       		element.value = element.value.substr(0, valueAccessor());
	       	allBindingsAccessor().value(element.value.substr(0, valueAccessor()));
       }
    }
};

//custom binding for jquery UI Dialog
ko.bindingHandlers.dialog = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var options = ko.utils.unwrapObservable(valueAccessor()) || {};
            //do in a setTimeout, so the applyBindings doesn't bind twice from element being copied and moved to bottom
            setTimeout(function() { 
                options.close = function() {
                    allBindingsAccessor().dialogVisible(false);                        
                };
                
                $(element).dialog(options);          
            }, 0);
            
            //handle disposal (not strictly necessary in this scenario)
             ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                 $(element).dialog("destroy");
             });   
        },
        update: function(element, valueAccessor, allBindingsAccessor) {
            var shouldBeOpen = ko.utils.unwrapObservable(allBindingsAccessor().dialogVisible),
                $el = $(element),
                dialog = $el.data("uiDialog") || $el.data("dialog");
            
            //don't call open/close before initilization
            if (dialog) {
                $el.dialog(shouldBeOpen ? "open" : "close");
            }  
        }
};
ko.extenders.trackChange = function (target, track) {
    if (track) {
        target.isDirty = ko.observable(false);
        target.originalValue = target();
        target.subscribe(function (newValue) {
            // use != not !== so numbers will equate naturally
            target.isDirty(newValue != target.originalValue);
        });
    }
    return target;
};



//create a new instance of the ko ViewModel defined above for my usage.
my.projectVM = new projectVM();

//apply Binding to my instance of ViewModel
ko.applyBindings(my.projectVM);
