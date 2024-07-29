<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="org.ecommerce.model.dao.*" %>
    <%String pid=request.getParameter("pid"); 
    ProductDao pd=new ProductDao();
    ResultSet rs=pd.info(pid);
    
    %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Add to Cart</title>
<%@ include file="./icon.jsp" %>
</head>
<body>
<%@ include file="./nav.jsp" %>
<%@ include file="./mini_nav.jsp" %>
<%while(rs.next()){ 
String pname=rs.getString(2);
String price=rs.getString(3);
String im_add=rs.getString(4);
%>
<div class="container">
	<form action="AddtoCart" method="post">
<div class="row">
	<div class="col text-center mx-auto" style="position:relative; top:30px;">
	
		<img src="<%=im_add %>">
		</div>
		<div class="col text-center mx-auto" style="position:relative; top:20vh; bottom:20vh;">
		<h1 class="h1"><%=pname %></h1>
		<p class="h3">Price: &#8377;<%=price %></p>
			<input name="pid" value="<%=pid %>" style="display:none">
			<input name="price" value="<%=price %>" style="display:none">
			<input name="pname" value="<%=pname %>" style="display:none">
			<input name="email" value="<%=email %>" style="display:none">
			<input name="uid" value="<%=uid %>" style="display:none">
			<input name="numcart" value="<%=cart %>" style="display:none">
			<input name="im_add" value="<%=im_add %>" style="display:none">
			
		<button class="btn btn-primary btn-lg btn-block" type="submit">Add to Cart</button>
	</div>
	</div>
	</form>
</div>
<%} %>
</body>
</html>