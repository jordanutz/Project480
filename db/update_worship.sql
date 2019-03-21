update worship
set name = $2, university = $3, graduation = $4, major = $5, instrument = $6, image = $7
where id = $1
returning *;

select * from worship;
