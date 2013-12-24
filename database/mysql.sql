use game;

create table user(
    id int not null primary key auto_increment,
    name char(15),
    password char(41)
);

