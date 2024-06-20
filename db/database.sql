-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: maria_db
-- Erstellungszeit: 20. Jun 2024 um 13:35
-- Server-Version: 11.3.2-MariaDB-1:11.3.2+maria~ubu2204
-- PHP-Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `salesassistentdb`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PROTOKOLL`
--

CREATE TABLE `PROTOKOLL` (
  `ID` int(11) NOT NULL,
  `THREAD_ID` varchar(512) NOT NULL,
  `USER` varchar(255) NOT NULL,
  `MESSAGE` varchar(8192) NOT NULL,
  `PRODUCT` varchar(255) DEFAULT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `PROTOKOLL`
--

INSERT INTO `PROTOKOLL` (`ID`, `THREAD_ID`, `USER`, `MESSAGE`, `PRODUCT`, `TIMESTAMP`) VALUES
(1, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Guten Tag', NULL, '2024-06-20 13:19:31'),
(2, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'CHATBOT', 'Hallo! Wie kann ich dir heute weiterhelfen? Möchtest du mehr über die Versicherungsprodukte der WGV-Versicherung erfahren?', NULL, '2024-06-20 13:19:34'),
(3, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Ja gerne', NULL, '2024-06-20 13:19:41'),
(4, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'CHATBOT', 'Super, das freut mich! Welche Art von Versicherung interessiert dich besonders? Wir haben verschiedene Angebote, zum Beispiel Kfz-Versicherungen, Haftpflichtversicherungen, Hausratversicherungen und viele mehr. Was passt am besten zu deinen Bedürfnissen?', NULL, '2024-06-20 13:19:44'),
(5, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Mach mir ein Angebot für eine haftplficht', NULL, '2024-06-20 13:19:52'),
(6, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'MANUAL_CHATBOT', 'Alles klar! Lass uns Schritt für Schritt die benötigten Angaben einsammeln. Zunächst bräuchte ich deinen Vornamen. Wie lautet der?', 'haftpflicht', '2024-06-20 13:20:04'),
(7, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Bünyamin', NULL, '2024-06-20 13:20:10'),
(8, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'MANUAL_CHATBOT', 'Danke, Bünyamin! Nun bitte noch deinen Nachnamen.', 'haftpflicht', '2024-06-20 13:20:14'),
(9, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Aydemir', NULL, '2024-06-20 13:20:16'),
(10, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'MANUAL_CHATBOT', 'Danke, Bünyamin Aydemir! Könntest du mir bitte noch deine Adresse nennen, inklusive Postleitzahl, Stadt, Straße und Hausnummer?', 'haftpflicht', '2024-06-20 13:20:20'),
(11, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Maria-Merian-Str. 9, 74321 Bietigheim-Bissingen', NULL, '2024-06-20 13:20:36'),
(12, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'MANUAL_CHATBOT', 'Perfekt. Jetzt habe ich noch ein paar Fragen. Welchen Tarif möchtest du wählen? Wir haben Basis, Optimal und Plus im Angebot.', 'haftpflicht', '2024-06-20 13:20:39'),
(13, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Welcher ist der beste?', NULL, '2024-06-20 13:20:49'),
(14, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'MANUAL_CHATBOT', 'Der Optimal-Tarif bietet ein ausgezeichnetes Preis-Leistungs-Verhältnis mit erweiterten Leistungen und höheren Deckungssummen im Vergleich zum Basis-Tarif. Der Plus-Tarif ist der umfangreichste und bietet noch mehr Schutz, besonders bei speziellen Schadensfällen. Wenn du auf der sicheren Seite sein möchtest und keine Kompromisse eingehen willst, empfehle ich dir den Plus-Tarif. Welchen Tarif würdest du gerne wählen?', 'haftpflicht', '2024-06-20 13:20:53'),
(15, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Wie hoch ist die Deckungssummer bei dem Optimal Tarif', NULL, '2024-06-20 13:21:08'),
(16, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'USER', 'Wie hoch ist die Deckungssumer bei dem Optimal Tarif?', NULL, '2024-06-20 13:23:09'),
(17, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Guten Tag', NULL, '2024-06-20 13:23:33'),
(18, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'CHATBOT', 'Hallo! Schön, dass du da bist. Möchtest du mehr über die Versicherungsprodukte der WGV-Versicherung erfahren oder hast du eine spezifische Frage?', NULL, '2024-06-20 13:23:36'),
(19, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Mach mir ein Angebot für eine Haftplicht Versicherung', NULL, '2024-06-20 13:23:54'),
(20, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Super, dann fangen wir doch am besten direkt an! Könntest du mir bitte deinen Vornamen verraten?', 'haftpflicht', '2024-06-20 13:24:04'),
(21, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Bünyamion', NULL, '2024-06-20 13:24:07'),
(22, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Das scheint ein ungewöhnlicher Vorname zu sein. Könntest du mir bitte bestätigen, ob das korrekt ist oder eventuell einen Tippfehler enthält?', 'haftpflicht', '2024-06-20 13:24:10'),
(23, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'ne sorry ich heiße Bünyamin', NULL, '2024-06-20 13:24:18'),
(24, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Alles klar, Bünyamin! Kannst du mir dann bitte noch deinen Nachnamen nennen?', 'haftpflicht', '2024-06-20 13:24:24'),
(25, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Aydemir', NULL, '2024-06-20 13:24:28'),
(26, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', ' Maria-Merian-Str. 9, 74321 Stuttgart', NULL, '2024-06-20 13:24:43'),
(27, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Alles klar, deine Adresse ist Maria-Merian-Str. 9, 74321 Stuttgart. Nun bräuchte ich noch die Information zu deinem gewünschten Tarif. Möchtest du den Basis-, Optimal- oder Plus-Tarif?', 'haftpflicht', '2024-06-20 13:24:46'),
(28, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Welche Deckungssummer hat der Optimal Tarif?', NULL, '2024-06-20 13:25:00'),
(29, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', '\nfile_search\n\nDer Optimal-Tarif der WGV Privathaftpflichtversicherung bietet eine Deckungssumme von 75 Millionen Euro für Personen-, Sach- und Vermögensschäden, davon maximal 15 Millionen Euro je verletzte Person【6:3†source】.\n\nMöchtest du diesen Tarif auswählen?', 'haftpflicht', '2024-06-20 13:25:07'),
(30, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Welche Deckungssummer hat der Optimal Tarif?', NULL, '2024-06-20 13:26:31'),
(31, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Die Deckungssumme des Optimal-Tarifs der WGV Privathaftpflichtversicherung liegt bei 75 Millionen Euro für Personen-, Sach- und Vermögensschäden, wobei maximal 15 Millionen Euro je verletzte Person gedeckt sind【6:3†source】. Bist du damit einverstanden oder möchtest du einen anderen Tarif auswählen?', 'haftpflicht', '2024-06-20 13:26:36'),
(32, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Ne sorry ich meine den Plus Tarif', NULL, '2024-06-20 13:26:46'),
(33, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', '\nfile_search\n\nDer Plus-Tarif der WGV Privathaftpflichtversicherung bietet eine Deckungssumme von 100 Millionen Euro für Personen-, Sach- und Vermögensschäden, wobei maximal 15 Millionen Euro je verletzte Person gedeckt sind【6:3†source】.\n\nWürdest du diesen Tarif wählen?', 'haftpflicht', '2024-06-20 13:26:54'),
(34, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Ja, dann nehme ich den Plus Tarif', NULL, '2024-06-20 13:27:04'),
(35, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Perfekt, du hast also den Plus-Tarif gewählt. Arbeitest du im öffentlichen Dienst?', 'haftpflicht', '2024-06-20 13:27:07'),
(36, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Ja', NULL, '2024-06-20 13:27:10'),
(37, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Alles klar, du arbeitest im öffentlichen Dienst. Jetzt noch eine Frage: Bist du ehrenamtlich für eine Blaulichtorganisation tätig?', 'haftpflicht', '2024-06-20 13:27:14'),
(38, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Nein', NULL, '2024-06-20 13:27:20'),
(39, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Vielen Dank für die Information. Zu guter Letzt: Möchtest du einen Single-Tarif oder einen Familien-Tarif?', 'haftpflicht', '2024-06-20 13:27:24'),
(40, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Single', NULL, '2024-06-20 13:27:29'),
(41, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'CHATBOT', 'Deine Angaben werden nun von einem Sacharbeiter bei der WGV-Versicherung überprüft. Dies kann ein paar Tage in Anspruch nehmen. Sobald die Validierung erfolgreich abgeschlossen ist, erhältst du die Versicherungspolice per Post. \n\nFalls du in der Zwischenzeit noch Fragen hast oder weitere Hilfe benötigst, stehe ich dir gerne zur Verfügung. Lass es mich einfach wissen!', 'haftpflicht', '2024-06-20 13:27:40'),
(42, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Kannst du mir noch ein Angebot für eine Moped Versicherung machen?', NULL, '2024-06-20 13:29:25'),
(43, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'CHATBOT', 'Gerne! Kannst du mir bitte die folgenden Angaben machen:\n\n1. Deinen vollständigen Namen (den habe ich bereits, also nur zur Bestätigung).\n2. Deine Adresse für den Versand der Unterlagen (diese habe ich auch schon, also nur zur Bestätigung).\n3. Art des Mopeds und den Hubraum (in ccm).\n4. Wieviele Kilometer du jährlich fährst.\n5. Das Baujahr deines Mopeds.\n\nDann erstelle ich dir das passende Angebot.', NULL, '2024-06-20 13:29:30'),
(44, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Bünyamin Aydemir, Maria-Merian-Str. 9, 74321 Stuttgart, Aprilia SR 50 r', NULL, '2024-06-20 13:30:20'),
(45, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'CHATBOT', 'Danke für die Bestätigung deiner Angaben. Nun bräuchte ich von dir noch den Hubraum deines Aprilia SR 50 R sowie die durchschnittliche jährliche Fahrleistung und das Baujahr deines Mopeds.', NULL, '2024-06-20 13:30:24'),
(46, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Wo war das \"Start Angebot: Moped\" ?', NULL, '2024-06-20 13:31:19'),
(47, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Alles klar, dann gehen wir Schritt für Schritt vor. Du hast mir bereits deinen vollständigen Namen und deine Adresse genannt. Könntest du mir jetzt bitte das Neuwert des Rollers und ob du Vollkasko oder Teilkasko möchtest, nennen?\n\nDarüber hinaus benötige ich noch das Alter des jüngsten Fahrers.', 'moped', '2024-06-20 13:31:26'),
(48, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', '5000 €', NULL, '2024-06-20 13:31:38'),
(49, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Vielen Dank für die Angabe des Neuwerts. Möchtest du für deinen Roller eine Vollkasko- oder eine Teilkaskoversicherung abschließen?', 'moped', '2024-06-20 13:31:43'),
(50, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', 'Vollkasko', NULL, '2024-06-20 13:31:47'),
(51, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'MANUAL_CHATBOT', 'Alles klar, du möchtest also eine Vollkaskoversicherung. Wie alt ist der jüngste Fahrer deines Rollers?', 'moped', '2024-06-20 13:31:51'),
(52, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'USER', '21', NULL, '2024-06-20 13:31:53'),
(53, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'CHATBOT', 'Deine Versicherungspolice wird nun erstellt und steht dir in wenigen Sekunden zum Download bereit. Bitte habe einen Moment Geduld. Falls du währenddessen noch Fragen hast oder etwas unklar ist, stehe ich dir gerne zur Verfügung.', 'moped', '2024-06-20 13:32:04');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `THREADS`
--

CREATE TABLE `THREADS` (
  `ID` int(11) NOT NULL,
  `THREAD_ID` varchar(255) NOT NULL,
  `USER` varchar(255) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `THREADS`
--

INSERT INTO `THREADS` (`ID`, `THREAD_ID`, `USER`, `TIMESTAMP`) VALUES
(1, 'thread_5jya9NsvbCvoV59FQ1Rgo9or', 'user', '2024-06-20 13:19:16'),
(2, 'thread_5XK8iFVuxydpR4eqNTYtyQC1', 'user', '2024-06-20 13:23:31'),
(3, 'thread_nerpI88FHBE9AtLVzzvkb5nO', 'user', '2024-06-20 13:33:10');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `PROTOKOLL`
--
ALTER TABLE `PROTOKOLL`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `THREADS`
--
ALTER TABLE `THREADS`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `PROTOKOLL`
--
ALTER TABLE `PROTOKOLL`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT für Tabelle `THREADS`
--
ALTER TABLE `THREADS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
