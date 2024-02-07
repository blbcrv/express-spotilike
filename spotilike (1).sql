-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 06 fév. 2024 à 07:37
-- Version du serveur :  10.5.21-MariaDB-0+deb11u1
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `spotilike`
--

-- --------------------------------------------------------

--
-- Structure de la table `Album`
--

CREATE TABLE `Album` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Album`
--

INSERT INTO `Album` (`id`, `title`, `image`, `release_date`, `artist_id`) VALUES
(7, 'Karma', 'karma.jpg', '2023-02-10', 6),
(26, 'SUPERSTAR!', 'superstar.jpg', '2023-12-22', 8),
(27, 'La Melo Est Gangx', 'lmeg.jpg', '2023-12-01', 9);

-- --------------------------------------------------------

--
-- Structure de la table `Artist`
--

CREATE TABLE `Artist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `biography` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Artist`
--

INSERT INTO `Artist` (`id`, `name`, `avatar`, `biography`) VALUES
(5, 'Kekra', 'kekra.jpg', 'Homme masqué'),
(6, 'DTF', 'dtf.jpg', 'QLF NDA'),
(8, 'Dina Ayada', 'dina.jpg', 'OUI OUI BAGUETTE'),
(9, 'Gazo', 'gazo.jpg', 'GRRRRRRT BRRRRRRRRR'),
(10, 'Post Malone', 'pm.jpg', 'WOUHOUUUU'),
(11, 'Moha MMZ', 'MMMZ.jpg', 'NDA'),
(12, 'SCH', 'sch.jpg', 'Le S'),
(13, 'PNB Rock', 'pnb.jpg', 'SKUSKU'),
(14, 'Bring Me The Horizon', 'bmth.jpg', 'AAAAAAH');

-- --------------------------------------------------------

--
-- Structure de la table `Genre`
--

CREATE TABLE `Genre` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Genre`
--

INSERT INTO `Genre` (`id`, `title`, `description`) VALUES
(5, 'Rap', 'Genre musical RAP');

-- --------------------------------------------------------

--
-- Structure de la table `Track`
--

CREATE TABLE `Track` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Track`
--

INSERT INTO `Track` (`id`, `title`, `duration`, `album_id`, `genre_id`, `artist_id`) VALUES
(13, 'Stratos', '00:03:32', 6, 5, 5),
(14, 'Iverson', '00:03:21', 6, 5, 5),
(15, 'Hola', '00:02:50', 7, 5, 6),
(16, 'G.A.G', '00:02:42', 7, 5, 6),
(19, 'Imagine!', '00:01:51', 26, 5, 8),
(20, 'Girls Cry 2!', '00:02:20', 26, 5, 8),
(22, 'Way Up!', '00:02:26', 26, 5, 8),
(23, '24/34', '00:03:47', 27, 5, 9),
(24, 'SOBAD', '00:04:19', 27, 5, 9),
(25, 'A.V.S.D', '00:02:31', 27, 5, 9),
(26, 'Cartier', '00:03:49', 27, 5, 9);

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id`, `username`, `password`, `email`) VALUES
(8, 'blbcrv', '$2a$10$6wJDId4IEjU70gpV2.FhruLqQqKoiX5C5TOcN/ZSoGxgpEiSrwhWy', 'blbcrv@gmail.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Album`
--
ALTER TABLE `Album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Index pour la table `Artist`
--
ALTER TABLE `Artist`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Genre`
--
ALTER TABLE `Genre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Track`
--
ALTER TABLE `Track`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Album`
--
ALTER TABLE `Album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `Artist`
--
ALTER TABLE `Artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Genre`
--
ALTER TABLE `Genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Track`
--
ALTER TABLE `Track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Album`
--
ALTER TABLE `Album`
  ADD CONSTRAINT `Album_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `Artist` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Track`
--
ALTER TABLE `Track`
  ADD CONSTRAINT `Track_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `Genre` (`id`),
  ADD CONSTRAINT `Track_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `Artist` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
