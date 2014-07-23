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
-- Table structure for table `web_site`
--

DROP TABLE IF EXISTS `web_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_site` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group` int(10) unsigned NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_site`
--

LOCK TABLES `web_site` WRITE;
/*!40000 ALTER TABLE `web_site` DISABLE KEYS */;
INSERT INTO `web_site` VALUES (1,1,'百度','http://www.baidu.com','百度一下，你就知道','2014-07-23 10:19:52'),(2,1,'优酷','http://www.youku.com','优酷-中国第一视频网站,提供视频播放,视频发布,视频搜索 - 优酷视频','2014-07-23 10:19:52'),(3,1,'淘宝','http://www.taobao.com','淘宝网 - 淘！我喜欢','2014-07-23 10:19:52'),(4,1,'起点','http://www.qidian.com','\r\n	小说阅读_起点中文小说网|免费小说,玄幻小说,武侠小说,青春小说,小说网各类小说下载\r\n','2014-07-23 10:19:52'),(5,1,'网易邮箱','http://email.163.com/','网易免费邮箱 - 中国第一大电子邮件服务商','2014-07-23 10:19:52'),(6,1,'新浪微博','http://weibo.com','微博-随时随地分享身边的新鲜事儿','2014-07-23 10:19:52'),(7,1,'火车票','https://kyfw.12306.cn','客运服务 | 铁路客户服务中心','2014-07-23 10:19:52'),(8,1,'去哪儿网','http://www.qunar.com','【去哪儿网】机票查询预订，酒店预订，旅游团购，度假搜索，门票预订-去哪儿网Qunar.com','2014-07-23 10:19:52'),(9,2,'优酷','http://www.youku.com','优酷-中国第一视频网站,提供视频播放,视频发布,视频搜索 - 优酷视频','2014-07-23 10:19:52'),(10,2,'搜狐视频','http://tv.sohu.com','','2014-07-23 10:19:52'),(11,2,'爱奇艺','http://www.iqiyi.com','爱奇艺-爱奇艺视频,高清影视剧,网络视频在线观看','2014-07-23 10:19:52'),(12,2,'乐视网','http://www.letv.com','乐视网 - 中国第一影视剧视频网站 电影天堂 电视剧排行','2014-07-23 10:19:52'),(13,3,'起点中文网','http://www.qidian.com','\r\n	小说阅读_起点中文小说网|免费小说,玄幻小说,武侠小说,青春小说,小说网各类小说下载\r\n','2014-07-23 10:19:52'),(14,3,'纵横中文网','http://www.zongheng.com','小说,小说网-纵横中文网|最热门的免费小说网','2014-07-23 10:19:52'),(15,3,'创世中文网','http://chuangshi.qq.com','小说_小说排行榜_免费小说下载网_好看的小说网络尽在创世中文网','2014-07-23 10:19:52'),(16,3,'小说阅读网','http://www.readnovel.com','《小说阅读网》','2014-07-23 10:19:52'),(17,4,'音悦台','http://www.yinyuetai.com','音悦台-口袋·FAN-看好音乐','2014-07-23 10:19:52'),(18,4,'QQ音乐','http://y.qq.com','QQ音乐-音乐你的生活！','2014-07-23 10:19:52'),(19,4,'酷狗音乐','http://www.kugou.com','酷狗音乐 让音乐改变世界','2014-07-23 10:19:52'),(20,4,'一听音乐网','http://www.1ting.com','一听音乐网_歌曲大全::免费网络在线音乐第一站','2014-07-23 10:19:52'),(21,5,'17173','http://www.17173.com','::17173.com::中国游戏第一门户站','2014-07-23 10:19:52'),(22,5,'搜狐畅游','http://www.changyou.com','搜狐畅游——ChangYou.com','2014-07-23 10:19:52'),(23,5,'手机游戏','http://www.wandoujia.com/tag/game','最全安卓游戏分类 - 豌豆荚','2014-07-23 10:19:52'),(24,5,'小游戏','http://www.7k7k.com','小游戏,7k7k小游戏,小游戏大全,双人小游戏 - www.7k7k.com','2014-07-23 10:19:52'),(25,6,'淘宝','http://www.taobao.com','淘宝网 - 淘！我喜欢','2014-07-23 10:19:52'),(26,6,'京东商城','http://www.jd.com','京东网上商城-综合网购首选（JD.COM）-正品低价、品质保障、货到付款、配送及时、放心服务、轻松购物！','2014-07-23 10:19:52'),(27,6,'苏宁易购','http://www.suning.com','苏宁易购(Suning)-苏宁云商网上商城,是领先的综合网上购物商城,正品行货,全国联保,货到付款,让您尽享购物乐趣！','2014-07-23 10:19:52'),(28,6,'当当网','http://www.dangdang.com','当当网—网上购物中心：图书、母婴、美妆、家居、数码、家电、服装、鞋包等，正品低价，货到付款','2014-07-23 10:19:52'),(29,7,'新浪新闻','http://news.sina.com.cn','新闻中心首页_新浪网','2014-07-23 10:19:52'),(30,7,'网易新闻','http://news.163.com','网易新闻','2014-07-23 10:19:52'),(31,7,'搜狐新闻','http://news.sohu.com','','2014-07-23 10:19:52'),(32,7,'凤凰新闻','http://news.ifeng.com','凤凰资讯-凤凰网','2014-07-23 10:19:52'),(33,8,'网易邮箱','http://email.163.com/','网易免费邮箱 - 中国第一大电子邮件服务商','2014-07-23 10:19:52'),(34,8,'QQ邮箱','http://mail.qq.com','QQ邮箱','2014-07-23 10:19:52'),(35,8,'新浪邮箱','http://mail.sina.com.cn','','2014-07-23 10:19:52'),(36,8,'搜狐邮箱','http://mail.sohu.com','','2014-07-23 10:19:52'),(37,8,'Gmail','http://gmail.google.com','','2014-07-23 10:19:52'),(38,8,'Outlook','http://www.outlook.com/','','2014-07-23 10:19:52'),(39,8,'Foxmail','http://www.foxmail.com','Foxmail for windows','2014-07-23 10:19:52'),(40,8,'Tom','http://web.mail.tom.com','301 Moved Permanently','2014-07-23 10:19:52'),(41,7,'人民网','http://www.people.com.cn','人民网','2014-07-23 10:19:52'),(42,7,'新华网','http://www.xinhuanet.com','新华网_传播中国 报道世界','2014-07-23 10:19:52'),(43,7,'环球网','http://www.huanqiu.com','环球网_全球生活新门户_环球时报旗下网站','2014-07-23 10:19:52'),(44,7,'央视网','http://www.cntv.cn','央视网','2014-07-23 10:19:52'),(45,2,'土豆网','http://www.tudou.com','土豆_每个人都是生活的导演_在线视频观看,原创视频上传,海量视频搜索','2014-07-23 10:19:52'),(46,2,'腾讯视频','http://v.qq.com','腾讯视频-中国最大在线视频媒体平台,海量高清视频在线观看','2014-07-23 10:19:52'),(47,2,'迅雷看看','http://www.kankan.com','迅雷看看-中国第一高清影视门户 最新电影和最新电视剧在线观看','2014-07-23 10:19:52'),(48,2,'酷6网','http://www.ku6.com','酷6网 中国第一视频门户','2014-07-23 10:19:52'),(49,9,'新浪体育','http://sports.sina.com.cn','新浪竞技风暴_新浪网','2014-07-23 10:19:52'),(50,9,'网易体育','http://sports.163.com','网易体育_有态度的体育门户','2014-07-23 10:19:52'),(51,9,'搜狐体育','http://sports.sohu.com','','2014-07-23 10:19:52'),(52,9,'QQ体育','http://sports.qq.com','腾讯体育_腾讯网-人气最旺的体育门户','2014-07-23 10:19:52'),(53,10,'新浪微博','http://weibo.com','','2014-07-23 10:19:52'),(54,10,'腾讯微博','http://t.qq.com','腾讯微博_你的心声，世界的回声','2014-07-23 10:19:52'),(55,10,'QQ空间','http://qzone.qq.com','QQ空间-分享生活，留住感动','2014-07-23 10:19:52'),(56,10,'人人网','http://www.renren.com','人人网 中国领先的实名制SNS社交网络。加入人人网，找到老同学，结识新朋友。','2014-07-23 10:19:52'),(57,11,'世纪佳缘','http://www.jiayuan.com','世纪佳缘交友网：中国最大的严肃婚恋交友网站|免费注册马上寻缘','2014-07-23 10:19:52'),(58,11,'珍爱网','http://www.zhenai.com','【同城相亲】珍爱网 - 珍爱红娘婚恋婚介交友征婚服务','2014-07-23 10:19:52'),(59,11,'百合网','http://www.baihe.com','百合网_交友_征婚_相亲_中国首席婚恋服务专家','2014-07-23 10:19:52'),(60,11,'有缘交友','http://www.youyuan.com','有缘网婚恋交友-征婚_相亲_找对象,中国大众婚恋交友网站','2014-07-23 10:19:52'),(61,12,'美团网','http://www.meituan.com','【美团网团购】美团一次 美一次，专业品质团购网','2014-07-23 10:19:52'),(62,12,'窝窝团','http://www.55tuan.com','【窝窝团购网】-精挑细选团购大全,团购就上窝窝网(55tuan.com)!','2014-07-23 10:19:52'),(63,12,'拉手网','http://www.lashou.com','团购网-拉手网团购-超人气团购网站-团购上拉手','2014-07-23 10:19:52'),(64,12,'大众点评团','http://t.dianping.com','提示_大众点评网','2014-07-23 10:19:52'),(65,13,'58同城','http://www.58.com','','2014-07-23 10:19:52'),(66,13,'赶集网','http://www.ganji.com','','2014-07-23 10:19:52'),(67,13,'大众点评','http://www.dianping.com','','2014-07-23 10:19:52'),(69,14,'去哪儿','http://www.qunar.com','【去哪儿网】机票查询预订，酒店预订，旅游团购，度假搜索，门票预订-去哪儿网Qunar.com','2014-07-23 10:19:52'),(70,14,'携程','http://www.ctrip.com','携程旅行网官网:酒店预订,机票预订查询,旅游度假,商旅管理','2014-07-23 10:19:52'),(71,14,'途牛旅游网','http://www.tuniu.com','旅游_旅游网_旅游线路_自助游_自驾游_公司旅游_途牛旅游网','2014-07-23 10:19:52'),(72,14,'同程网','http://www.17u.cn','','2014-07-23 10:19:52'),(73,15,'工商银行','http://www.icbc.com.cn','','2014-07-23 10:19:52'),(74,15,'农业银行','http://www.abchina.com','中国农业银行','2014-07-23 10:19:52'),(75,15,'建设银行','http://www.ccb.com','','2014-07-23 10:19:52'),(76,15,'招商银行','http://www.cmbchina.com','\r\n	招商银行 -- 一网通主页\r\n','2014-07-23 10:19:52'),(77,16,'火车票','https://kyfw.12306.cn','客运服务 | 铁路客户服务中心','2014-07-23 10:19:52'),(78,16,'飞机票','http://flight.qunar.com','【去哪儿网】机票查询,特价机票,打折飞机票-去哪儿网Qunar.com','2014-07-23 10:19:52'),(79,16,'物流快递','http://www.kuaidi100.com','快递100-查快递,寄快递,上快递100','2014-07-23 10:19:52'),(80,16,'天气预报','http://www.weather.com.cn/forecast/index.shtml','天气预报-中国天气网','2014-07-23 10:19:52'),(81,17,'猎聘网','http://www.liepin.com','猎聘网 - 中高端人才求职、找工作，首选招聘平台！','2014-07-23 10:19:52'),(82,17,'智联招聘','http://www.zhaopin.com','招聘_求职_找工作_上智联招聘人才网','2014-07-23 10:19:52'),(83,17,'前程无忧','http://www.51job.com','招聘网_人才网_找工作_求职_上前程无忧','2014-07-23 10:19:52'),(84,17,'中华英才网','http://www.chinahr.com','【招聘网】找工作 -中华英才网','2014-07-23 10:19:52'),(85,18,'百度地图','http://map.baidu.com','百度地图','2014-07-23 10:19:52'),(86,18,'谷歌地图','http://ditu.google.cn','Google 地图','2014-07-23 10:19:52'),(87,18,'高德地图','http://www.amap.com','高德地图','2014-07-23 10:19:52'),(88,18,'搜狗地图','http://map.sogou.com','','2014-07-23 10:19:52'),(89,19,'西陆网','http://junshi.xilu.com','西陆军事-中国军事-国际军事-军事新闻-中国第一军事门户网站','2014-07-23 10:19:52'),(90,19,'铁血网','http://www.tiexue.net','军事-中国军事-军事新闻-铁血网 - 原创第一军事门户','2014-07-23 10:19:52'),(91,19,'中华网军事','http://military.china.com','军事－中华网－中国最大的军事网站','2014-07-23 10:19:52'),(92,19,'新浪军事','http://mil.news.sina.com.cn','军事频道_最多军迷首选的军事门户_新浪网','2014-07-23 10:19:52'),(93,21,'新浪','http://www.sina.com.cn','新浪首页','2014-07-23 10:19:52'),(94,21,'腾讯','http://www.qq.com','腾讯首页','2014-07-23 10:19:52'),(95,21,'网易','http://www.163.com','','2014-07-23 10:19:52'),(96,21,'搜狐','http://www.sohu.com','','2014-07-23 10:19:52');
/*!40000 ALTER TABLE `web_site` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-23 18:15:39
