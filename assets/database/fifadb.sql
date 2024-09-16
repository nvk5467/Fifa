-- Table structure for table `teams`
DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nation` TEXT NOT NULL,
  `league` TEXT NOT NULL,
  `overall` INTEGER NOT NULL,
  `rating` INTEGER NOT NULL
);

-- Dumping data for table `teams`
INSERT INTO `teams` (`id`, `nation`, `league`, `overall`, `rating`) 
VALUES 
  (1, 'Argentina', 'International', 5, 83),
  (2, 'England', 'International', 5, 83),
  (3, 'France', 'International', 5, 83);

-- End of dump
