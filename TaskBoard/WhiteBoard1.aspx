<%@ Page Language="C#" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" masterpagefile="~masterurl/default.master"  meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="WebPartPages" namespace="Microsoft.SharePoint.WebPartPages" assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">	
	<SharePoint:ProjectProperty Property="Title" runat="server"/> - 
	<SharePoint:ListItemProperty Property="NavTitle" MaxLength=40 runat="server"/>
	<META Name="GENERATOR" Content="Microsoft SharePoint">
	<META Name="ProgId" Content="SharePoint.WebPartPage.Document">
	<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
	<META Name="CollaborationServer" Content="SharePoint Team Web Site">	
	<script type="text/javascript" src="lib/jquery-1.10.1.js"></script>
	<!--<script type="text/javascript" src="../Board/lib/jquery-ui-1.10.3.js"></script>-->
	<!--<link href="../board/css/jquery-ui-1.10.3.css" rel="stylesheet" type="text/css" />-->
	<link type="text/css" rel="stylesheet" href="display.css"/>
	<script type="text/javascript" src="lib/knockout-2.3.0.js"></script>
	<script type="text/javascript" src="display1.js"></script>
		

	<WebPartPages:WebPartZone runat="server" Title="loc:Header" ID="Header" FrameType="None" __designer:Preview="&lt;Regions&gt;&lt;Region Name=&quot;0&quot; Editable=&quot;True&quot; Content=&quot;&quot; NamingContainer=&quot;True&quot; /&gt;&lt;/Regions&gt;&lt;table cellspacing=&quot;0&quot; cellpadding=&quot;0&quot; border=&quot;0&quot; id=&quot;Header&quot;&gt;
	&lt;tr&gt;
		&lt;td style=&quot;white-space:nowrap;&quot;&gt;&lt;table cellspacing=&quot;0&quot; cellpadding=&quot;2&quot; border=&quot;0&quot; style=&quot;width:100%;&quot;&gt;
			&lt;tr&gt;
				&lt;td style=&quot;white-space:nowrap;&quot;&gt;Header&lt;/td&gt;
			&lt;/tr&gt;
		&lt;/table&gt;&lt;/td&gt;
	&lt;/tr&gt;&lt;tr&gt;
		&lt;td style=&quot;height:100%;&quot;&gt;&lt;table cellspacing=&quot;0&quot; cellpadding=&quot;2&quot; border=&quot;0&quot; style=&quot;border-color:Gray;border-width:1px;border-style:Solid;width:100%;height:100%;&quot;&gt;
			&lt;tr valign=&quot;top&quot;&gt;
				&lt;td _designerRegion=&quot;0&quot;&gt;&lt;table cellspacing=&quot;0&quot; cellpadding=&quot;2&quot; border=&quot;0&quot; style=&quot;width:100%;&quot;&gt;
					&lt;tr&gt;
						&lt;td style=&quot;height:100%;&quot;&gt;&lt;/td&gt;
					&lt;/tr&gt;
				&lt;/table&gt;&lt;/td&gt;
			&lt;/tr&gt;
		&lt;/table&gt;&lt;/td&gt;
	&lt;/tr&gt;
&lt;/table&gt;" __designer:Values="&lt;P N=&#39;Title&#39; ID=&#39;1&#39; T=&#39;Header&#39; /&gt;&lt;P N=&#39;HeaderText&#39; T=&#39;loc:Header&#39; /&gt;&lt;P N=&#39;DisplayTitle&#39; R=&#39;1&#39; /&gt;&lt;P N=&#39;ID&#39; R=&#39;1&#39; /&gt;&lt;P N=&#39;FrameType&#39; E=&#39;0&#39; /&gt;&lt;P N=&#39;PartChromeType&#39; E=&#39;2&#39; /&gt;&lt;P N=&#39;Page&#39; ID=&#39;2&#39; /&gt;&lt;P N=&#39;TemplateControl&#39; R=&#39;2&#39; /&gt;&lt;P N=&#39;AppRelativeTemplateSourceDirectory&#39; R=&#39;-1&#39; /&gt;" __designer:Templates="&lt;Group Name=&quot;ZoneTemplate&quot;&gt;&lt;Template Name=&quot;ZoneTemplate&quot; Content=&quot;&quot; /&gt;&lt;/Group&gt;"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
	<div id="TopFeatureDiv">	
		<div id="theBoard">
			<div id="boardTitle">White Board using KnockoutJS</div>
			<div id="boardData">
				<!-- ko foreach: boardColumns -->
					<div class="boardColumn" style="width: 17%" data-bind="id: $data">
						<div class="colTitle" data-bind="text: Title"></div>
						<div class="colItems" data-bind="id: Title + '_items'">
						<!-- ko foreach: $root.boardItems -->
							<!-- ko if: $parent.Title === item.Status.value -->
								<div data-bind="css: 'boardItem priority' + item.Priority.value">
									<div class="title" data-bind="text: item.Title"></div>
									<div class="assignedTo" data-bind="text: item.AssignedTo.value"></div>
								</div>
							<!-- /ko -->
						<!-- /ko -->
						</div>
					</div>
				<!-- /ko -->
			</div>
		</div>
	</div>
	
</asp:Content>

