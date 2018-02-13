<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:date="http://exslt.org/dates-and-times"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl date cw rs z">
	<xsl:output omit-xml-declaration="yes"/>	
	<xsl:template match="/">
		<NewDataSet>
			<Columns>
				<xsl:call-template name="AttrToElem">
					<xsl:with-param name="Rows" select="//NewDataSet/Columns/cw:listitems/rs:data/z:row" />
					<xsl:with-param name="dataItem" select="'Column'"/>
				</xsl:call-template>
			</Columns>

			<Items>
				<xsl:call-template name="AttrToElem">
					<xsl:with-param name="Rows" select="//NewDataSet/Items/cw:listitems/rs:data/z:row" />
					<xsl:with-param name="dataItem" select="'Item'"/>
				</xsl:call-template>
			</Items>
			
			<Priorities>
				<xsl:call-template name="AttrToElem">
					<xsl:with-param name="Rows" select="//NewDataSet/Priorities/cw:listitems/rs:data/z:row" />
					<xsl:with-param name="dataItem" select="'Item'"/>
				</xsl:call-template>
			</Priorities>

			<Metadata>
				<SiteURL><xsl:value-of select="//NewDataSet/Metadata/@SiteUrl"/></SiteURL>
				<ItemCount><xsl:value-of select="//NewDataSet/Metadata/cw:List/@ItemCount"/></ItemCount>
				<xsl:for-each select="//NewDataSet/Metadata/cw:List/cw:Fields/cw:Field[@Type = 'Lookup' and @Indexed='TRUE']">
					<xsl:copy-of select="." />
				</xsl:for-each>
			</Metadata>
			<CWVariables>
            <xsl:for-each select="NewDataSet/CWVariables/CWVariable">
            	<xsl:variable name="NodeName">
            		<xsl:choose>
            			<xsl:when test="contains(@name,'[') or contains(@name,'%') and (contains(@name,'&lt;') = 0)">
            				<xsl:value-of select="substring(@name,2,string-length(@name)-2)"/>
            			</xsl:when>
            			<xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
            		</xsl:choose>
            	</xsl:variable>
            	<xsl:element name="{$NodeName}">
            		<xsl:value-of select="."/>
            	</xsl:element>
            </xsl:for-each>  			
			</CWVariables>
		</NewDataSet>

	</xsl:template>
	<xsl:template name="AttrToElem">
	  <xsl:param name="Rows" />
	  <xsl:param name="dataItem"/>
	  <xsl:for-each select="$Rows">		
			<xsl:element name="{$dataItem}">
				<xsl:apply-templates select="@*"/>
			</xsl:element>
	  </xsl:for-each>
	</xsl:template>
	<xsl:template match="@*">
	  <xsl:variable name="ElementName" select="substring-after(local-name(.),'ows_')" />
	  <xsl:element name="{$ElementName}">
	   <xsl:choose>
	    <!-- Removing leading ID (X;#)for specified attributes -->
	    <xsl:when 
	      test="contains(.,';#')">
	     <xsl:value-of select="substring-after(.,';#')" />
	     <ID>
		     <xsl:value-of select="substring-before(.,';#')" />	     
	     </ID>
	    </xsl:when>
	    <xsl:otherwise>
	     <xsl:value-of select="."/>
	    </xsl:otherwise>
	   </xsl:choose>
	  </xsl:element>
	</xsl:template>	
<!-- Specify tags that should be ommited -->
<xsl:template match="@ows_MetaInfo"  />
<xsl:template match="@ows__UIVersionString" />
<xsl:template match="@ows__ModerationStatus" />
<xsl:template match="@ows__Level" />
<xsl:template match="@ows_ProgId" />
<xsl:template match="@ows_owshiddenversion" />
<xsl:template match="@ows_FileLeafRef" />
<xsl:template match="@ows_FileRef" />
<xsl:template match="@ows_FSObjType" />
<xsl:template match="@ows_UniqueId" />
<xsl:template match="@ows_ContentType"  />
<xsl:template match="@ows_ContentTypeId"  />
<xsl:template match="@ows_PermMask"  />	
</xsl:stylesheet>
