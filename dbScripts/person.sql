if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'Person'
)
begin
	CREATE TABLE [dbo].[Person](
		[ID] [int] identity(1,1) primary key,
		[First_Name] varchar(100) not null,
		[Middle_Name] varchar(100) null,
		[Last_Name] varchar(100) not null,
		[Birth_Date] datetime null,
		[Photo_Key] varchar(1000) null,
		[Email] varchar(100) not null,
		[Password] varchar(500) null,
		[City_ID] int null foreign key references city(id),
		[Active] [bit] not NULL default 1,
		[Created_On] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified_On] [datetime] NULL,
		[Modified_By] [int] NULL
	)
end

