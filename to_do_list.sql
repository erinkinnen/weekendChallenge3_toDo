CREATE TABLE "to_do_list" (
id serial PRIMARY KEY,
list_item VARCHAR(100),
completed BOOLEAN
);

INSERT INTO "to_do_list" (list_item, completed) VALUES ('Grocery Shopping', false), 
('Clean Beatrice''s cage', false), ('Declare your software developerness', true);
