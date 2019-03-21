create table if not exists admin (
  id serial primary key,
  auth0_id text unique not null
  name varchar(100)
  email varchar(100)
);

create table if not exists worship (
  id serial primary key,
  name varchar(100) not null,
  university varchar(100) not null,
  graduation integer not null,
  major varchar(100) not null,
  instrument varchar(100) not null,
  image text not null,
  admin_id integer references admin (id)
);

create table if not exists outreach (
  id serial primary key,
  name varchar(100) not null,
  date varchar(100) not null,
  location varchar(100) not null,
  time varchar(100) not null,
  description text not null,
);

create table if not exists events (
  id serial primary key,
  name varchar(100) not null,
  date varchar(100) not null,
  time varchar(100) not null
);




insert into admin
(auth0_id, name, email)
values
('Dummy', 'Jordan', 'jordan@jbird.com');

insert into worship
(name, university, graduation, major, instrument, image, admin_id)
values
('Aisha Toulegenova', 'University of Kentucky', 2015, 'Human Nutrition', 'Vocals', 'https://78.media.tumblr.com/bb4e9499c084a718ea6ace24404df0fc/tumblr_nwj21aPXpn1sshs72o1_1280.jpg', 1),
('Colin Ray', 'University of Kentucky', 2015, 'Pharmacy', 'Guitar', 'https://78.media.tumblr.com/b42bf9c9c3b20fd065180b16447147fd/tumblr_og46seXeCv1sshs72o1_1280.jpg', 1),
('Sean Parmar ', 'University of Kentucky', 2013, 'Communications', 'Drums', 'https://78.media.tumblr.com/2c49a9b86fb078bfaa82df9a33a20c53/tumblr_otnyxqJrQq1qh9o2do1_1280.png', 1)

insert into outreach
(name, date, location, time, description)
values
('Gods Food Pantry', '9/23/2018', '1685 Jaggie Fox Way, Lexington, KY 40511', '8:00am - 4:00pm', 'Test'),
('Red Cross', '9/25/2018', '1450 Newtown Pike Lexington, KY 40511', '2:00pm - 5:00pm', 'Test'),
('Lexington Humane Society', '9/39/2018', '1600 Old Frankfort Pike, Lexington, KY 40504', '2:00pm - 5:00pm', 'Test')

insert into events
(name, date, time)
values
('UK vs. FL Tailgate', '9/8/2018', '2:00pm - 5:00pm'),
('Live Music and Grilling: Brothers and Sisters Band', '9/14/2018', '5:30pm - 8:30pm'),
('Pancake Supper', '9/16/2018', '6:00pm - 7:30pm'),
('National Back to Church', '9/19/2018', '7:00pm - 8:00pm'),
('Resume Regular Open Hours', '9/20/2018', '7:00pm - 8:00pm')

/* Join admin and Worship tables together */
select worship.admin_id, worship.name, worship.university, worship.graduation, worship.major, worship.instrument, worship.image, admin.id from worship
join admin on worship.admin_id=admin.id;
