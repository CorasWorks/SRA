
(function($){
	//declare & set global script variables	 
	var URL4CAPS = '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx';
	var LocalSPWebUrl = 'sites/bacaps';
	var LocalDateFormat = 'MM-dd-yyyy';
	var RIGHTNOW = cw.utils.formatDate(new Date().toString(), LocalDateFormat);
	
	// CorasWorks Application Service Helper function
	// Parameters: data - the data object to post into the caps call.
	// Returns a promise	
	// NOTE:  This has been depricated, start using caps.js for all CAPS calls!	   
	function capsCallPromise(data)
	{
		return $.ajax(
		{	url: URL4CAPS, 
			data: data, 
			dataType: 'json', 
			async: true, 
			cache: false
		});		
	} 
	var RootBase = '';
	$.ajax({
		 type:'POST',
         dataType:'json',
         cache: false,
		 async : true,
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'CheckVariables',
			TableName: 'BaseNav',
			CWVariable: '[SRA Root]',
			OutputType : 'json'
		},
		success: function(json){
					RootBase = json.NewDataSet.BaseNav.CWVariable.value;
			
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});		
    
    // SPUser Column Value Model for user selection and display
    var SPUserModel = function(id, name, selected) {
    	this.id = ko.observable(id);
    	this.name = ko.observable(name);
    	this.selected = ko.observable(selected); //  This is used for user assignment checkboxes
    };
    
    // Priorities Data Model
    var PriorityModel = function (id, value){
    	this.id = ko.observable(id);
    	this.value = ko.observable(value);
    	//this.icon = ko.observable(icon);
    };
		
	//TaskBoard Status Column Model
	var statusColumnModel = function(id, value){
		this.id = ko.observable(id);
		this.title = ko.observable(value);
		//this.tasks = ko.observableArray(tasks);
	};
	
	// TaskBoard Task Item Model
	var taskItemModel = function(){
		var self = this;

		// Task item specific data model properties
		this.id = ko.observable();
		this.title = ko.observable();
		this.assignedTo = ko.observableArray([]);
		this.priority = ko.observable();
		this.startDate = ko.observable();
		this.dueDate = ko.observable();
		this.status = ko.observable();
		this.perCompleteRaw = ko.observable(0.0);
		this.perComplete = ko.computed({
			read: function(){
				return this.perCompleteRaw() * 100
			},
			write: function(value){
				this.perCompleteRaw(value/100);
			},
			owner: this
		});
		
		// Task Item View Model Properties
		this.isNew = ko.observable(true); // Is this a new form?
		this.isUserEdit = ko.observable(false);
		this.showDetails = ko.observable(false);
		this.assignedToToolTip = ko.observable();
		this.showAssignedTo = ko.observable(false); //Toggle for displaying users on edit and new task forms.
		this.itemCopyForRevert = ko.observable(); // Hold a temp model of the task item incase we need to restore.
		this.pastDue = ko.computed(function(){
			if (this.dueDate())
			{
				return(new Date(this.dueDate()) < new Date());
			}
			else { return false; }
			//return (cw.utils.formatDate(this.dueDate(), 'Primitive') < new Date() );
		}, this);
		// Build the icon represented on the task item based on the priority ID
		this.priorityIcon = ko.computed({
			read: function(){
				if (this.priority().id() == "3"){
					return RootBase+ "/Resources/TaskBoard/Images/star_green.png";
				}
				else if (this.priority().id() == "2"){
					return RootBase+ "/Resources/TaskBoard/Images/star_blue.png";
				}
				else if (this.priority().id() == "1"){
					return RootBase+ "/Resources/TaskBoard/Images/star_red.png";
				}
			},
			owner: this,
			deferEvaluation: true
		});
		this.assignedToIcon = ko.computed(function(){
			var icon = '';
			var isMe = false;
			if (this.assignedTo() != null && this.assignedTo().length > 0){
				$.each(self.assignedTo(), function(index, user){
					if (this.name() == me){ 
						isMe = true;
					}
				});
				if (isMe) { icon = RootBase+ "/Resources/TaskBoard/Images/hat_green.png"; this.assignedToToolTip("My Task"); }
				else { this.assignedToToolTip("Assigned"); icon = RootBase+ "/Resources/TaskBoard/Images/hat_gray.png"; }
			}
			else { 
				this.assignedToToolTip("Unassinged"); 
				icon = RootBase+ "/Resources/TaskBoard/Images/hat_red.png";
			}
			return icon;
		}, this);

		// Restores the original state of the task model and discards any changes made by the user.
		this.restoreState = function(){
			if (!this.isNew()){
				var liveTaskItem = ko.utils.arrayFirst(vm.boardItems(), function(taskItem){
					return taskItem.id() == this.id();
				}, this);
				vm.boardItems.remove(liveTaskItem);
				vm.boardItems.push(this.itemCopyForRevert());
				this.itemCopyForRevert("");
			}
			vm.selectedTaskItem("");
		}.bind(this);

		// Subscript to Status Value so that we can update the percentage complete value when certain 
		// status values are set to the current task.
		this.taskStatusSubscription = this.status.subscribe(function(value){
			if (this.isUserEdit()){
				if (this.status().title() === 'In Progress'){
					if (this.perCompleteRaw() < 0.25) { this.perCompleteRaw(0.25); }
					if (this.perCompleteRaw() > 0.75) { this.perCompleteRaw(0.75); }
					if (this.assignedTo().length === 0){
						this.assignedTo.push(new SPUserModel(vm.currentUser.id, vm.currentUser.displayName, true));
					}
				}
				else if (this.status().title() === 'Completed'){
					this.perCompleteRaw(1);
				}
				else if (this.status().title() === 'Not Started'){
					if (this.perCompleteRaw() > 0.0) { this.perCompleteRaw(0); }
				}
			}
			this.isUserEdit(false);
		},this);
		
		// This is used for user selection checkbox binding when assigning users to tasks.
		this.assignedToIds = ko.observableArray();
		
		//Task Item Model Events
		this.showDetailsClick = function(){	this.showDetails(!this.showDetails());	};
		this.showAssignedToClick = function(){ this.showAssignedTo(!this.showAssignedTo()); }; // Toggles user selection in new and edit form.
		
		// When a user is selected from the checkbox list toggle the selected property of the SPUserModel item
		// that is passed into the function.  We should also remove or add the current item into the 
		// assignedTo observable array on the task item.
		this.toggleAssignedToUserClick = function(item){
			var isNewUser = true;
			var self = this;
			$.each(self.assignedTo(), function(index, thisUser){
				if (thisUser.id() == item.id()){
					isNewUser = false;
					if (thisUser.selected() === true){
						self.assignedTo.remove(thisUser);
				 	}
				 	else {
						self.assignedTo.push(item);
					}
					item.selected(!(item.selected()));
				}
			});
			if (isNewUser) {  this.assignedTo.push(item); item.selected(!(item.selected())); }
	        return true;
		}.bind(this);
		
		// Task Item Model Functions
		
		// Function to build the Batch: Parameter in the caps.js ProcessBatchData Request method.
		this.itemBatchData = function(){
			var taskTitle = this.title().replace("&","%26");//replace & with %26
			var userString = '';
			$.each(this.assignedTo(), function(index, user){
				if (index > 0){ userString += ';#;#'; }
				userString += user.id();
			});
			var items = [{ Title: taskTitle, 
						   AssignedTo: userString, 
						   Priority: this.priority().value(), 
						   Status: this.status().title(), 
						   PercentComplete: this.perCompleteRaw()}];
						//alert(this.startDate());
			if (this.startDate()) { $.extend(items[0], { StartDate: this.formatDateForSave(this.startDate()) }); }
			if (this.dueDate())	{ $.extend(items[0], { DueDate: this.formatDateForSave(this.dueDate()) }); }

			if (!this.isNew()){ $.extend(items[0], { Id: this.id()}); }
			

			//var test = { method: self.isNew() ? 'create' : 'update', items: items  };
			return { method: this.isNew() ? 'create' : 'update', items: items  };
		};
		
		this.formatDateForDisplay = function(date) {
			if (date){
			//$.datepicker.parseDate('yy-mm-dd', '2014-12-02 00:00:00')
			    /* Steve Testing
                var newDate = new Date(date);
				return $.datepicker.formatDate('mm-dd-yy', newDate);
                */
			    var newDate = new Date($.datepicker.parseDate('yy-mm-dd', date));
			    return $.datepicker.formatDate('mm-dd-yy', newDate);
			}
		}
		this.formatDateForSave = function(date) {
			if (date){
				var newDate = new Date($.datepicker.parseDate('yy-mm-dd',date));
				return $.datepicker.formatDate('yy-mm-dd', newDate);
			}
		}
	};
	
	// Our Knockout Board View Model.
	// This is the main model for the task board application.
	var BoardViewModel = function(config){
		var self=this;
		
		// View Model properties
		this.boardColumns = ko.observableArray(config.boardColumns);
		this.boardItems = ko.observableArray(config.boardItems);
		this.priorityValues = ko.observableArray(config.priorityValues);
		this.showProgressBar = ko.observable(false);
		this.showDetails = ko.observable(false);		
		this.selectedTaskItem = ko.observable();
		this.selectedFilter = ko.observable("Show All Tasks");
		this.textFilter = ko.observable();
		this.users = ko.observableArray(config.spUsers);
		this.showFilterByUser = ko.observable(true);
		this.selectedFilterUser = ko.observable('');
		this.currentUser = config.currentUser;
		
		// View Model Events
		// Loads the Add/Edit form with a new Task Item and set's it as selected so the form shows.
		this.addNewTaskClick = function(){
			var newTask = new taskItemModel();
			newTask.isUserEdit(true);
			newTask.showAssignedTo(true);
			newTask.id(0);
			newTask.title("New Task");
			//newTask.priority({'ID': '1','value': 'Low' });
			this.selectedTaskItem(newTask);
		};
		
		// Save the new task item and call caps.
		this.saveNewTaskClick = function(task){
			var newTask = task;
			var self = this;
			caps.processBatchData({ site: LocalSPWebUrl, listTitle: 'Tasks', batch: task.itemBatchData() }).then(function (data, textStatus, jqXHR) {
				if (caps.fn.checkNested(data.NewDataSet.ProcessBatchData.Results.Results.Result.Code)){
					if (data.NewDataSet.ProcessBatchData.Results.Results.Result.Code == "0"){
						newTask.id(data.NewDataSet.ProcessBatchData.Results.Results.Result.ID[1]);
						self.boardItems.push(newTask);
						self.selectedTaskItem("");
					}
				}
			}, function( jqXHR, textStatus, errorThrown){ alert('An error occured while creating new task!'); });
		}.bind(this);
		
		// Set the current selected task so the edit form shows.
		this.showEditTaskClick = function(task){
			task.isNew(false);
			task.isUserEdit(true);
			self.selectedTaskItem(task); //This needs self because we're binding to the task item.
			
			// Temp task setup so we can restore if the user decides to cancel edit.
			var tempTask = new taskItemModel();
			tempTask.id(task.id());
			tempTask.title(task.title());
			tempTask.priority(task.priority());
			tempTask.assignedTo(task.assignedTo());
			tempTask.assignedToIds(task.assignedToIds());
			tempTask.startDate(task.startDate());
			tempTask.dueDate(task.dueDate());
			tempTask.status(task.status());
			tempTask.perCompleteRaw(task.perCompleteRaw());
			task.itemCopyForRevert(tempTask);
		};
		
		// Update the task and call caps.
		this.updateTaskClick = function(task){
		 	var self = this;
		    caps.processBatchData({ site: LocalSPWebUrl, listTitle: 'Tasks', batch: task.itemBatchData() }).then(function (data, textStatus, jqXHR) {
				if (caps.fn.checkNested(data.NewDataSet.ProcessBatchData.Results.Results.Result.Code)){
					if (data.NewDataSet.ProcessBatchData.Results.Results.Result.Code == "0"){
						self.selectedTaskItem("");  // We call self here because we're bound to the task item not the view model.
					}
				}
			}, function( jqXHR, textStatus, errorThrown){ alert('An error occured while updating task!'); });
		}.bind(this);

		// Show the user selection dropdownbox to filter tasks by user.
		this.filterByUserClick = function(){
			this.showFilterByUser(!this.showFilterByUser());
			if (!this.showFilterByUser()) { this.selectedFilter("Show All Tasks"); }
		};
		
		// Sets the View Model filter type (this = filter type string).
		this.filterTasksClick = function(){
			self.selectedFilter(this);  // this = a filter string value passed in via the view, so we have to reference the view model by self.
		};
		
		// Use this subscription to the View Model textFilter property.  If the value changes
		// set the View Model selectedFilter to filter the tiles by the text.
		this.filterSubscription = this.textFilter.subscribe(function(value){
			this.selectedFilter("by Task Tiles");
			if (this.textFilter() == null){
				this.selectedFilter("Show All Tasks");
			}	
		}, this);
		
		// Use this subscription to the View Model FilterByUser property.  If the value changes
		// set the View Model selectedFilter to filter the tiles by the user.
		this.filterByUserSubscription = this.selectedFilterUser.subscribe(function(){
			this.selectedFilter("by User Tasks");
			if (this.selectedFilterUser() == null){
				this.selectedFilter("Show All Tasks");

			}
		},this);
		
		
		// Update task list when task item is moved to a new status column.
		this.taskMoved = function(arg){
			var id = this.attributes.rawid.nodeValue;
			if (id != arg.item.status().id())
			{
				arg.item.isUserEdit(true);
				arg.item.status(ko.utils.arrayFirst(vm.boardColumns(), function(statusItem){ return statusItem.id() == id }));
				arg.item.isNew(false);
				caps.processBatchData({ site: LocalSPWebUrl, listTitle: 'Tasks', batch: arg.item.itemBatchData() });
			}
		};
		// Save the toggled priority value to the sharepoint list.
		this.taskPriorityStarClick = function(task){
			task.isNew(false);  // Set the isNew flag so it gets treated as an update.
			var priorityIdVal = parseInt(task.priority().id());

			// Increment the ID value until it gets to 3 then reset back around to 1
			if (priorityIdVal < 3) { priorityIdVal++; } else { priorityIdVal = 1; }

			task.priority(ko.utils.arrayFirst(vm.priorityValues(), function(item){
				return priorityIdVal == item.id();
			}));

			caps.processBatchData({ site: LocalSPWebUrl, listTitle: 'Tasks', batch: task.itemBatchData() });
		};
		
		// View Model Functions
		// Apply the current filter to the current task.
		// Parameters: task - the current task item model.
		//			   filter - the current filter type string value.
		this.filterMe = function(task, filter, taskBoard){
				return ko.computed(function(){
					//debugger;
					var returnVal = false;
					var filterVal = filter().toString();
					switch (filterVal){
						case "Show All Tasks":
						case "Show All Priorities":
							returnVal = true;	
							break;	
						case "Show High Priorities":
							if (task.priority().value() === "(1) High")
								returnVal = true;
								break;
						case "Show Low Priorities":
							if (task.priority().value() === "(3) Low")
								returnVal = true;
							break;
						case "Show Normal Priorities":
							if (task.priority().value() === "(2) Normal")
								returnVal = true;
							break;
						case "Show All Unassigned":
							if (!task.assignedTo() || task.assignedTo().length == 0)
								returnVal = true;
							break;
						case "by User Tasks":
							if (task.assignedTo() != null && task.assignedTo().length > 0 && taskBoard.selectedFilterUser){
								$.each(task.assignedTo(), function(index, user){
									if (user.name() == taskBoard.selectedFilterUser().name()){ returnVal = true; }
								});
							}
							break;
						case "Show My Tasks":
							if (task.assignedTo() != null && task.assignedTo().length > 0){
								$.each(task.assignedTo(), function(index, user){
									if (user.name() == config.currentUser.displayName){ returnVal = true; }
								});
							}
							break;
						case "Show Past Due":
							if (task.pastDue())
								returnVal = true;
							break;
						case "by Task Tiles":
							if (task.title().indexOf(taskBoard.textFilter()) != -1){
								returnVal = true;
								break;
							} 
						default:
							returnVal = false;
							break;
					}
					return returnVal;
			});
		};

		// Added a tasksByStatus filter function to more dynamically reflect the position of the task based
		// on the status.  Originally I was using a tasks collection on the status Column Model but this proved
		// difficult to work with and maintain.
		this.tasksByStatus = function (statusCol){
			var col = statusCol;
			return ko.utils.arrayFilter(this.boardItems(), function(item) {
	            return item.status().id() == col.id();
	        });
		};
	};
	// Declare View Model variable for later use.
	var vm = null;
	var me;

 
	
	//Load Data from Server and bind knockout view model
	var boardConfig = { boardColumns: [], boardItems: [], priorityValues: [], cwVariables: [], currentUser:{}, username: "", spUsers: [] };
	var boardData = {RequestType: 'BatchRequest', ConfigFileLocation: '[SRA Root]/Resources/TaskBoard/batchrequest.xml', XsltLocation: '[SRA Root]/Resources/TaskBoard/batchrequest.xslt', OutputType: 'json'};
	

	var capsUserData = capsCallPromise({ RequestType: 'GetSiteUsers', OutputType: 'json'});
	var capsCwVariables = capsCallPromise({ RequestType: 'CheckVariables', OutputType: 'json'});
	var capsTaskBoardComponents = capsCallPromise({RequestType: 'GetListInfo', ListTitle: 'Tasks', XsltLocation: '[SRA Root]/Resources/TaskBoard/TaskBoardColumns.xslt', OutputType: 'json'});
	var capsTaskBoardItems = capsCallPromise({ RequestType: 'BatchRequest', ConfigFileLocation: '[SRA Root]/Resources/TaskBoard/TaskBoardCDB.xml', XsltLocation: '[SRA Root]/Resources/TaskBoard/TaskBoard.xslt', OutputType: 'json' });


	$.when(capsUserData, capsTaskBoardComponents, capsTaskBoardItems, capsCwVariables).then(function(users, boardComponents, boardItems, variables){
		var cwvars = variables[0].NewDataSet.CheckVariables.CWVariable;
		$.each(cwvars, function(index, variable){
			if (variable.name === 'CWUID') {$.extend(boardConfig.currentUser, {id: variable.value});}
			if (variable.name === 'Me') {$.extend(boardConfig.currentUser, {displayName: variable.value});}
			if (variable.name === 'MeLoginName') {$.extend(boardConfig.currentUser, {loginName: variable.value});}
			if (variable.name === 'MeEmail') {$.extend(boardConfig.currentUser, {email: variable.value});}
		});
		//boardConfig.currentUser = { id: cwvars.CWUID, displayName: cwvars.Me, loginName: cwvars.MeLoginName, email: cwvars.MeEmail };
		boardConfig.username = boardConfig.currentUser.displayName;
		me = boardConfig.currentUser.displayName;

		// Build collection of sharepoint users for user selection of tasks.
		$.each(users[0].NewDataSet.GetSiteUsers.SPUser, function( index, spuser ) {
			boardConfig.spUsers.push(new SPUserModel(spuser.ID.value, spuser.Name.value, false));
		});

		// Build Priorities collection for data-binding 
		$.each(boardComponents[0].NewDataSet.Priority.Field.CHOICES.CHOICE, function(index, priority){
			boardConfig.priorityValues.push(new PriorityModel(index + 1, priority));
		});
		
		// Setup the status columns for the board View Model.
		$.each(boardComponents[0].NewDataSet.Status.Field.CHOICES.CHOICE, function( index, column ) {
			boardConfig.boardColumns.push(new statusColumnModel(index + 1, column));
		});


		//var tasks = [];  //temporary initializer for the observable array of tasks
		// Loop through and create all of the task items so we can add the status specific 
		// tasks to the correct status collection.  Note:  This might be done different if
		// the data is collected from the server already with this relationship.
		$.each(boardItems[0].NewDataSet.Tasks["z:row"], function( idx, item ) {
			var newTask = new taskItemModel();
			var SD="", DD="";
			if (item.ows_StartDate){ SD = item.ows_StartDate; }
			if (item.ows_DueDate){ DD = item.ows_DueDate; }
			alert
			
			var assignedToTemp = [];
			var users = cw.utils.getSPUserArray(item.ows_AssignedTo);
			$.each(users.users, function(index, user){
				assignedToTemp.push(new SPUserModel(user.id, user.val, user.selected));
			});

			var priority = ko.utils.arrayFirst(boardConfig.priorityValues, function(pitem) {
    			return item.ows_Priority === pitem.value();
			});
			
			if (!item.ows_PercentComplete){
				item.ows_PercentComplete = 0;
			}


			newTask.id(item.ows_ID);
			newTask.title(item.ows_Title);
			newTask.priority(priority);
			newTask.assignedTo(assignedToTemp);
			newTask.assignedToIds(users.ids);
			newTask.startDate(SD);
			newTask.dueDate(DD);
			newTask.status(ko.utils.arrayFirst(boardConfig.boardColumns, function(col){ return col.title() === item.ows_Status; }));
			newTask.perCompleteRaw(parseFloat(item.ows_PercentComplete));
			boardConfig.boardItems.push(newTask);	
		});

		//console.log(boardConfig);
		vm = new BoardViewModel(boardConfig);	
		ko.applyBindings(vm);
		$("#loaderDiv").hide();
		$("#tasksTable").show();
	});
})(jQuery);


