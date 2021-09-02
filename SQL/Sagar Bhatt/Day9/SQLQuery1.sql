--1-Create a batch Select Banking as ‘Bank Dept’, Insurance as ‘Insurance Dept’ and Services as ‘Services Dept’ from employee table.
USE Day2
SELECT *
FROM sys.tables

SELECT *
FROM Employees
SELECT *
FROM Departments
SELECT e.*
	, CASE d.DepartmentName
		WHEN 'IT' THEN 'IT Dept'
		WHEN 'Sales' THEN 'Sales Dept'
		WHEN 'Accounting' THEN 'Accounting Dept'
		ELSE d.DepartmentName
		END 
FROM Employees e
INNER JOIN Departments d
ON e.DepartmentID = d.DepartmentID
GO

--2-5 Students Name, Address, City, DOB, Standard need to be inserted in the student table, need to fetch these result from json variable.
--and select output in the json format

CREATE DATABASE Day9
USE Day9

CREATE TABLE Students(
	StudentID INT IDENTITY(1,1)
	, Name VARCHAR(30) NOT NULL
	, Address VARCHAR(255) NOT NULL
	, City VARCHAR(30) NOT NULL
	, DOB DATE NOT NULL
	, Standard TINYINT NOT NULL
	, CONSTRAINT PK_Students_StudentID PRIMARY KEY(StudentID)
)

DECLARE @jsonStudents NVARCHAR(MAX)
SET @jsonStudents = N'[
	{
		"Name":"Sagar",
		"Address":"Shahpur",
		"City":"Ahmedabad",
		"DOB":"1998-02-11",
		"Standard":10
	},
	{
		"Name":"Niraj",
		"Address":"Shahpur",
		"City":"Ahmedabad",
		"DOB":"1998-05-12",
		"Standard":10
	},
	{
		"Name":"Meet",
		"Address":"Maninagar",
		"City":"Ahmedabad",
		"DOB":"1998-05-18",
		"Standard":1
	},
	{
		"Name":"Vinod",
		"Address":"Airport",
		"City":"Ahmedabad",
		"DOB":"1992-09-06",
		"Standard":12
	},
	{
		"Name":"Amit",
		"Address":"Sarangpur",
		"City":"Ahmedabad",
		"DOB":"1998-03-02",
		"Standard":10
	}
]'

IF (ISJSON(@jsonStudents) > 0)
BEGIN
	--INSERT INTO Students
	SELECT *
	FROM OPENJSON(@jsonStudents)
	WITH
	(
		Name VARCHAR(30) 'strict $.Name'
		, Address VARCHAR(255) 'strict $.Address'
		, City VARCHAR(30) 'strict $.City'
		, DOB DATE 'strict $.DOB'
		, Standard TINYINT 'strict $.Standard'
	)
END
ELSE
	PRINT 'String doesn''t contain valid JSON.'

SELECT *
FROM Students
FOR JSON AUTO
