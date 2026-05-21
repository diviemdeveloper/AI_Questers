-- TIPOS
INSERT INTO tipos (nombre, color) VALUES ('Fuego', '#FF6B35');
INSERT INTO tipos (nombre, color) VALUES ('Agua', '#4FC3F7');
INSERT INTO tipos (nombre, color) VALUES ('Planta', '#81C784');
INSERT INTO tipos (nombre, color) VALUES ('Eléctrico', '#FFD54F');
INSERT INTO tipos (nombre, color) VALUES ('Psíquico', '#CE93D8');
INSERT INTO tipos (nombre, color) VALUES ('Normal', '#A8A878');
INSERT INTO tipos (nombre, color) VALUES ('Lucha', '#C03028');
INSERT INTO tipos (nombre, color) VALUES ('Veneno', '#A040A0');
INSERT INTO tipos (nombre, color) VALUES ('Tierra', '#E0C068');
INSERT INTO tipos (nombre, color) VALUES ('Volador', '#A890F0');
INSERT INTO tipos (nombre, color) VALUES ('Roca', '#B8A038');
INSERT INTO tipos (nombre, color) VALUES ('Bicho', '#A8B820');
INSERT INTO tipos (nombre, color) VALUES ('Fantasma', '#705898');
INSERT INTO tipos (nombre, color) VALUES ('Hielo', '#98D8D8');
INSERT INTO tipos (nombre, color) VALUES ('Dragón', '#7038F8');

-- FUEGO (tipo_id = 1)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Charmander', 10, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Charmeleon', 30, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Charizard', 50, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Vulpix', 20, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Ninetales', 45, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Growlithe', 18, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Arcanine', 50, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Ponyta', 25, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Rapidash', 45, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Magmar', 40, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Flareon', 45, 1);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Moltres', 60, 1);

-- AGUA (tipo_id = 2)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Squirtle', 10, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Wartortle', 30, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Blastoise', 50, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Psyduck', 20, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Golduck', 40, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Poliwag', 15, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Poliwhirl', 35, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Poliwrath', 55, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Tentacool', 18, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Tentacruel', 40, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Slowpoke', 20, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Slowbro', 42, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Seel', 22, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Dewgong', 44, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Shellder', 20, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Cloyster', 42, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Krabby', 18, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Kingler', 40, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Horsea', 15, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Seadra', 35, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Goldeen', 18, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Seaking', 38, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Staryu', 20, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Starmie', 42, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Magikarp', 5, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Gyarados', 55, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Lapras', 50, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Vaporeon', 45, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Omanyte', 30, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Omastar', 50, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Kabuto', 30, 2);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Kabutops', 50, 2);

-- PLANTA (tipo_id = 3)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Bulbasaur', 10, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Ivysaur', 30, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Venusaur', 50, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Oddish', 15, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Gloom', 35, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Vileplume', 55, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Bellsprout', 15, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Weepinbell', 35, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Victreebel', 55, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Exeggcute', 20, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Exeggutor', 45, 3);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Tangela', 30, 3);

-- ELÉCTRICO (tipo_id = 4)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Pikachu', 25, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Raichu', 45, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Magnemite', 18, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Magneton', 38, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Voltorb', 20, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Electrode', 40, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Jolteon', 45, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Electabuzz', 40, 4);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Zapdos', 60, 4);

-- PSÍQUICO (tipo_id = 5)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Abra', 15, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Kadabra', 35, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Alakazam', 55, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Slowpoke', 20, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Drowzee', 22, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Hypno', 42, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Exeggcute', 20, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Jynx', 35, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Mr. Mime', 35, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Mewtwo', 70, 5);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Mew', 70, 5);

-- NORMAL (tipo_id = 6)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Rattata', 8, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Raticate', 28, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Pidgey', 8, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Pidgeotto', 28, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Pidgeot', 48, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Spearow', 10, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Fearow', 30, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Jigglypuff', 15, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Wigglytuff', 35, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Meowth', 15, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Persian', 35, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Farfetchd', 25, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Doduo', 18, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Dodrio', 38, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Lickitung', 30, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Chansey', 40, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Kangaskhan', 40, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Tauros', 40, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Ditto', 30, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Eevee', 20, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Porygon', 30, 6);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Snorlax', 50, 6);

-- LUCHA (tipo_id = 7)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Mankey', 15, 7);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Primeape', 35, 7);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Machop', 18, 7);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Machoke', 38, 7);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Machamp', 58, 7);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Hitmonlee', 40, 7);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Hitmonchan', 40, 7);

-- VENENO (tipo_id = 8)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Ekans', 12, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Arbok', 32, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Nidoran F', 12, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Nidorina', 32, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Nidoqueen', 52, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Nidoran M', 12, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Nidorino', 32, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Nidoking', 52, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Zubat', 12, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Golbat', 32, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Grimer', 20, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Muk', 40, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Koffing', 20, 8);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Weezing', 40, 8);

-- TIERRA (tipo_id = 9)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Sandshrew', 15, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Sandslash', 35, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Diglett', 15, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Dugtrio', 35, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Geodude', 18, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Graveler', 38, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Golem', 58, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Onix', 25, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Cubone', 20, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Marowak', 40, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Rhyhorn', 25, 9);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Rhydon', 45, 9);

-- VOLADOR (tipo_id = 10)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Butterfree', 30, 10);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Pidgeot', 48, 10);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Scyther', 40, 10);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Articuno', 60, 10);

-- ROCA (tipo_id = 11)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Geodude', 18, 11);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Graveler', 38, 11);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Golem', 58, 11);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Onix', 25, 11);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Rhyhorn', 25, 11);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Rhydon', 45, 11);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Aerodactyl', 55, 11);

-- BICHO (tipo_id = 12)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Caterpie', 5, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Metapod', 15, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Butterfree', 30, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Weedle', 5, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Kakuna', 15, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Beedrill', 30, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Paras', 18, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Parasect', 38, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Venonat', 18, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Venomoth', 38, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Scyther', 40, 12);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Pinsir', 40, 12);

-- FANTASMA (tipo_id = 13)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Gastly', 15, 13);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Haunter', 35, 13);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Gengar', 55, 13);

-- HIELO (tipo_id = 14)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Jynx', 35, 14);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Lapras', 50, 14);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Articuno', 60, 14);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Dewgong', 44, 14);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Cloyster', 42, 14);

-- DRAGÓN (tipo_id = 15)
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Dratini', 20, 15);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Dragonair', 40, 15);
INSERT INTO pokemones (nombre, nivel, tipo_id) VALUES ('Dragonite', 60, 15);