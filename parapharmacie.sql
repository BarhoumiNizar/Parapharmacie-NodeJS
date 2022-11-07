-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 17 avr. 2022 à 12:02
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `parapharmacie`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `type` varchar(250) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `type`, `description`) VALUES
(1, 'undefined', 'tettet stststst \r\ns s sshs'),
(2, 'cat2', 'sss');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id_Client` int(11) NOT NULL,
  `Nom` varchar(250) NOT NULL,
  `Prenom` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telephone` varchar(250) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id_Client`, `Nom`, `Prenom`, `email`, `telephone`, `password`) VALUES
(1, 'Ali', 'salah', 'tunisiawebdev@gmail.com', '23126298', '123');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_Comm` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `dateAchat` varchar(250) NOT NULL,
  `idProduit` int(11) NOT NULL,
  `NomProduit` varchar(250) NOT NULL,
  `PrixProduit` varchar(200) NOT NULL,
  `PrixCommande` varchar(200) NOT NULL,
  `idClient` int(11) DEFAULT NULL,
  `etat` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_Comm`, `quantite`, `dateAchat`, `idProduit`, `NomProduit`, `PrixProduit`, `PrixCommande`, `idClient`, `etat`) VALUES
(8, 2, '5/06/2021', 6, 'sssss', '520', '1040', 5, 'Accepter'),
(9, 8, '5/06/2021', 8, 'Prd1', '250', '2000', 1, 'Refuser'),
(10, 4, '5/06/2021', 8, 'Produit Modifier', '250', '1000', 5, 'Accepter'),
(11, 1, '10/01/2022', 8, 'Olivia', '13250', '13250', 1, 'Accepter'),
(16, 6, '16/04/2022', 8, ' AntiChute', '51.169', '153.507', 1, 'en cours'),
(20, 16, '17/04/2022', 6, 'PAPULEX Gel Nettoyant Moussant, 150ml', '33', '99', NULL, 'en cours');

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

CREATE TABLE `facture` (
  `id_facture` int(11) NOT NULL,
  `Date_facture` varchar(250) NOT NULL,
  `Code_Facture` int(11) NOT NULL,
  `Mode_reglement` varchar(250) NOT NULL,
  `PrixTotal` varchar(250) NOT NULL,
  `id_commande` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id_msg` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `sujet` varchar(250) NOT NULL,
  `message` text NOT NULL,
  `date_msg` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id_msg`, `id_client`, `sujet`, `message`, `date_msg`) VALUES
(1, 1, 'Contact Subject', 'Salut Message', '17/04/2022');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(11) NOT NULL,
  `Nom_produit` varchar(200) NOT NULL,
  `prix` double NOT NULL,
  `image` varchar(250) NOT NULL,
  `Description` text NOT NULL,
  `type` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `Nom_produit`, `prix`, `image`, `Description`, `type`) VALUES
(6, 'PAPULEX Gel Nettoyant Moussant, 150ml', 33, 'ECRANSOL.jpg', 'Gel moussant purifiant pour l’hygiène du visage et du corps, peaux jeunes à problèmes, à tendance acnéique, pour l’acné inflammatoire léger à modéré.', 'Cosmétique'),
(8, ' AntiChute', 51.169, 'shampo.jpg', 'Ce produit ', 'Cheveux'),
(9, 'Produit2', 25.5, 'info.jpg', 'Produit2 Desc', 'Matériel Médical');

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE `promotion` (
  `id_promotion` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `image_promotion` varchar(250) NOT NULL,
  `prix_produit` varchar(250) NOT NULL,
  `prix_promotion` varchar(250) NOT NULL,
  `date_promotion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `promotion`
--

INSERT INTO `promotion` (`id_promotion`, `id_produit`, `image_promotion`, `prix_produit`, `prix_promotion`, `date_promotion`) VALUES
(7, 6, 'info.jpg', '25', '12', '2022-04-27');

-- --------------------------------------------------------

--
-- Structure de la table `reclamation`
--

CREATE TABLE `reclamation` (
  `id_reclamation` int(11) NOT NULL,
  `objet_reclamation` varchar(250) NOT NULL,
  `id_client` int(11) NOT NULL,
  `date_reclamation` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id_Client`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_Comm`),
  ADD KEY `idProduit` (`idProduit`),
  ADD KEY `idClient` (`idClient`);

--
-- Index pour la table `facture`
--
ALTER TABLE `facture`
  ADD PRIMARY KEY (`id_facture`),
  ADD KEY `id_commande` (`id_commande`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_msg`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`);

--
-- Index pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id_promotion`),
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `reclamation`
--
ALTER TABLE `reclamation`
  ADD PRIMARY KEY (`id_reclamation`),
  ADD KEY `id_client` (`id_client`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id_Client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_Comm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `facture`
--
ALTER TABLE `facture`
  MODIFY `id_facture` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id_msg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id_promotion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `reclamation`
--
ALTER TABLE `reclamation`
  MODIFY `id_reclamation` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `facture`
--
ALTER TABLE `facture`
  ADD CONSTRAINT `facture_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_Comm`);

--
-- Contraintes pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `promotion_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`);

--
-- Contraintes pour la table `reclamation`
--
ALTER TABLE `reclamation`
  ADD CONSTRAINT `reclamation_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id_Client`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
