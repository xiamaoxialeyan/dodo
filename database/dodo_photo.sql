CREATE DATABASE  IF NOT EXISTS `dodo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dodo`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: dodo
-- ------------------------------------------------------
-- Server version	5.6.19

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
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gallary` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` varchar(100) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `supports` int(11) DEFAULT '0',
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,1,'test_photo','testtesttest....','/photo/gallary_1/20140725163829.jpg',0,'2014-07-25 16:38:29'),(2,1,'test_photo2','','/photo/gallary_1/2014072517005854.jpg',0,'2014-07-25 17:00:58'),(3,1,'test_photo5','','/photo/gallary_1/20140725172015926.jpg',0,'2014-07-25 17:20:15'),(4,1,'1111','','/photo/gallary_1/20140725213036901.jpg',0,'2014-07-25 21:31:30');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-31 20:16:22
