-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: framework_prize_draw
-- ------------------------------------------------------
-- Server version	5.7.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(125) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Felipe Admin','admin@admin.com','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','2023-04-12 05:57:35','2023-04-12 05:57:35');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prize_dawn`
--

DROP TABLE IF EXISTS `prize_dawn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prize_dawn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_winner` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `prize` varchar(80) NOT NULL,
  `date` date NOT NULL,
  `hour` time NOT NULL,
  `description` text,
  `status_active` int(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prize_dawn`
--

LOCK TABLES `prize_dawn` WRITE;
/*!40000 ALTER TABLE `prize_dawn` DISABLE KEYS */;
INSERT INTO `prize_dawn` VALUES (1,NULL,'-Fiat Argo 0km','Fiat Argo 0km','2023-04-13','10:20:00','Concorra agora a esse carro zero kilometro avalaido em 300 mil reais não perca essa chance por que chances assim não aparecem sempre então participe e tambem afinal não custa nada',1,'2023-04-10 03:16:26','2023-04-12 13:45:08'),(2,NULL,'-Jogo de panelas','Jogo de panela','2023-04-13','10:20:00','lindo jogo de panelas com 4 itens',1,'2023-04-10 03:16:26','2023-04-12 13:45:08'),(3,NULL,'-pix de 150 reais','pix de 150 reais','2023-04-13','10:20:00','um pix de 50 reais pra comprar aquela pizza do final de semana',1,'2023-04-10 03:16:26','2023-04-12 13:45:08'),(4,NULL,'-pix de150 reais','pix de150 reais','2023-04-13','10:20:00','um pix de 50 reais pra pagar o boleto de fim de mes',1,'2023-04-10 17:35:55','2023-04-12 13:45:08'),(5,NULL,'-RTX 4090','RTX 4090','2023-04-15','10:20:00','Seu pc vai voar com essa incrivel placa de video não deixe de participar desse sorteio',1,'2023-04-10 17:35:55','2023-04-12 13:45:08'),(11,NULL,'premio titulo','premiozao','2023-04-15','20:00:00','dasasdojndasjnoasdj ndasjnasdjnkas djnkasdjn asdjnskadjn kasdjnkedwjnkjn ksajnkasjnkdjnkasdjnkasdjnk',0,'2023-04-12 04:43:31','2023-04-12 13:45:08'),(10,NULL,'premio titulo','premiozao','2023-04-15','20:00:00','dasasdojndasjnoasdj ndasjnasdjnkas djnkasdjn asdjnskadjn kasdjnkedwjnkjn ksajnkasjnkdjnkasdjnkasdjnk',0,'2023-04-12 04:43:11','2023-04-12 13:45:08'),(9,NULL,'premio titulo','premiozao','2023-04-15','20:00:00','dasasdojndasjnoasdj ndasjnasdjnkas djnkasdjn asdjnskadjn kasdjnkedwjnkjn ksajnkasjnkdjnkasdjnkasdjnk',0,'2023-04-12 04:42:55','2023-04-12 05:11:54'),(12,NULL,'adsdsaasddsa','dsaasdasdasddasasdasd','2023-04-20','04:45:00','qwe',0,'2023-04-12 04:44:08','2023-04-12 05:11:49'),(13,NULL,'sorteiosss','uj','2023-04-13','08:32:00','123',0,'2023-04-12 11:29:42','2023-04-12 11:30:05');
/*!40000 ALTER TABLE `prize_dawn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prize_dawn_participants`
--

DROP TABLE IF EXISTS `prize_dawn_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prize_dawn_participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_prize` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prize_dawn_participants`
--

LOCK TABLES `prize_dawn_participants` WRITE;
/*!40000 ALTER TABLE `prize_dawn_participants` DISABLE KEYS */;
/*!40000 ALTER TABLE `prize_dawn_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(80) NOT NULL,
  `last_name` varchar(80) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'felipe','silva','teste@teste.com','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11954500333','2023-04-09 21:28:24','2023-04-09 21:28:24'),(2,'segundo','sugundo mesmo','seg@teste.com','123456','123456','2023-04-09 21:32:28','2023-04-09 21:32:28'),(3,'ai','ui','ui@meial.com','123','123','2023-04-09 21:42:15','2023-04-09 21:42:15'),(4,'luana','lencina+dos+santos','email@testeluh.com','08a4909e72e86004b1dc5ff9f4edd3c663fb028c365e953d1bd067385060bf7d','11958936066','2023-04-11 14:47:49','2023-04-11 14:47:49'),(5,'luana','çedilha+ácento+eé+virgula,+eotião','emails@testeluh.com','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11958936066','2023-04-11 14:50:54','2023-04-11 14:50:54'),(6,'luana','çedilha+ácento+eé+virgula,+eotião+mais++mais','emails@testelush.com','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11958936066','2023-04-11 14:53:04','2023-04-11 14:53:04'),(7,'luana','çedilha+ácento+eé+virgula,+eotião+mais++mais','emails@testelush.coms','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11958936066','2023-04-11 14:53:39','2023-04-11 14:53:39'),(8,'luana','çedilha+ácento+eé+virgula,+eotião+mais++mais','emails@testelush.comss','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11958936066','2023-04-11 14:54:33','2023-04-11 14:54:33'),(9,'luana','çedilha ácento eé virgula, eotião mais+ mais','emails@testelush.comsss','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11958936066','2023-04-11 14:59:08','2023-04-11 14:59:08'),(10,'luana','çedilha ácento eé virgula, eotião mais+ mais','emails@testelush.comssss','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11958936066','2023-04-11 15:02:56','2023-04-11 15:02:56'),(11,'luana','çedilha ácento eé virgula, eotião mais+ mais','emails@testelush.comssssc','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','11958936066','2023-04-11 15:04:35','2023-04-11 15:04:35'),(12,'teste','silva','felipe@teste.com','be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946','123456789','2023-04-12 07:42:49','2023-04-12 07:42:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-12 10:45:44
