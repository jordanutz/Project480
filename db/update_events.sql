update events
set name = $2, date = $3, time = $4
where id = $1
returning *;

select * from events;
