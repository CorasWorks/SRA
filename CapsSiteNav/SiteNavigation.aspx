<!DOCTYPE HTML>
<html>
	<head>
<link rel="stylesheet" href="../jsTree/style.min.css" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<style>
			#QuickNav {min-height:580px;_height:500px;min-width:820px;_width:820px}
			.jstree-node.SearchMatch{display:block}
			.jstree-node.SearchMiss{display:none}
		</style>
		<script type="text/javascript">window.JSON || document.write('<script src="/_layouts/AppDesigner/libs/json2/20130526/json2.js"><\/script>')</script>
		<script src="../../_layouts/AppDesigner/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="../jsTree/jstree.js"></script>		
		<script src="../jsTree/jstree.search.js"></script>
		<script src="QuickNav.js"></script>
	</head>
	<body>
	<!-- Loader -->
	<div id="busyLoader" style="text-align: center;">
	    <h2 style="text-align:center">
	        <span id="busySpinner"></span>
	        <img src="/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
	        <br/>
	        Loading Information...
	    </h2>
	</div>
	<!-- Loader end --> 	
		<div id="SearchSites" style="display:none">
			<input type="text" value="" style="box-shadow:inset 0 0 4px #eee;width:200px;margin:0;padding:6px 12px;border-radius:4px;border:1px solid silver;font-size:1.1em" id="SearchText" placeholder="Search" />
			Search Open Nodes
		</div>
		<div id="QuickNav" class="quicknav-tree" style="display:none"></div>
	</body>
</html>