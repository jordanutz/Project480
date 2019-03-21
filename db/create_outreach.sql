insert into outreach
(name, date, location, time, description)
values
($1, $2, $3, $4, $5);

select * from outreach;
