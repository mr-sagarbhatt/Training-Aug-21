--Create Database
CREATE DATABASE Sagar;

--Create Table
CREATE TABLE BioData(
	P_Id int constraint PK_BioData PRIMARY KEY IDENTITY(1,1),
	P_Name varchar(50) NOT NULL,
	P_Mobile 
);