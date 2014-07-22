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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uid` varchar(32) NOT NULL DEFAULT '',
  `name` varchar(20) NOT NULL,
  `pwd` varchar(200) NOT NULL,
  `email` varchar(30) NOT NULL,
  `ctime` datetime DEFAULT NULL,
  `actived` tinyint(3) DEFAULT NULL,
  `active_code` varchar(16) DEFAULT NULL,
  `login_lasttime` datetime DEFAULT NULL,
  `login_count` int(11) DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('c4ca4238a0b923820dcc509a6f75849b','admin','f001ddd926d243dca372d73ac7eb2bab','luoying_112@163.com','2013-11-24 18:02:31',1,'^JJV)F\"wGA-^ 451','2014-05-22 20:18:20',101),('f001ddd926d243dca372d73ac7eb2bab','luoying','f001ddd926d243dca372d73ac7eb2bab','632327664@qq.com','2014-03-30 19:36:30',1,'fTB9D++RW[[[&xeN','2014-03-30 21:14:45',2),('be6ab8e656a60e9cc95355065c0d70ef','liyanyan','fd6f334f5a7abc6bfd117b6ba7275334','yan-sz@qq.com','2014-07-05 16:00:23',1,'17.Ib-gU$O\'M.=dr',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
