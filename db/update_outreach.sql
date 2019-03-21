update outreach
set name = $2, date = $3, location = $4, time = $5, description = $6
where id = $1
returning *;

select * from outreach;
