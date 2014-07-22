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
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userinfo` (
  `uid` varchar(32) NOT NULL COMMENT '主键，用户唯一识别码',
  `fullname` varchar(10) DEFAULT NULL COMMENT '真实姓名',
  `nickname` varchar(20) DEFAULT NULL COMMENT '昵称',
  `face` varchar(50) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL COMMENT '性别：(1)男、(2)女、(3)保密',
  `birthday` varchar(10) DEFAULT NULL COMMENT '生日：YYYY-MM-DD',
  `bloodtype` int(11) DEFAULT NULL COMMENT '血型：(1)A型、(2)B型、(3)AB型、(4)O型、(5)其他',
  `lovestatus` int(11) DEFAULT NULL COMMENT '感情状况：(1)单身、(2)订婚、(3)已婚、(4)分居、(5)离异、(6)丧偶、(7)求交往、(8)暗恋中、(9)暧昧中、(10)恋爱中',
  `province` varchar(3) DEFAULT NULL COMMENT '中国省份',
  `city` varchar(20) DEFAULT NULL COMMENT '中国城市',
  `address` varchar(100) DEFAULT NULL COMMENT '详细地址：县、镇、村、街道等',
  `pfintro` varchar(100) DEFAULT NULL COMMENT '简介',
  `qq` varchar(20) DEFAULT NULL COMMENT 'QQ号',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `homephone` varchar(15) DEFAULT NULL COMMENT '住宅电话',
  `professional` varchar(20) DEFAULT NULL COMMENT '职业',
  `company` varchar(50) DEFAULT NULL COMMENT '公司名',
  `edu` int(11) DEFAULT NULL COMMENT '教育：(1)文盲、(2)小学、(3)初中、(4)中专技校、(5)高中、(6)大专、(7)本科、(8)硕士、(9)博士、(10)博士以上',
  `school` varchar(20) DEFAULT NULL COMMENT '学校，按教育程度填写最高级别的学校名',
  `major` varchar(20) DEFAULT NULL COMMENT '专业',
  `graduation` varchar(10) DEFAULT NULL COMMENT '毕业日期',
  `income` int(11) DEFAULT NULL COMMENT '收入水平（月）：(1)<1000元、(2)1000~3000元、(3)3001~5000元、(4)5001~10000元、(5)>10000元',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('c4ca4238a0b923820dcc509a6f75849b','李艳艳','黑豆的麻麻',NULL,2,'1985-01-20',2,3,'北京','昌平区','沙河高教园北街家园六区22#4-201','罗礼楠的妈妈，罗瑛的老婆。美女，辣妈。','230458098','18311046940','','全职妈妈','',6,'','','',0);
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-22 21:22:06
