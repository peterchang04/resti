if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'Instrument_Family'
)
begin
	CREATE TABLE [dbo].[Instrument_Family](
		[ID] [int] identity(1,1) primary key,
		[Name] varchar(100) not null,
		[Active] [bit] not NULL default 1,
		[Created_On] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified_On] [datetime] NULL,
		[Modified_By] [int] NULL
	)

	insert into instrument_family (name,active,created_on,modified_on) values ('Strings',1,getDate(),getDate())
	insert into instrument_family (name,active,created_on,modified_on) values ('Brass',1,getDate(),getDate())
	insert into instrument_family (name,active,created_on,modified_on) values ('Percussion',1,getDate(),getDate())
	insert into instrument_family (name,active,created_on,modified_on) values ('Woodwind',1,getDate(),getDate())
	insert into instrument_family (name,active,created_on,modified_on) values ('Keyed',1,getDate(),getDate())
	insert into instrument_family (name,active,created_on,modified_on) values ('Voice',1,getDate(),getDate())

end

if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'Instrument'
)
begin
	CREATE TABLE [dbo].[Instrument](
		[ID] [int] identity(1,1) primary key,
		[Name] varchar(100) not null,
		[Instrument_Family_ID] int not null foreign key references instrument_family(id),
		[Active] [bit] not NULL default 1,
		[Created_On] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified_On] [datetime] NULL,
		[Modified_By] [int] NULL
	)

	insert into instrument (name,instrument_family_id,active,created_on,modified_on) values ('Violin',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())
	insert into instrument (name,instrument_family_id,active,created_on,modified_on) values ('Viola',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())
	insert into instrument (name,instrument_family_id,active,created_on,modified_on) values ('Cello',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())
	insert into instrument (name,instrument_family_id,active,created_on,modified_on) values ('Double Bass',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())

end

