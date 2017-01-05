# CRUD-client-part

A simple CRUD app which consists of server and client parts.
Server part demonstrates integration of popular JavaEE frameworks and technologies: Spring 4 (Spring Core, Spring Security, 
Spring MVC), Hibernate 5, Maven 4, SLF4J, REST WebService, JUnit 4.
Client part is developed with help of AngularJs 1.5, Angular Material.

This app has a login form, performs simple CRUD operations with employee module and allows to assign tasks to a chosen employee. This app works in russian and english languages (i18n). Created simple JUnit (Mockito) tests.
Communication between server and client parts is implemented with REST API.
All data lies in MySQL DB. Script lies in resources folder in server part of app 

To build the application:
1.Download server and client parts.
2. Create database 'employee' with script.
3. Run the Maven command: mvn package in the project's root folders.  
Maven will build each module and create a .war file in the target sub-folder of each module.
4. Then copy the .war files to Servlet container (e.g. Tomcat 8) and run it.

P.S.: If tomcat works not on 8080 port, you need to change it on client part in  files employeeModule.js and taskModule.js.
