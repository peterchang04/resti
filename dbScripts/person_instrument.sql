if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'Person_Instrument'
)
begin
	CREATE TABLE [dbo].[Person_Instrument](
		[ID] [int] identity(1,1) primary key,
		[Person_ID] [int] not null,
		[Instrument_ID] [int] not null,
		[Active] [bit] not NULL default 1,
		[Created_On] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified_On] [datetime] NULL,
		[Modified_By] [int] NULL
	)
end