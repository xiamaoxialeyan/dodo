CREATE DATABASE  IF NOT EXISTS `myweb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `myweb`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: myweb
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gallary_trial`
--

DROP TABLE IF EXISTS `gallary_trial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallary_trial` (
  `id` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  `mtime` datetime DEFAULT NULL,
  `cover` varchar(100) NOT NULL,
  `supports` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallary_trial`
--

LOCK TABLES `gallary_trial` WRITE;
/*!40000 ALTER TABLE `gallary_trial` DISABLE KEYS */;
INSERT INTO `gallary_trial` VALUES (1,'骑车拍景','户外的风景是如此的美丽迷人，要多出去走走。','2013-12-07 10:22:15','2014-05-03 22:12:08','/gallary/photos/cover.png',38),(2,'Let\'s Go Home','家，是每一个人心中的港湾。一个人在外漂泊久了，就会格外想家。','2013-12-07 10:23:24','2014-03-29 16:23:45','/gallary/photos/cover.png',35);
/*!40000 ALTER TABLE `gallary_trial` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-22 21:22:05
