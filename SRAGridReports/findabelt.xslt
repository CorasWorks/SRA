<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs">
	<xsl:template match="/NewDataSet/*/Employees">
		<NewDataSet>
			<xsl:for-each select="Employee">
				<Data>
					<EmployeeID><xsl:value-of select="EmpID"/></EmployeeID>	
					<!--			
					<EmployeeName>&lt;a href="mailto:<xsl:value-of select="EmpEmail"/>?subject=Find A Belt"&gt;<xsl:value-of select="EmpName"/>&lt;/a&gt;</EmployeeName>
					<EmployeeName><xsl:value-of select="EmpName"/></EmployeeName>
					-->
					
					<EmployeeName>&lt;a href="mailto:<xsl:value-of select="EmpEmail"/>?subject=Find A Belt"&gt;<xsl:value-of select="EmpName"/>&lt;/a&gt;</EmployeeName>
					<EmployeeCountry><xsl:value-of select="EmpCountry"/></EmployeeCountry>				
					<EmployeeDivision><xsl:value-of select="EmpDivision"/></EmployeeDivision>
					<EmployeeLocation><xsl:value-of select="EmpLocation"/></EmployeeLocation>
					<!--				
					<EmployeeEmail>&lt;a href="mailto:<xsl:value-of select="EmpEmail"/>?subject=Find A Belt"&gt;<xsl:value-of select="EmpEmail"/>&lt;/a&gt;</EmployeeEmail>
					<EmployeeEmail><xsl:value-of select="EmpEmail"/></EmployeeEmail>
					-->
					<EmployeeEmail>&lt;a href="mailto:<xsl:value-of select="EmpEmail"/>?subject=Find A Belt"&gt;<xsl:value-of select="EmpEmail"/>&lt;/a&gt;</EmployeeEmail>
					
					<EmployeePlant><xsl:value-of select="EmpPlant"/></EmployeePlant>
					<EmployeeRptGroup><xsl:value-of select="EmpRptGroup"/></EmployeeRptGroup>
					<EmployeeCity><xsl:value-of select="EmpCity"/></EmployeeCity>
					<EmployeeBeltsCertified>
					<!--
						&lt;ul&gt;
					-->	
						<xsl:for-each select="EmpBelts/EmpBelt[@IsCertified='1']">
							<xsl:value-of select="."/>
							<xsl:if test="position() != last()">, </xsl:if>
						</xsl:for-each>
						<!--
						&lt;/ul&gt;
						-->
					</EmployeeBeltsCertified>
					<EmployeeBeltsNonCertified>
						<xsl:for-each select="EmpBelts/EmpBelt[@IsCertified='0']">
							<xsl:value-of select="."/>
							<xsl:if test="position() != last()">, </xsl:if>
						</xsl:for-each>
					</EmployeeBeltsNonCertified>				
				</Data>
			</xsl:for-each>
		</NewDataSet>		
	</xsl:template>
</xsl:stylesheet>
