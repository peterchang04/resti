if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'state'
)
begin
	CREATE TABLE [dbo].[State](
		[ID] [int] identity(1,1) primary key,
		[Name] varchar(100) not null,
		[Abbrev] varchar(100) null,
		[City] varchar(100) null,
		[Active] [bit] not NULL default 1,
		[Created_On] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified_On] [datetime] NULL,
		[Modified_By] [int] NULL
	)

	INSERT INTO state (name,abbrev) VALUES ('Alaska', 'AK');
	INSERT INTO state (name,abbrev) VALUES ('Alabama', 'AL');
	INSERT INTO state (name,abbrev) VALUES ('Arkansas', 'AR');
	INSERT INTO state (name,abbrev) VALUES ('Arizona', 'AZ');
	INSERT INTO state (name,abbrev) VALUES ('California', 'CA');
	INSERT INTO state (name,abbrev) VALUES ('Colorado', 'CO');
	INSERT INTO state (name,abbrev) VALUES ('Connecticut', 'CT');
	INSERT INTO state (name,abbrev) VALUES ('District of Columbia', 'DC');
	INSERT INTO state (name,abbrev) VALUES ('Delaware', 'DE');
	INSERT INTO state (name,abbrev) VALUES ('Florida', 'FL');
	INSERT INTO state (name,abbrev) VALUES ('Georgia', 'GA');
	INSERT INTO state (name,abbrev) VALUES ('Hawaii', 'HI');
	INSERT INTO state (name,abbrev) VALUES ('Iowa', 'IA');
	INSERT INTO state (name,abbrev) VALUES ('Idaho', 'ID');
	INSERT INTO state (name,abbrev) VALUES ('Illinois', 'IL');
	INSERT INTO state (name,abbrev) VALUES ('Indiana', 'IN');
	INSERT INTO state (name,abbrev) VALUES ('Kansas', 'KS');
	INSERT INTO state (name,abbrev) VALUES ('Kentucky', 'KY');
	INSERT INTO state (name,abbrev) VALUES ('Louisiana', 'LA');
	INSERT INTO state (name,abbrev) VALUES ('Massachusetts', 'MA');
	INSERT INTO state (name,abbrev) VALUES ('Maryland', 'MD');
	INSERT INTO state (name,abbrev) VALUES ('Maine', 'ME');
	INSERT INTO state (name,abbrev) VALUES ('Michigan', 'MI');
	INSERT INTO state (name,abbrev) VALUES ('Minnesota', 'MN');
	INSERT INTO state (name,abbrev) VALUES ('Missouri', 'MO');
	INSERT INTO state (name,abbrev) VALUES ('Mississippi', 'MS');
	INSERT INTO state (name,abbrev) VALUES ('Montana', 'MT');
	INSERT INTO state (name,abbrev) VALUES ('North Carolina', 'NC');
	INSERT INTO state (name,abbrev) VALUES ('North Dakota', 'ND');
	INSERT INTO state (name,abbrev) VALUES ('Nebraska', 'NE');
	INSERT INTO state (name,abbrev) VALUES ('New Hampshire', 'NH');
	INSERT INTO state (name,abbrev) VALUES ('New Jersey', 'NJ');
	INSERT INTO state (name,abbrev) VALUES ('New Mexico', 'NM');
	INSERT INTO state (name,abbrev) VALUES ('Nevada', 'NV');
	INSERT INTO state (name,abbrev) VALUES ('New York', 'NY');
	INSERT INTO state (name,abbrev) VALUES ('Ohio', 'OH');
	INSERT INTO state (name,abbrev) VALUES ('Oklahoma', 'OK');
	INSERT INTO state (name,abbrev) VALUES ('Oregon', 'OR');
	INSERT INTO state (name,abbrev) VALUES ('Pennsylvania', 'PA');
	INSERT INTO state (name,abbrev) VALUES ('Rhode Island', 'RI');
	INSERT INTO state (name,abbrev) VALUES ('South Carolina', 'SC');
	INSERT INTO state (name,abbrev) VALUES ('South Dakota', 'SD');
	INSERT INTO state (name,abbrev) VALUES ('Tennessee', 'TN');
	INSERT INTO state (name,abbrev) VALUES ('Texas', 'TX');
	INSERT INTO state (name,abbrev) VALUES ('Utah', 'UT');
	INSERT INTO state (name,abbrev) VALUES ('Virginia', 'VA');
	INSERT INTO state (name,abbrev) VALUES ('Vermont', 'VT');
	INSERT INTO state (name,abbrev) VALUES ('Washington', 'WA');
	INSERT INTO state (name,abbrev) VALUES ('Wisconsin', 'WI');
	INSERT INTO state (name,abbrev) VALUES ('West Virginia', 'WV');
	INSERT INTO state (name,abbrev) VALUES ('Wyoming', 'WY');
end
