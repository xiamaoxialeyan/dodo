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
-- Table structure for table `website_trial`
--

DROP TABLE IF EXISTS `website_trial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `website_trial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_trial`
--

LOCK TABLES `website_trial` WRITE;
/*!40000 ALTER TABLE `website_trial` DISABLE KEYS */;
INSERT INTO `website_trial` VALUES (1,'百度','http://www.baidu.com','百度一下，你就知道',1),(2,'优酷','http://www.youku.com','优酷-中国第一视频网站,提供视频播放,视频发布,视频搜索 - 优酷视频',1),(3,'淘宝','http://www.taobao.com','',1),(4,'起点','http://www.qidian.com','\r\n	小说阅读_起点中文小说网|免费小说,玄幻小说,武侠小说,青春小说,小说网各类小说下载\r\n',1),(5,'网易邮箱','http://email.163.com/','网易免费邮箱 - 中国第一大电子邮件服务商',1),(6,'新浪微博','http://weibo.com','微博-随时随地分享身边的新鲜事儿',1),(7,'火车票','https://kyfw.12306.cn','',1),(8,'去哪儿网','http://www.qunar.com','【去哪儿网】机票查询预订，酒店预订，旅游团购，度假搜索，门票预订-去哪儿网Qunar.com',1),(9,'优酷','http://www.youku.com','优酷-中国第一视频网站,提供视频播放,视频发布,视频搜索 - 优酷视频',2),(10,'搜狐视频','http://tv.sohu.com','',2),(11,'爱奇艺','http://www.iqiyi.com','爱奇艺-爱奇艺视频,高清影视剧,网络视频在线观看',2),(12,'乐视网','http://www.letv.com','乐视网 - 中国第一影视剧视频网站 电影天堂 电视剧排行',2),(13,'起点中文网','http://www.qidian.com','\r\n	小说阅读_起点中文小说网|免费小说,玄幻小说,武侠小说,青春小说,小说网各类小说下载\r\n',3),(14,'纵横中文网','http://www.zongheng.com','小说,小说网-纵横中文网|最热门的免费小说网',3),(15,'创世中文网','http://chuangshi.qq.com','小说_小说排行榜_免费小说下载网_好看的小说网络尽在创世中文网',3),(16,'小说阅读网','http://www.readnovel.com','',3),(17,'音悦台','http://www.yinyuetai.com','音悦台-口袋·FAN-看好音乐',4),(18,'QQ音乐','http://y.qq.com','',4),(19,'酷狗音乐','http://www.kugou.com','',4),(20,'一听音乐网','http://www.1ting.com','',4),(21,'17173','http://www.17173.com','',5),(22,'搜狐畅游','http://www.changyou.com','',5),(23,'手机游戏','http://www.wandoujia.com/tag/game','',5),(24,'小游戏','http://www.7k7k.com','',5),(25,'淘宝','http://www.taobao.com','',6),(26,'京东商城','http://www.jd.com','',6),(27,'苏宁易购','http://www.suning.com','',6),(28,'当当网','http://www.dangdang.com','',6),(29,'新浪新闻','http://news.sina.com.cn','',7),(30,'网易新闻','http://news.163.com','',7),(31,'搜狐新闻','http://news.sohu.com','',7),(32,'凤凰新闻','http://news.ifeng.com','',7),(33,'网易邮箱','http://email.163.com/','',8),(34,'QQ邮箱','http://mail.qq.com','',8),(35,'新浪邮箱','http://mail.sina.com.cn','',8),(36,'搜狐邮箱','http://mail.sohu.com','',8),(37,'Gmail','http://gmail.google.com','',8),(38,'Outlook','http://www.outlook.com/','',8),(39,'Foxmail','http://www.foxmail.com','',8),(40,'Tom','http://web.mail.tom.com','',8),(41,'人民网','http://www.people.com.cn','',7),(42,'新华网','http://www.xinhuanet.com','',7),(43,'环球网','http://www.huanqiu.com','',7),(44,'央视网','http://www.cntv.cn','',7),(45,'土豆网','http://www.tudou.com','',2),(46,'腾讯视频','http://v.qq.com','',2),(47,'迅雷看看','http://www.kankan.com','',2),(48,'酷6网','http://www.ku6.com','',2),(49,'新浪体育','http://sports.sina.com.cn','',9),(50,'网易体育','http://sports.163.com','',9),(51,'搜狐体育','http://sports.sohu.com','',9),(52,'QQ体育','http://sports.qq.com','',9),(53,'新浪微博','http://weibo.com','',10),(54,'腾讯微博','http://t.qq.com','',10),(55,'QQ空间','http://qzone.qq.com','',10),(56,'人人网','http://www.renren.com','',10),(57,'世纪佳缘','http://www.jiayuan.com','',11),(58,'珍爱网','http://www.zhenai.com','',11),(59,'百合网','http://www.baihe.com','',11),(60,'有缘交友','http://www.youyuan.com','',11),(61,'美团网','http://www.meituan.com','',12),(62,'窝窝团','http://www.55tuan.com','',12),(63,'拉手网','http://www.lashou.com','',12),(64,'大众点评团','http://t.dianping.com','',12),(65,'58同城','http://www.58.com','',13),(66,'赶集网','http://www.ganji.com','',13),(67,'大众点评','http://www.dianping.com','',13),(68,'饭统网','http://www.fantong.com','',13),(69,'去哪儿','http://www.qunar.com','',14),(70,'携程','http://www.ctrip.com','',14),(71,'途牛旅游网','http://www.tuniu.com','',14),(72,'同程网','http://www.17u.cn','',14),(73,'工商银行','http://www.icbc.com.cn','',15),(74,'农业银行','http://www.abchina.com','',15),(75,'建设银行','http://www.ccb.com','',15),(76,'招商银行','http://www.cmbchina.com','',15),(77,'火车票','https://kyfw.12306.cn','',16),(78,'飞机票','http://flight.qunar.com','',16),(79,'物流快递','http://www.kuaidi100.com','',16),(80,'天气预报','http://www.weather.com.cn/forecast/index.shtml','',16),(81,'猎聘网','http://www.liepin.com','',17),(82,'智联招聘','http://www.zhaopin.com','',17),(83,'前程无忧','http://www.51job.com','',17),(84,'中华英才网','http://www.chinahr.com','',17),(85,'百度地图','http://map.baidu.com','',18),(86,'谷歌地图','http://ditu.google.cn','',18),(87,'高德地图','http://www.amap.com','',18),(88,'搜狗地图','http://map.sogou.com','',18),(89,'西陆网','http://junshi.xilu.com','',19),(90,'铁血网','http://www.tiexue.net','',19),(91,'中华网军事','http://military.china.com','',19),(92,'新浪军事','http://mil.news.sina.com.cn','',19),(93,'新浪','http://www.sina.com.cn','',21),(94,'腾讯','http://www.qq.com','',21),(95,'网易','http://www.163.com','',21),(96,'搜狐','http://www.sohu.com','',21);
/*!40000 ALTER TABLE `website_trial` ENABLE KEYS */;
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
