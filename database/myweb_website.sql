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
-- Table structure for table `website`
--

DROP TABLE IF EXISTS `website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `website` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `url` varchar(100) NOT NULL,
  `remark` varchar(100) DEFAULT '',
  `gid` int(10) unsigned NOT NULL,
  `uid` varchar(32) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website`
--

LOCK TABLES `website` WRITE;
/*!40000 ALTER TABLE `website` DISABLE KEYS */;
INSERT INTO `website` VALUES (1,'草榴社区','http://ruai.lesile.net/index.php','',1,'f001ddd926d243dca372d73ac7eb2bab'),(2,'博客园','http://www.cnblogs.com/','',1,'f001ddd926d243dca372d73ac7eb2bab'),(3,'CSDN','http://www.csdn.net/','',1,'f001ddd926d243dca372d73ac7eb2bab'),(4,'公积金查询','http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp','',1,'f001ddd926d243dca372d73ac7eb2bab'),(5,'草榴社区','http://ruai.lesile.net/index.php','',2,'c4ca4238a0b923820dcc509a6f75849b'),(6,'博客园','http://www.cnblogs.com','',2,'c4ca4238a0b923820dcc509a6f75849b'),(7,'CSND','http://www.csdn.net/','',2,'c4ca4238a0b923820dcc509a6f75849b'),(8,'公积金查询','http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp','',2,'c4ca4238a0b923820dcc509a6f75849b'),(9,'电影天堂','http://www.dy2018.com/','',2,'c4ca4238a0b923820dcc509a6f75849b'),(10,'w3school','http://www.w3school.com.cn/','',2,'c4ca4238a0b923820dcc509a6f75849b'),(11,'BOBO','http://bobo.163.com/','',2,'c4ca4238a0b923820dcc509a6f75849b');
/*!40000 ALTER TABLE `website` ENABLE KEYS */;
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
