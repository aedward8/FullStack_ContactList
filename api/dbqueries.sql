CREATE TABLE contacts(
   id SERIAL PRIMARY KEY,
   first_name VARCHAR,
   last_name VARCHAR,
   phone_number VARCHAR,
   email VARCHAR
);

INSERT INTO contacts (id, first_name, last_name, phone_number,email)
VALUES
 (DEFAULT,'Abby','Edwards','908-264-5075', '9mohe.selami7@paceforwarders.com'), 
 (DEFAULT,'Ross', 'Cummings','605-207-7326','zelias-si@noisemails.com'), 
 (DEFAULT,'Jean','Hammond', '478-606-8753', '7and@taluabushop.com'), 
 (DEFAULT,'Kimberly', 'Sandoval', '307-772-2686', '2leoswapnob@lihdaf.com'); 