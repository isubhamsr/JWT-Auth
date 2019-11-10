create database todo;
use todo;
 create table signup (user_id int primary key auto_increment, first_name varchar(200), last_name varchar(200), email varchar(200) unique,
						phone int unique, password varchar(200));
alter table signup modify phone varchar(200);

ALTER TABLE signup RENAME user;
desc user;
select * from user;
select email from user where email = "shubham@gmail.com";
select first_name,last_name,email,phone,password from user where email = "shubham@gmail.com";
call Signup('{
	"name" : {
		"first" : "Subham",
        "last" : "Roy"
    },
    "email" : "shubham@gmail.com",
    "phone" : "12345",
    "password" : "nopass"
}');

drop procedure if exists Signup;

delimiter $$
create procedure Signup(in params JSON)
begin
	declare q1 text;
    declare v_name text;
    
    if JSON_VALID(params) then
		set v_name = JSON_EXTRACT(params, "$.name");
        
        set q1 = concat("insert into user(first_name, last_name, email, phone, password) values(",
						JSON_EXTRACT(v_name, "$.first"),",",
                        JSON_EXTRACT(v_name, "$.last"),",",
                        JSON_EXTRACT(params, "$.email"),",",
                        JSON_EXTRACT(params, "$.phone"),",",
                        JSON_EXTRACT(params, "$.password"), ")"
                        );
	end if;
    
    set @makeQuary = q1;
    
    prepare stmt from @makeQuary;
    execute stmt;
end $$
delimiter ;

select * from signup;