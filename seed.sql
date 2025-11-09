-- South Park Episodes Database Seed File (PostgreSQL)
-- This file creates the database structure and adds sample episodes

-- Create table
CREATE TABLE IF NOT EXISTS data (
  id SERIAL PRIMARY KEY,
  data JSONB
);

-- Insert sample episodes (first 5 episodes from Season 15 as examples)
INSERT INTO data (data) VALUES
('{"name": "HUMANCENTiPAD", "season": 15, "episode": 1, "air_date": "2011-04-27", "wiki_url": "https://southpark.fandom.com/wiki/HUMANCENTiPAD", "description": "Kyle is intimately involved in the development of a revolutionary new product that is about to be launched by Apple. Meanwhile, Cartman doesn\'t even have a regular iPad yet. He blames his mother.", "image": ""}'),
('{"name": "Funnybot", "season": 15, "episode": 2, "air_date": "2011-05-04", "wiki_url": "https://southpark.fandom.com/wiki/Funnybot", "description": "The Germans are the funniest people in the world, and Germany is voted the new funniest country. The kids are very upset about this.", "image": ""}'),
('{"name": "Royal Pudding", "season": 15, "episode": 3, "air_date": "2011-05-11", "wiki_url": "https://southpark.fandom.com/wiki/Royal_Pudding", "description": "There is a royal wedding taking place in Canada and the Princess of Canada is abducted.", "image": ""}'),
('{"name": "T.M.I.", "season": 15, "episode": 4, "air_date": "2011-05-18", "wiki_url": "https://southpark.fandom.com/wiki/T.M.I.", "description": "Cartman freaks out when he sees his penis size posted on the school bulletin board, and he gets sent to anger management therapy.", "image": ""}'),
('{"name": "Crack Baby Athletic Association", "season": 15, "episode": 5, "air_date": "2011-05-25", "wiki_url": "https://southpark.fandom.com/wiki/Crack_Baby_Athletic_Association", "description": "Cartman and the boys start a business that exploits crack babies for profit. Kyle objects, but Cartman thinks he knows best.", "image": ""}'  );

-- Note: This seed file contains only 5 sample episodes for deployment testing
-- Import the full south_park_episodes.sql file for the complete dataset
