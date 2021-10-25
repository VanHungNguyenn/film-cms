-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: zphimmoidb
-- ------------------------------------------------------
-- Server version	10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cms_authtokens`
--

DROP TABLE IF EXISTS `cms_authtokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_authtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `isblock` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `hit` int(11) DEFAULT 0,
  `username` varchar(45) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_authtokens`
--

LOCK TABLES `cms_authtokens` WRITE;
/*!40000 ALTER TABLE `cms_authtokens` DISABLE KEYS */;
INSERT INTO `cms_authtokens` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk3ODE5LCJleHAiOjE2NTcxMzM4MTl9.W5as2XgOjrLlpE0-7m3tfAELJKGHdvK4ewUMGTsbBvo',1,'2021-07-06 18:56:59','2021-07-28 13:27:28',0,'admin'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk3ODIwLCJleHAiOjE2NTcxMzM4MjB9.SZonCW6JtNJNUc-5tYVAYhIrYwqwEytw57sucWZFf2I',1,'2021-07-06 18:57:00','2021-07-28 13:27:28',0,'admin'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MDkwLCJleHAiOjE2NTcxMzQwOTB9.VizBd-4Ge9CtF40mUMEXssOmtf0SuK5c_dlOjnZ4txI',1,'2021-07-06 19:01:30','2021-07-28 13:27:28',0,'admin'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MDkxLCJleHAiOjE2NTcxMzQwOTF9.A0gwJgKJ91q-f2ArdX2VJuc_MAsFoEdt6ceNqYcL0fQ',1,'2021-07-06 19:01:31','2021-07-28 13:27:28',0,'admin'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MDkxLCJleHAiOjE2NTcxMzQwOTF9.A0gwJgKJ91q-f2ArdX2VJuc_MAsFoEdt6ceNqYcL0fQ',1,'2021-07-06 19:01:31','2021-07-28 13:27:28',0,'admin'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MDkxLCJleHAiOjE2NTcxMzQwOTF9.A0gwJgKJ91q-f2ArdX2VJuc_MAsFoEdt6ceNqYcL0fQ',1,'2021-07-06 19:01:31','2021-07-28 13:27:28',0,'admin'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MDkxLCJleHAiOjE2NTcxMzQwOTF9.A0gwJgKJ91q-f2ArdX2VJuc_MAsFoEdt6ceNqYcL0fQ',1,'2021-07-06 19:01:31','2021-07-28 13:27:28',0,'admin'),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MDkyLCJleHAiOjE2NTcxMzQwOTJ9.4TyTWgx3guPEPo0jGUsu-H_p7Z3ZVFdZ20i1P0UDG9s',1,'2021-07-06 19:01:32','2021-07-28 13:27:28',0,'admin'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MDkyLCJleHAiOjE2NTcxMzQwOTJ9.4TyTWgx3guPEPo0jGUsu-H_p7Z3ZVFdZ20i1P0UDG9s',1,'2021-07-06 19:01:33','2021-07-28 13:27:28',0,'admin'),(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MjU3LCJleHAiOjE2NTcxMzQyNTd9.OIEfoi7NISegOO8XUPCLYZ-daNLegkt7r-qaGMsK38Y',1,'2021-07-06 19:04:17','2021-07-28 13:27:28',0,'admin'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4Mjk2LCJleHAiOjE2NTcxMzQyOTZ9.2YO9RvEi-TSku5peDEVYdLjw49qtvFG2fyZhSfb6cxI',1,'2021-07-06 19:04:56','2021-07-28 13:27:28',0,'admin'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MzIzLCJleHAiOjE2NTcxMzQzMjN9._LoBYKfiunfD9EshrYaiVmlnY6zczgTFUq5muEVEB54',1,'2021-07-06 19:05:23','2021-07-28 13:27:28',0,'admin'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NTk4MzUzLCJleHAiOjE2NTcxMzQzNTN9.1G-v8JfrwwSm1BfXv7xlzc5MATT_QnYEwRSS6Kb2b0Q',1,'2021-07-06 19:05:53','2021-07-28 13:27:28',25,'admin'),(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NjMyMTg2LCJleHAiOjE2NTcxNjgxODZ9.yFPxCdaH3XZCS82VUwPu9S4KNbpznHvAgk42RPgPxXc',1,'2021-07-07 04:29:46','2021-07-28 13:27:28',26,'admin'),(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NjY0MTEzLCJleHAiOjE2NTcyMDAxMTN9.BKAYzCFL8lvUNWtk4AtBJEtl5abArZ0amdF8oszcW_k',1,'2021-07-07 13:21:53','2021-07-28 13:27:28',4,'admin'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NzE3MzUzLCJleHAiOjE2NTcyNTMzNTN9.9rELRQtiq_eMPe0Xm7O06VU7DnoM8REijuPToYBb13A',1,'2021-07-08 04:09:13','2021-07-28 13:27:28',16,'admin'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NzUyNTQyLCJleHAiOjE2NTcyODg1NDJ9.JHByoho8Jw4Oz8w9yXyzGWCybs4BkXf8x370BKrPQGI',1,'2021-07-08 13:55:42','2021-07-28 13:27:28',69,'admin'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1Nzc5ODYyLCJleHAiOjE2NTczMTU4NjJ9.f3lMKkKxe7hG72EnXp0LNQPB1HxWxO9LQ6MLE3eIl78',1,'2021-07-08 21:31:02','2021-07-28 13:27:28',25,'admin'),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1ODE2NTc2LCJleHAiOjE2NTczNTI1NzZ9.UuidTtaqNtYxhJWfH615KQK1UfgyfljmRwEXjfdZr0k',1,'2021-07-09 07:42:56','2021-07-28 13:27:28',3,'admin'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1ODUyMTc0LCJleHAiOjE2NTczODgxNzR9.nQTVYNy6sY7_7sj5rgrvEQ3OagzNaU-m9J12_N6X-w4',1,'2021-07-09 17:36:14','2021-07-28 13:27:28',10,'admin'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1ODkwODc3LCJleHAiOjE2NTc0MjY4Nzd9._x9MmTTgYP_E1xkFdruafS8f5kag91MUoFCP4DWCY2Y',1,'2021-07-10 04:21:17','2021-07-28 13:27:28',35,'admin'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1OTI1NzQ0LCJleHAiOjE2NTc0NjE3NDR9.DTYeX8CEPj2Vqvp2XnLqQv6g6e2qiAWNKzmhqGosPO8',1,'2021-07-10 14:02:24','2021-07-28 13:27:28',0,'admin'),(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1OTgzNzgzLCJleHAiOjE2NTc1MTk3ODN9.bJPVombddQ7DHRqe8pVnsMaUQ0ZLSt5I-VHKRqiSv0U',1,'2021-07-11 06:09:43','2021-07-28 13:27:28',22,'admin'),(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2MDE4MjA2LCJleHAiOjE2NTc1NTQyMDZ9.jl-K8Jj2Hu1Aw0StiPMm7SlgxalWHjTYIW_2HiQEUqg',1,'2021-07-11 15:43:26','2021-07-28 13:27:28',0,'admin'),(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2MTYzODA1LCJleHAiOjE2NTc2OTk4MDV9.-_WQJTaemgO2H69qoFHl--ud5hZ2ync05FLvtZRnVI8',1,'2021-07-13 08:10:05','2021-07-28 13:27:28',31,'admin'),(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2NDU1MTc3LCJleHAiOjE2NTc5OTExNzd9.HFbSi9iWcVRavn59-oyF3bx7AOqzzwrjBEQ38niFcg4',1,'2021-07-16 17:06:17','2021-07-28 13:27:28',21,'admin'),(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2ODM3NTE2LCJleHAiOjE2NTgzNzM1MTZ9.HkkFrjCLYR0GVKZRG7iIcD6y7xBrBHnfJkmGtAuGQN0',1,'2021-07-21 03:18:36','2021-07-28 13:27:28',0,'admin'),(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2ODcwMjA5LCJleHAiOjE2NTg0MDYyMDl9.KtIxF3qVK4o-zxzvoTyydvE_YfHxmSLngTPi-eZk-Yw',1,'2021-07-21 12:23:29','2021-07-28 13:27:28',18,'admin'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3MzUyODA0LCJleHAiOjE2NTg4ODg4MDR9.CZoLPlrnxODL0EnYBaggoKWtM-s5S9PmQececBsOid4',1,'2021-07-27 02:26:44','2021-07-28 13:27:28',3,'admin'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDc4ODQ2LCJleHAiOjE2NTkwMTQ4NDZ9.ai6Npfrm_KZClTVdyXRdFXEd-Uk59aoJKaFDfNHwdWc',1,'2021-07-28 13:27:26','2021-07-28 13:27:28',0,'admin'),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDc4ODQ4LCJleHAiOjE2NTkwMTQ4NDh9.DHoclYe3SJ--T2oQ0eELYcYVJpyQEG1OAVRE25EtW84',0,'2021-07-28 13:27:28','2021-07-28 17:31:58',8,'admin');
/*!40000 ALTER TABLE `cms_authtokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_categories`
--

DROP TABLE IF EXISTS `cms_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentid` int(11) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `fullslug` text DEFAULT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `seotitle` text NOT NULL,
  `seodescription` text NOT NULL,
  `catetype` varchar(45) NOT NULL,
  `catestatus` varchar(20) NOT NULL DEFAULT 'pending',
  `hirarchylevel` int(11) DEFAULT 1,
  `ratingcount` int(11) DEFAULT 0,
  `ratingaverage` decimal(2,1) DEFAULT 0.0,
  `likecount` int(11) DEFAULT 0,
  `postcount` int(11) DEFAULT 0,
  `author` int(11) DEFAULT NULL,
  `islikemain` tinyint(1) DEFAULT 1,
  `allowfollow` tinyint(1) DEFAULT 0,
  `allowindex` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_cate_old` int(11) DEFAULT 0,
  `keyword_old` text DEFAULT NULL,
  `id_country_old` int(11) DEFAULT 0,
  `type_cate_old` text DEFAULT NULL,
  `viewcountweek` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cms_categories_slug` (`slug`),
  KEY `indx_cate_catetype` (`catetype`),
  KEY `indx_cate_islikemain` (`islikemain`),
  KEY `indx_cate_createdat` (`createdAt`),
  KEY `indx_cate_updatedat` (`updatedAt`),
  KEY `indx_cate_viewcountweek` (`viewcountweek`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_categories`
--

LOCK TABLES `cms_categories` WRITE;
/*!40000 ALTER TABLE `cms_categories` DISABLE KEYS */;
INSERT INTO `cms_categories` VALUES (1,NULL,'trung-quoc','trung-quoc','Trung Quốc','','Trung Quốc','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',4,'',0),(2,NULL,'nhat-ban','nhat-ban','Nhật Bản','','Nhật Bản','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',5,'',0),(3,NULL,'han-quoc','han-quoc','Hàn Quốc','','Hàn Quốc','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',6,'',0),(4,NULL,'thai-lan','thai-lan','Thái Lan','','Thái Lan','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',7,'',0),(5,NULL,'viet-nam','viet-nam','Việt Nam','','Việt Nam','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',8,'',0),(6,NULL,'phap','phap','Pháp','','Pháp','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',9,'',0),(7,NULL,'canada','canada','Canada','','Canada','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',10,'',0),(8,NULL,'hong-kong','hong-kong','Hong Kong','','Hong Kong','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',11,'',0),(9,NULL,'dai-loan','dai-loan','Đài Loan','','Đài Loan','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',12,'',0),(10,NULL,'my','my','Mỹ','','Mỹ','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',13,'',0),(11,NULL,'an-do','an-do','Ấn Độ','','Ấn Độ','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',14,'',0),(12,NULL,'uc','uc','Úc','','Úc','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',15,'',0),(13,NULL,'anh','anh','Anh','','Anh','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',16,'',0),(14,NULL,'tay-ban-nha','tay-ban-nha','Tây Ban Nha','','Tây Ban Nha','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',17,'',0),(15,NULL,'quoc-gia-khac','quoc-gia-khac','Quốc Gia Khác','','Quốc Gia Khác','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',18,'',0),(16,NULL,'nga','nga','Nga','','Nga','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',19,'',0),(17,NULL,'ba-lan','ba-lan','Ba Lan ','','Ba Lan ','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',20,'',0),(18,NULL,'duc','duc','Đức','','Đức','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',21,'',0),(19,NULL,'y','y','Ý','','Ý','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',22,'',0),(20,NULL,'brazil','brazil','Brazil','','Brazil','','category-qg','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:32','2021-07-09 15:08:32',NULL,'',23,'',0),(32,NULL,'phim-hanh-dong','phim-hanh-dong','Phim Hành Động','','Phim Hành Động','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Hành động, Phim Hành Động Phiêu Lưu',1,'film',0),(33,NULL,'phim-hoat-hinh','phim-hoat-hinh','Phim Hoạt Hình','','Phim Hoạt Hình','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',2,'film',0),(34,NULL,'phim-vien-tuong','phim-vien-tuong','Phim Viễn Tưởng','','Phim Viễn Tưởng','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Viễn Tưởng, Mecha, Siêu năng lực, Tokusatsu, Space, Ma cà rồng, Phim Khoa Học Viễn Tưởng',3,'film',0),(35,NULL,'phim-tai-lieu','phim-tai-lieu','Phim Tài Liệu','','Phim Tài Liệu','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',4,'film',0),(36,NULL,'phim-bi-an','phim-bi-an','Phim Bí Ẩn','','Phim Bí Ẩn','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Mystery',5,'film',0),(37,NULL,'phim-phieu-luu','phim-phieu-luu','Phim Phiêu Lưu','','Phim Phiêu Lưu','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Phiêu Lưu, Phim Hành Động Phiêu Lưu',6,'film',0),(38,NULL,'phim-vo-thuat','phim-vo-thuat','Phim Võ Thuật','','Phim Võ Thuật','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Võ Thuật, Samurai',7,'film',0),(39,NULL,'phim-than-thoai','phim-than-thoai','Phim Thần Thoại','','Phim Thần Thoại','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',8,'film',0),(40,NULL,'phim-kich-tinh','phim-kich-tinh','Phim Kịch Tính','','Phim Kịch Tính','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',9,'film',0),(41,NULL,'phim-vien-tay','phim-vien-tay','Phim Viễn Tây','','Phim Viễn Tây','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',10,'film',0),(42,NULL,'phim-kinh-di','phim-kinh-di','Phim Kinh Dị','','Phim Kinh Dị','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Kinh Dị, Ma cà rồng, Thriller, Kinh dị',11,'film',0),(43,NULL,'phim-hai-huoc','phim-hai-huoc','Phim Hài Hước','','Phim Hài Hước','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Hài Hước, Parody, Hài hước, Phim Hài',12,'film',0),(44,NULL,'phim-lich-su','phim-lich-su','Phim Lịch Sử','','Phim Lịch Sử','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Lịch sử',13,'film',0),(45,NULL,'phim-gia-dinh','phim-gia-dinh','Phim Gia Đình','','Phim Gia Đình','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Gia đình',14,'film',0),(46,NULL,'phim-tinh-cam','phim-tinh-cam','Phim Tình Cảm','','Phim Tình Cảm','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Tình Cảm',15,'film',0),(47,NULL,'phim-tam-ly','phim-tam-ly','Phim Tâm Lý','','Phim Tâm Lý','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Psychological, Tâm lý',16,'film',0),(48,NULL,'tv-show','tv-show','TV Show','','TV Show','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',18,'film',0),(49,NULL,'the-thao','the-thao','Thể Thao','','Thể Thao','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',19,'film',0),(50,NULL,'phim-am-nhac','phim-am-nhac','Phim Âm Nhạc','','Phim Âm Nhạc','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Âm nhạc',20,'film',0),(51,NULL,'phim-hinh-su','phim-hinh-su','Phim Hình Sự','','Phim Hình Sự','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Thám Tử',21,'film',0),(52,NULL,'phim-toi-pham','phim-toi-pham','Phim Tội Phạm','','Phim Tội Phạm','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',22,'film',0),(53,NULL,'phim-chien-tranh','phim-chien-tranh','Phim Chiến Tranh','','Phim Chiến Tranh','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Quân đội, Samurai',23,'film',0),(54,NULL,'phim-chinh-kich','phim-chinh-kich','Phim Chính Kịch','','Phim Chính Kịch','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',24,'film',0),(55,NULL,'phim-sieu-nhien','phim-sieu-nhien','Phim Siêu Nhiên','','Phim Siêu Nhiên','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Siêu nhiên',25,'film',0),(56,NULL,'phim-co-trang','phim-co-trang','Phim Cổ Trang','','Phim Cổ Trang','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Samurai',26,'film',0),(57,NULL,'phim-hoc-duong','phim-hoc-duong','Phim Học Đường','','Phim Học Đường','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Học Đường',27,'film',0),(58,NULL,'phim-phep-thuat','phim-phep-thuat','Phim Phép Thuật','','Phim Phép Thuật','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Phép Thuật',28,'film',0),(59,NULL,'phim-tro-choi','phim-tro-choi','Phim Trò Chơi','','Phim Trò Chơi','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Trò chơi',29,'film',0),(60,NULL,'phim-hoa-ngu','phim-hoa-ngu','Phim Hoa Ngữ','','Phim Hoa Ngữ','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',31,'film',0),(61,NULL,'phim-drama','phim-drama','Phim Drama','','Phim Drama','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Drama, Tragedy',32,'film',0),(62,NULL,'phim-gia-tuong','phim-gia-tuong','Phim Giả Tưởng','','Phim Giả Tưởng','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Giả tưởng',33,'film',0),(63,NULL,'phim-doi-thuong','phim-doi-thuong','Phim Đời Thường','','Phim Đời Thường','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Đời Thường',36,'film',0),(64,NULL,'phim-harem','phim-harem','Phim Harem','','Phim Harem','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Harem',37,'film',0),(65,NULL,'phim-ecchi','phim-ecchi','Phim Ecchi','','Phim Ecchi','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Ecchi',38,'film',0),(66,NULL,'phim-shounen','phim-shounen','Phim Shounen','','Phim Shounen','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Shounen',39,'film',0),(67,NULL,'live-action','live-action','Live Action','','Live Action','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',41,'film',0),(68,NULL,'cn-animation','cn-animation','CN Animation','','CN Animation','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Tiên Hiệp, Kiếm Hiệp, Xuyên Không, Trùng Sinh, Huyền Ảo, Ngôn Tình, Dị Giới, Khoa Huyễn, Hài Hước[CN], Huyền Huyễn, Đam Mỹ, Võ Hiệp',42,'film',0),(69,NULL,'khac','khac','Khác','','Khác','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',43,'film',0),(70,NULL,'sieu-anh-hung','sieu-anh-hung','Siêu Anh Hùng','','Siêu Anh Hùng','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'Siêu anh hùng, super hero',45,'film',0),(71,NULL,'phim-khoa-hoc-vien-tuong','phim-khoa-hoc-vien-tuong','Phim khoa học viễn tưởng','','Phim khoa học viễn tưởng','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',52,'netflix',0),(72,NULL,'hanh-dong-phieu-luu','hanh-dong-phieu-luu','Hành động & Phiêu lưu','','Hành động & Phiêu lưu','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',54,'netflix',0),(73,NULL,'toi-pham','toi-pham','Tội Phạm','','Tội Phạm','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',55,'netflix',0),(74,NULL,'phim-anime','phim-anime','Phim Anime','','Phim Anime','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',56,'netflix',0),(75,NULL,'anime-hai-huoc','anime-hai-huoc','Anime Hài Hước','','Anime Hài Hước','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',57,'netflix',0),(76,NULL,'phim-dua-tren-cau-chuyen-co-that','phim-dua-tren-cau-chuyen-co-that','Phim dựa trên câu chuyện có thật','','Phim dựa trên câu chuyện có thật','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',58,'netflix',0),(77,NULL,'phim-chuyen-the-tu-sach','phim-chuyen-the-tu-sach','Phim chuyển thể từ sách','','Phim chuyển thể từ sách','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',59,'netflix',0),(78,NULL,'phim-hai','phim-hai','Phim Hài','','Phim Hài','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',60,'netflix',0),(79,NULL,'phim-the-thao','phim-the-thao','Phim Thể Thao','','Phim Thể Thao','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',61,'netflix',0),(80,NULL,'phim-truyen-gia-dinh','phim-truyen-gia-dinh','Phim Truyện Gia Đình','','Phim Truyện Gia Đình','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',62,'netflix',0),(81,NULL,'phim-tre-em-va-gia-dinh','phim-tre-em-va-gia-dinh','Phim Trẻ Em Và Gia Đình','','Phim Trẻ Em Và Gia Đình','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',63,'netflix',0),(82,NULL,'phim-tuoi-teen','phim-tuoi-teen','Phim Tuổi Teen','','Phim Tuổi Teen','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',64,'netflix',0),(83,NULL,'phim-vo-thuat-netflix','phim-vo-thuat-netflix','Phim Võ Thuật Netflix','','Phim Võ Thuật Netflix','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',70,'netflix',0),(84,NULL,'phim-viet-nam','phim-viet-nam','Phim Việt Nam','','Phim Việt Nam','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',71,'netflix',0),(85,NULL,'phim-giat-gan','phim-giat-gan','Phim Giật Gân','','Phim Giật Gân','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',72,'netflix',0),(86,NULL,'phim-kinh-di-netflix','phim-kinh-di-netflix','Phim Kinh Dị Netflix','','Phim Kinh Dị Netflix','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',74,'netflix',0),(87,NULL,'anime-lang-man','anime-lang-man','Anime Lãng Mạn','','Anime Lãng Mạn','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',75,'netflix',0),(88,NULL,'anime-chinh-kich','anime-chinh-kich','Anime Chính Kịch','','Anime Chính Kịch','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',76,'netflix',0),(89,NULL,'phim-chinh-kich-netflix','phim-chinh-kich-netflix','Phim Chính Kịch Netflix','','Phim Chính Kịch Netflix','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',78,'netflix',0),(90,NULL,'bi-an-netflix','bi-an-netflix','Bí Ẩn Netflix','','Bí Ẩn Netflix','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',79,'netflix',0),(91,NULL,'phim-chinh-kich-ve-van-de-xa-hoi','phim-chinh-kich-ve-van-de-xa-hoi','Phim chính kịch về vấn đề xã hội','','Phim chính kịch về vấn đề xã hội','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',80,'netflix',0),(92,NULL,'hai-lang-man','hai-lang-man','Hài Lãng Mạn','','Hài Lãng Mạn','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',81,'netflix',0),(93,NULL,'phim-ve-diep-vien','phim-ve-diep-vien','Phim về điệp viên','','Phim về điệp viên','','category-tl','published',1,0,0.0,0,0,1,1,0,0,'2021-07-09 15:08:42','2021-07-09 15:08:42',NULL,'',83,'netflix',0);
/*!40000 ALTER TABLE `cms_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_catelangs`
--

DROP TABLE IF EXISTS `cms_catelangs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_catelangs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cateid` int(11) NOT NULL,
  `langid` varchar(10) NOT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `seotitle` text NOT NULL,
  `seodescription` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cms_catelangs_cateid_langid` (`cateid`,`langid`),
  KEY `indx_catelang_langid` (`langid`),
  CONSTRAINT `cms_catelangs_ibfk_1` FOREIGN KEY (`cateid`) REFERENCES `cms_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_catelangs`
--

LOCK TABLES `cms_catelangs` WRITE;
/*!40000 ALTER TABLE `cms_catelangs` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_catelangs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_episodes`
--

DROP TABLE IF EXISTS `cms_episodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_episodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_old` int(11) DEFAULT 0,
  `slug` varchar(255) DEFAULT '',
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `postid` int(11) DEFAULT NULL,
  `serverid` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `isblock` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `numsort` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `postid` (`postid`),
  KEY `serverid` (`serverid`),
  CONSTRAINT `cms_episodes_ibfk_555` FOREIGN KEY (`postid`) REFERENCES `cms_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cms_episodes_ibfk_556` FOREIGN KEY (`serverid`) REFERENCES `cms_servers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_episodes`
--

LOCK TABLES `cms_episodes` WRITE;
/*!40000 ALTER TABLE `cms_episodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_episodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_feedbacks`
--

DROP TABLE IF EXISTS `cms_feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `fbstatus` varchar(45) DEFAULT 'pending',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `ipaddress` varchar(45) DEFAULT NULL,
  `useragent` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_feedbacks`
--

LOCK TABLES `cms_feedbacks` WRITE;
/*!40000 ALTER TABLE `cms_feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_interactives`
--

DROP TABLE IF EXISTS `cms_interactives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_interactives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iatype` varchar(45) NOT NULL,
  `objtype` varchar(45) NOT NULL,
  `objectid` int(11) DEFAULT NULL,
  `point` int(11) DEFAULT 1,
  `ipaddress` varchar(45) DEFAULT NULL,
  `useragent` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_interactives`
--

LOCK TABLES `cms_interactives` WRITE;
/*!40000 ALTER TABLE `cms_interactives` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_interactives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_languages`
--

DROP TABLE IF EXISTS `cms_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_languages` (
  `id` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `codelang` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `ismain` tinyint(1) NOT NULL DEFAULT 0,
  `isblock` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `area` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_languages`
--

LOCK TABLES `cms_languages` WRITE;
/*!40000 ALTER TABLE `cms_languages` DISABLE KEYS */;
INSERT INTO `cms_languages` VALUES ('vn','vi-VN','Việt nam',1,0,'2021-07-05 02:47:57','2021-07-05 02:47:57','VN');
/*!40000 ALTER TABLE `cms_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_medias`
--

DROP TABLE IF EXISTS `cms_medias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_medias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text DEFAULT NULL,
  `seotitle` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `urlicon` varchar(255) DEFAULT NULL,
  `filetype` varchar(45) DEFAULT NULL,
  `filesize` varchar(45) DEFAULT NULL,
  `imgwidth` int(11) DEFAULT 0,
  `imgheight` int(11) DEFAULT 0,
  `childsizes` varchar(255) DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_medias`
--

LOCK TABLES `cms_medias` WRITE;
/*!40000 ALTER TABLE `cms_medias` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_medias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_menuitem_langs`
--

DROP TABLE IF EXISTS `cms_menuitem_langs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_menuitem_langs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mitemid` int(11) DEFAULT NULL,
  `langid` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mitemid` (`mitemid`),
  CONSTRAINT `cms_menuitem_langs_ibfk_1` FOREIGN KEY (`mitemid`) REFERENCES `cms_menuitems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_menuitem_langs`
--

LOCK TABLES `cms_menuitem_langs` WRITE;
/*!40000 ALTER TABLE `cms_menuitem_langs` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_menuitem_langs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_menuitems`
--

DROP TABLE IF EXISTS `cms_menuitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_menuitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentid` int(11) DEFAULT NULL,
  `menuid` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `objectid` int(11) DEFAULT 0,
  `objectslug` text DEFAULT NULL,
  `objecttitle` text DEFAULT NULL,
  `alllanguage` tinyint(1) NOT NULL DEFAULT 1,
  `objectlangs` text DEFAULT NULL,
  `numsort` int(11) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menuid` (`menuid`),
  CONSTRAINT `cms_menuitems_ibfk_1` FOREIGN KEY (`menuid`) REFERENCES `cms_menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_menuitems`
--

LOCK TABLES `cms_menuitems` WRITE;
/*!40000 ALTER TABLE `cms_menuitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_menuitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_menus`
--

DROP TABLE IF EXISTS `cms_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_menus` (
  `id` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_menus`
--

LOCK TABLES `cms_menus` WRITE;
/*!40000 ALTER TABLE `cms_menus` DISABLE KEYS */;
INSERT INTO `cms_menus` VALUES ('menu-footer','Menu Footer','2021-07-07 02:34:57','2021-07-07 02:34:57'),('menu-header','Menu Header','2021-07-07 02:35:26','2021-07-07 02:35:26');
/*!40000 ALTER TABLE `cms_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_options`
--

DROP TABLE IF EXISTS `cms_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metakey` varchar(45) NOT NULL,
  `metavalue` text DEFAULT NULL,
  `fieldlabel` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `inputtype` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_options`
--

LOCK TABLES `cms_options` WRITE;
/*!40000 ALTER TABLE `cms_options` DISABLE KEYS */;
INSERT INTO `cms_options` VALUES (3,'off_optimze_image_upload','true','Tất tối ưu ảnh',NULL,'checkbox','2020-12-02 05:29:01','2021-06-27 13:24:07');
/*!40000 ALTER TABLE `cms_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_post_cate_types`
--

DROP TABLE IF EXISTS `cms_post_cate_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_post_cate_types` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `ptypeid` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
  `ctypeid` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`ptypeid`,`ctypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_post_cate_types`
--

LOCK TABLES `cms_post_cate_types` WRITE;
/*!40000 ALTER TABLE `cms_post_cate_types` DISABLE KEYS */;
INSERT INTO `cms_post_cate_types` VALUES ('2021-07-09 04:20:07','2021-07-09 04:20:07','post-blog','category-blog'),('2021-07-09 04:21:29','2021-07-09 04:21:29','post-blog','tags'),('2021-07-09 04:20:17','2021-07-09 04:20:17','post-film','category-dd'),('2021-07-09 04:20:25','2021-07-09 04:20:25','post-film','category-dv'),('2021-07-09 04:20:35','2021-07-09 04:20:35','post-film','category-qg'),('2021-07-09 04:20:42','2021-07-09 04:20:42','post-film','category-tl'),('2021-07-16 18:34:59','2021-07-16 18:34:59','post-film','Serial'),('2021-07-09 04:21:29','2021-07-09 04:21:29','post-film','tags');
/*!40000 ALTER TABLE `cms_post_cate_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_post_cates`
--

DROP TABLE IF EXISTS `cms_post_cates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_post_cates` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postid` int(11) NOT NULL,
  `cateid` int(11) NOT NULL,
  PRIMARY KEY (`postid`,`cateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_post_cates`
--

LOCK TABLES `cms_post_cates` WRITE;
/*!40000 ALTER TABLE `cms_post_cates` DISABLE KEYS */;
INSERT INTO `cms_post_cates` VALUES ('2021-07-28 17:33:35','2021-07-28 17:33:35',20,11),('2021-07-28 17:33:35','2021-07-28 17:33:35',20,88);
/*!40000 ALTER TABLE `cms_post_cates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_postlangs`
--

DROP TABLE IF EXISTS `cms_postlangs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_postlangs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postid` int(11) NOT NULL,
  `langid` varchar(10) NOT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `seotitle` text NOT NULL,
  `seodescription` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cms_postlangs_postid_langid` (`postid`,`langid`),
  KEY `indx_postlang_langid` (`langid`),
  CONSTRAINT `cms_postlangs_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `cms_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_postlangs`
--

LOCK TABLES `cms_postlangs` WRITE;
/*!40000 ALTER TABLE `cms_postlangs` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_postlangs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_posts`
--

DROP TABLE IF EXISTS `cms_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentid` int(11) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `seotitle` text DEFAULT NULL,
  `seodescription` text DEFAULT NULL,
  `posttype` varchar(45) DEFAULT '',
  `poststatus` varchar(45) DEFAULT '',
  `publishedat` datetime NOT NULL,
  `postorder` int(11) DEFAULT 0,
  `islikemain` tinyint(1) DEFAULT 1,
  `allowindex` tinyint(1) DEFAULT 0,
  `allowfollow` tinyint(1) DEFAULT 0,
  `thumbnail` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `author` int(11) DEFAULT NULL,
  `imgicon` int(11) DEFAULT NULL,
  `viewcount` int(11) DEFAULT 0,
  `dcateid` int(11) DEFAULT NULL,
  `ratingcount` int(11) DEFAULT 0,
  `ratingaverage` decimal(2,1) DEFAULT 0.0,
  `viewcountday` int(11) DEFAULT 0,
  `viewcountweek` int(11) DEFAULT 0,
  `nolink` tinyint(1) DEFAULT 0,
  `template` varchar(255) DEFAULT NULL,
  `modifiedat` datetime NOT NULL,
  `notenglish` tinyint(1) DEFAULT 0,
  `viewcountmonth` int(11) DEFAULT 0,
  `filmyear` varchar(5) DEFAULT NULL,
  `filmtype` varchar(45) DEFAULT NULL,
  `filmtime` varchar(45) DEFAULT NULL,
  `imdb` float DEFAULT 0,
  `filmname` varchar(255) DEFAULT NULL,
  `slider` tinyint(1) DEFAULT 0,
  `recommended` tinyint(1) DEFAULT 0,
  `copyright` tinyint(1) DEFAULT 0,
  `channelplay` varchar(45) DEFAULT '',
  `actor_old` text DEFAULT NULL,
  `director_old` text DEFAULT NULL,
  `keyword_old` text DEFAULT NULL,
  `thumb_old` text DEFAULT NULL,
  `banner_old` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `done` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cms_posts_slug` (`slug`),
  KEY `indx_posts_poststatus` (`poststatus`),
  KEY `indx_posts_publishedat` (`publishedat`),
  KEY `indx_posts_islikemain` (`islikemain`),
  KEY `indx_posts_modifiedat` (`modifiedat`),
  KEY `indx_posts_viewcountday` (`viewcountday`),
  KEY `indx_posts_viewcountweek` (`viewcountweek`),
  KEY `indx_posts_filmtype` (`filmtype`),
  KEY `indx_posts_notenglish` (`notenglish`),
  KEY `indx_posts_slider` (`slider`),
  KEY `indx_post_viewcountweek` (`viewcountweek`),
  KEY `indx_post_dcateid` (`dcateid`),
  KEY `indx_post_icon` (`imgicon`),
  KEY `indx_post_thumb` (`thumbnail`),
  KEY `indx_posts_recommended` (`recommended`),
  KEY `indx_posts_imdb` (`imdb`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_posts`
--

LOCK TABLES `cms_posts` WRITE;
/*!40000 ALTER TABLE `cms_posts` DISABLE KEYS */;
INSERT INTO `cms_posts` VALUES (1,NULL,'home','Trang chủ','','','Phim Mới | Phim hay | Xem phim nhanh | Xem phim online | Phim HD vietsub hay nhất','Xem phim mới miễn phí nhanh chất lượng cao. Xem Phim online Việt Sub, Thuyết minh, lồng tiếng chất lượng HD. Xem phim nhanh online chất lượng cao','post-page','published','2020-12-06 04:33:00',0,1,1,0,3,'2020-12-06 04:33:57','2021-07-08 22:20:43',1,NULL,10,NULL,0,0.0,0,0,1,NULL,'2021-06-08 07:39:05',0,0,NULL,NULL,NULL,NULL,NULL,0,0,0,'',NULL,NULL,NULL,NULL,NULL,NULL,0),(2,NULL,'phim-le','Phim lẻ','Phim lẻ','<p>Phim lẻ</p>','Phim lẻ','Phim lẻ','post-page','published','2021-07-21 12:24:25',0,1,1,0,NULL,'2021-07-21 12:24:41','2021-07-21 12:25:41',1,NULL,0,NULL,0,0.0,0,0,1,NULL,'2021-07-21 12:24:25',0,0,'','','',0,'',0,0,0,'','','','','','','',0),(3,NULL,'phim-bo','Phim bộ','Phim bộ','<p>Phim bộ</p>','Phim bộ','Phim bộ','post-page','published','2021-07-21 12:24:44',0,1,1,0,NULL,'2021-07-21 12:24:55','2021-07-21 12:25:39',1,NULL,0,NULL,0,0.0,0,0,1,NULL,'2021-07-21 12:24:44',0,0,'','','',0,'',0,0,0,'','','','','','','',0),(4,NULL,'phim-de-cu','Phim đề cử','Phim đề cử','<p>Phim đề cử</p>','Phim đề cử','Phim đề cử','post-page','published','2021-07-21 12:23:41',0,1,1,1,NULL,'2021-07-21 12:24:02','2021-07-21 12:24:14',1,NULL,0,NULL,0,0.0,0,0,1,NULL,'2021-07-21 12:23:41',0,0,'','','',0,'',0,0,0,'','','','','','','',0),(5,NULL,'phim-top-imdb','Phim top imdb','','<p>Phim top imdb</p>','Phim top imdb','Phim top imdb','post-page','published','2021-07-21 12:25:01',0,1,1,1,NULL,'2021-07-21 12:25:18','2021-07-21 12:25:18',1,NULL,0,NULL,0,0.0,0,0,1,NULL,'2021-07-21 12:25:01',0,0,'','','',0,'',0,0,0,'','','','','','','',0),(6,NULL,'phim-chieu-rap','Phim chiếu rạp','Phim chiếu rạp','<p>Phim chiếu rạp</p>','Phim chiếu rạp','Phim chiếu rạp','post-page','published','2021-07-21 12:37:09',0,1,1,1,NULL,'2021-07-21 12:37:25','2021-07-21 12:37:29',1,NULL,0,NULL,0,0.0,0,0,1,NULL,'2021-07-21 12:37:09',0,0,'','','',0,'',0,0,0,'','','','','','','',0),(7,NULL,'phim-hoat-hinh','Phim hoạt hình','Phim hoạt hình','','Phim hoạt hình','Phim hoạt hình','post-page','published','2021-07-21 13:10:22',0,1,1,1,NULL,'2021-07-21 13:10:40','2021-07-21 13:10:40',1,NULL,0,NULL,0,0.0,0,0,1,NULL,'2021-07-21 13:10:22',0,0,'','','',0,'',0,0,0,'','','','','','','',0);
/*!40000 ALTER TABLE `cms_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_role_features`
--

DROP TABLE IF EXISTS `cms_role_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_role_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sitefeatureid` int(11) NOT NULL,
  `roleid` int(11) NOT NULL,
  `actview` tinyint(1) DEFAULT 0,
  `actadd` tinyint(1) DEFAULT 0,
  `actedit` tinyint(1) DEFAULT 0,
  `actdel` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_role_features`
--

LOCK TABLES `cms_role_features` WRITE;
/*!40000 ALTER TABLE `cms_role_features` DISABLE KEYS */;
INSERT INTO `cms_role_features` VALUES (73,10,2,1,1,1,1,'2021-01-16 07:50:45','2021-01-16 14:13:19'),(74,11,2,1,1,1,1,'2021-01-16 07:50:47','2021-01-16 14:13:22'),(76,13,2,1,1,1,1,'2021-01-16 07:50:52','2021-01-16 14:13:14'),(77,14,2,1,1,1,1,'2021-01-16 07:50:59','2021-01-16 14:13:13'),(79,16,2,1,1,1,1,'2021-01-16 07:51:08','2021-01-16 14:13:11'),(83,10,3,1,1,1,0,'2021-01-16 07:56:39','2021-01-16 07:58:02'),(84,13,3,1,1,1,0,'2021-01-16 07:56:41','2021-01-16 07:58:04'),(87,11,3,1,1,1,0,'2021-01-16 07:56:53','2021-01-16 07:58:03'),(90,13,4,1,1,1,1,'2021-01-16 07:59:12','2021-03-30 08:26:07'),(91,15,4,1,1,1,1,'2021-01-16 07:59:15','2021-03-30 08:26:11'),(92,16,4,1,1,1,1,'2021-01-16 07:59:23','2021-03-30 08:26:10'),(96,10,14,1,1,0,0,'2021-01-16 08:00:13','2021-01-17 08:37:07'),(97,13,14,1,1,0,0,'2021-01-16 08:00:15','2021-01-17 07:38:20'),(99,14,3,1,1,1,0,'2021-01-16 19:02:38','2021-01-17 14:42:04'),(100,14,4,1,1,0,0,'2021-01-16 19:02:50','2021-01-16 19:02:53'),(103,14,14,1,1,0,0,'2021-01-17 08:44:20','2021-01-17 08:44:26'),(125,32,2,1,1,1,1,'2021-02-26 01:13:08','2021-07-07 03:25:23'),(126,32,3,1,1,1,0,'2021-02-26 01:13:22','2021-02-26 01:13:48'),(134,11,17,1,1,1,0,'2021-05-08 09:44:57','2021-05-08 09:46:06'),(136,16,17,1,1,1,0,'2021-05-08 09:45:15','2021-05-08 09:46:24'),(137,15,17,1,1,1,0,'2021-05-08 09:45:19','2021-05-08 09:46:25'),(138,10,17,1,1,1,0,'2021-05-08 09:45:24','2021-05-08 09:46:28'),(140,32,17,1,1,1,0,'2021-05-08 09:45:36','2021-05-08 09:46:35');
/*!40000 ALTER TABLE `cms_role_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_roles`
--

DROP TABLE IF EXISTS `cms_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(45) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ismaster` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cms_roles_rolename` (`rolename`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_roles`
--

LOCK TABLES `cms_roles` WRITE;
/*!40000 ALTER TABLE `cms_roles` DISABLE KEYS */;
INSERT INTO `cms_roles` VALUES (1,'Administrator','Quản trị viên','2020-12-02 05:29:01','2021-07-07 03:10:01',1),(2,'Manager','Duyệt, xóa bài viết danh mục','2020-12-02 05:29:01','2021-07-07 03:10:37',0),(3,'Editor','Viết bài','2021-01-01 16:39:35','2021-07-07 03:10:56',0);
/*!40000 ALTER TABLE `cms_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_servers`
--

DROP TABLE IF EXISTS `cms_servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isblock` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_servers`
--

LOCK TABLES `cms_servers` WRITE;
/*!40000 ALTER TABLE `cms_servers` DISABLE KEYS */;
INSERT INTO `cms_servers` VALUES (2,'HD-1','',0,'2021-07-09 19:16:49','2021-07-09 19:16:49'),(3,'HD-2','',0,'2021-07-09 19:16:56','2021-07-09 19:16:56'),(4,'Hydrax','',0,'2021-07-09 19:17:03','2021-07-09 19:17:03'),(5,'Thuyết Minh','',0,'2021-07-09 19:17:09','2021-07-09 19:17:09'),(6,'CAM-1','',0,'2021-07-09 19:17:16','2021-07-09 19:17:16'),(7,'CAM-2','',0,'2021-07-09 19:17:23','2021-07-09 19:17:23');
/*!40000 ALTER TABLE `cms_servers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_site_features`
--

DROP TABLE IF EXISTS `cms_site_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_site_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentid` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT '',
  `name` varchar(255) DEFAULT '',
  `description` text DEFAULT NULL,
  `url` varchar(255) DEFAULT '',
  `nolink` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `icon` varchar(45) DEFAULT '',
  `numsort` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_site_features`
--

LOCK TABLES `cms_site_features` WRITE;
/*!40000 ALTER TABLE `cms_site_features` DISABLE KEYS */;
INSERT INTO `cms_site_features` VALUES (3,NULL,'Bài viết','Bài viết','','',1,'2021-01-15 09:44:55','2021-07-07 02:04:38','<i class=\"fas fa-edit\"></i>',7),(5,NULL,'Cài đặt','Cài đặt','','',1,'2021-01-15 09:45:23','2021-07-05 02:22:36','<i class=\"fas fa-tools\"></i>',23),(10,3,'Danh sách','Danh sách bài viết','','/post/post-blog',0,'2021-01-15 09:51:16','2021-07-05 02:30:18','<i class=\"fas fa-edit\"></i>',8),(11,3,'Danh mục','Danh mục bài viết','','/category/category-blog',0,'2021-01-15 09:51:36','2021-07-05 02:29:57','<i class=\"fas fa-stream\"></i>',9),(13,NULL,'Trang','Trang','','/post/post-page',0,'2021-01-15 09:52:16','2021-07-05 02:32:33','<i class=\"fas fa-paste\"></i>',12),(14,NULL,'Hình ảnh','Hình ảnh','','/media',0,'2021-01-15 09:53:03','2021-07-05 02:19:39','<i class=\"fas fa-images\"></i>',13),(16,NULL,'Phản hồi','Phản hồi','','/feedback',0,'2021-01-15 09:53:38','2021-07-05 02:19:10','<i class=\"fas fa-envelope\"></i>',15),(19,27,'Người dùng','Người dùng','','/user',0,'2021-01-15 09:54:24','2021-07-05 02:30:59','<i class=\"fas fa-users\"></i>',20),(20,27,'Nhóm quyền','Nhóm quyền','','/role',0,'2021-01-15 09:54:44','2021-07-05 02:22:58','<i class=\"fas fa-user-shield\"></i>',21),(21,NULL,'Ngôn ngữ','Ngôn ngữ','','/language',0,'2021-01-15 09:55:03','2021-07-05 02:19:20','<i class=\"fas fa-globe-americas\"></i>',18),(23,5,'Kiểu','Kiểu','Kiểu Danh mục và Bài viết','/type',0,'2021-01-15 09:55:51','2021-07-05 02:55:07','<i class=\"fas fa-cubes\"></i>',25),(24,5,'Tính năng','Tính năng','','/sitefeature',0,'2021-01-15 09:56:16','2021-07-05 02:28:13','<i class=\"fas fa-cubes\"></i>',27),(25,5,'Tham số','Tham số','','/option',0,'2021-01-15 09:56:33','2021-07-05 02:44:30','<i class=\"fas fa-cogs\"></i>',25),(26,27,'Phân quyền','Phân quyền','','/rolefeature',0,'2021-01-16 10:45:43','2021-07-05 02:31:34','<i class=\"fas fa-tags\"></i>',22),(27,NULL,'Quyền hạn','Quyền hạn','','',1,'2021-01-16 13:42:36','2021-07-05 02:27:46','<i class=\"fas fa-users-cog\"></i>',19),(28,5,'Menu','Menu','','/menu',0,'2021-01-16 19:08:25','2021-01-18 08:18:15','<i class=\"fas fa-bars\"></i>',0),(32,3,'Tags ','Tags','Tags bài viết','/category/tags',0,'2021-02-26 01:05:04','2021-07-07 10:16:06','<i class=\"fas fa-tag\"></i>',10),(38,NULL,'Phim','Phim','','',1,'2021-07-05 02:36:21','2021-07-05 02:38:03','<i class=\"fas fa-film\"></i>',0),(39,38,'Danh sách','Danh sách phim','Danh sách phim','/post/post-film',0,'2021-07-05 02:38:42','2021-07-08 05:04:42','<i class=\"fas fa-film\"></i>',1),(40,38,'Thể loại','Thể loại phim','Phân loại phim theo danh mục thể loại','/category/category-tl',0,'2021-07-05 02:40:32','2021-07-08 05:04:58','<i class=\"fas fa-layer-group\"></i>',2),(41,38,'Quốc gia','Quốc gia','Phân loại phim theo quốc gia','/category/category-qg',0,'2021-07-05 02:42:33','2021-07-08 05:05:03','<i class=\"fas fa-globe\"></i>',3),(42,38,'Tags','Tags','Tags phim','/category/tags',0,'2021-07-07 10:14:40','2021-07-08 05:03:40','<i class=\"fas fa-tag\"></i>',6),(43,38,'Diễn viên','Diễn viên','Diễn viên phim','/category/category-dv',0,'2021-07-08 05:02:24','2021-07-08 05:02:24','<i class=\"fas fa-users\"></i>',4),(44,38,'Đạo diễn','Đạo diễn','Đạo diễn phim','/category/category-dd',0,'2021-07-08 05:03:11','2021-07-08 05:03:11','<i class=\"fas fa-user-tie\"></i>',5),(45,38,'Server','Server','Server phim','/server',0,'2021-07-09 19:05:08','2021-07-09 19:05:08','<i class=\"fas fa-server\"></i>',7),(46,38,'Serial','Serial','Gôm nhiều phim thành session','/category/serial',0,'2021-07-16 18:34:06','2021-07-16 18:34:06','<i class=\"fas fa-check-double\"></i>',7);
/*!40000 ALTER TABLE `cms_site_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_tracers`
--

DROP TABLE IF EXISTS `cms_tracers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_tracers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `ip` varchar(100) NOT NULL,
  `agent` text DEFAULT NULL,
  `object` varchar(45) DEFAULT '',
  `action` varchar(45) DEFAULT '',
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `objectid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_tracers`
--

LOCK TABLES `cms_tracers` WRITE;
/*!40000 ALTER TABLE `cms_tracers` DISABLE KEYS */;
INSERT INTO `cms_tracers` VALUES (1,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa Thư tình chết người','2021-07-21 03:18:53','2021-07-21 03:18:53',17391),(2,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm Phim đề cử','2021-07-21 12:24:02','2021-07-21 12:24:02',17392),(3,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa Phim đề cử','2021-07-21 12:24:14','2021-07-21 12:24:14',17392),(4,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm Phim lẻ','2021-07-21 12:24:41','2021-07-21 12:24:41',17393),(5,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm Phim bộ','2021-07-21 12:24:55','2021-07-21 12:24:55',17394),(6,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa Phim bộ','2021-07-21 12:24:58','2021-07-21 12:24:58',17394),(7,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm Phim top imdb','2021-07-21 12:25:18','2021-07-21 12:25:18',17395),(8,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm Phim chiếu rạp','2021-07-21 12:37:25','2021-07-21 12:37:25',17396),(9,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa Phim chiếu rạp','2021-07-21 12:37:29','2021-07-21 12:37:29',17396),(10,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm Phim hoạt hình','2021-07-21 13:10:40','2021-07-21 13:10:40',17397),(11,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm ádasdasd','2021-07-27 02:28:00','2021-07-27 02:28:00',17398),(12,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa ádasdasd','2021-07-27 02:29:03','2021-07-27 02:29:03',17398),(13,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa ádasdasd','2021-07-27 02:29:22','2021-07-27 02:29:22',17398),(14,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa ádasdasd','2021-07-27 02:30:34','2021-07-27 02:30:34',17398),(15,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa ádasdasd','2021-07-27 02:31:09','2021-07-27 02:31:09',17398),(16,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','edit','Sửa ádasdasd','2021-07-27 02:37:37','2021-07-27 02:37:37',17398),(17,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','category','add','Thêm mới kaka','2021-07-28 17:27:32','2021-07-28 17:27:32',94),(18,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36','post','add','Thêm test','2021-07-28 17:33:35','2021-07-28 17:33:35',20);
/*!40000 ALTER TABLE `cms_tracers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_types`
--

DROP TABLE IF EXISTS `cms_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_types` (
  `id` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(45) DEFAULT 'post',
  `isblock` tinyint(1) DEFAULT 0,
  `allowindex` tinyint(1) DEFAULT 0,
  `allowfollow` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `cateitemtype` varchar(45) DEFAULT NULL,
  `hassitemap` tinyint(1) DEFAULT 0,
  `roottext` varchar(45) DEFAULT '',
  `exttext` varchar(45) DEFAULT '',
  `allowsearch` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_types`
--

LOCK TABLES `cms_types` WRITE;
/*!40000 ALTER TABLE `cms_types` DISABLE KEYS */;
INSERT INTO `cms_types` VALUES ('category-blog','Danh mục','Danh mục bài viết','category',0,1,1,'2021-07-07 10:05:11','2021-07-08 15:19:48','hierarchy',1,'','',1),('category-dd','Đạo diễn','Đạo diễn phim','category',0,0,0,'2021-07-08 04:59:56','2021-07-09 04:20:17','multiple',0,'','',0),('category-dv','Diễn viên','Diễn viên phim','category',0,0,0,'2021-07-08 05:00:19','2021-07-09 04:20:25','multiple',0,'','',0),('category-qg','Quốc gia','Quốc gia','category',0,0,0,'2021-07-06 19:37:54','2021-07-28 17:14:14','multiple',0,'','',1),('category-tl','Thể loại','Thể loại','category',0,1,1,'2021-07-06 19:36:54','2021-07-28 17:18:49','multiple',1,'','',1),('post-blog','Bài viết','Bài viết','post',0,1,1,'2021-07-07 10:04:34','2021-07-07 10:04:34',NULL,1,'','',0),('post-film','Phim','Phim','post',0,1,1,'2021-07-06 19:34:44','2021-07-07 03:06:25',NULL,1,'','',0),('post-page','Trang','Trang','post',0,0,0,'2021-07-06 19:31:29','2021-07-08 15:12:44',NULL,0,'','',0),('Serial','Serial','Serial cho phim','category',0,1,1,'2021-07-16 18:34:59','2021-07-16 18:54:51','single',0,'','',0),('tags','Tags','Từ khóa','category',0,0,0,'2021-07-06 20:04:58','2021-07-09 04:21:29','multiple',0,'','',0);
/*!40000 ALTER TABLE `cms_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_user_roles`
--

DROP TABLE IF EXISTS `cms_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_user_roles`
--

LOCK TABLES `cms_user_roles` WRITE;
/*!40000 ALTER TABLE `cms_user_roles` DISABLE KEYS */;
INSERT INTO `cms_user_roles` VALUES ('2020-12-25 20:35:41','2020-12-25 20:35:41',1,1),('2021-01-12 02:16:40','2021-01-12 02:16:40',1,7),('2021-01-12 02:16:40','2021-01-12 02:16:40',1,1498),('2021-01-04 22:05:05','2021-01-04 22:05:05',4,2),('2021-01-04 22:34:22','2021-01-04 22:34:22',4,3),('2021-01-04 22:34:36','2021-01-04 22:34:36',4,4),('2021-01-04 22:35:01','2021-01-04 22:35:01',4,5),('2021-01-04 22:42:41','2021-01-04 22:42:41',4,6);
/*!40000 ALTER TABLE `cms_user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_users`
--

DROP TABLE IF EXISTS `cms_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `isblock` tinyint(1) DEFAULT 0,
  `isactive` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleid` int(11) DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `activecode` text DEFAULT NULL,
  `nickname` varchar(255) DEFAULT '',
  `recoveredcode` varchar(45) DEFAULT '',
  `gender` varchar(20) DEFAULT '',
  `bdd` varchar(2) DEFAULT '',
  `bdm` varchar(2) DEFAULT '',
  `bdy` varchar(4) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cms_users_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_users`
--

LOCK TABLES `cms_users` WRITE;
/*!40000 ALTER TABLE `cms_users` DISABLE KEYS */;
INSERT INTO `cms_users` VALUES (1,'admin','$2a$08$vMVJM1NLuvRIyhIHG0EjAewCVCxFir/tY6iSnEvU2CMusQ1rhA.nW','truyennv888@gmail.com','0868959751',NULL,0,1,'2021-03-08 11:05:12','2021-07-07 03:39:11',1,1,'','Nguyễn Truyển','','','','','');
/*!40000 ALTER TABLE `cms_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_useruis`
--

DROP TABLE IF EXISTS `cms_useruis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_useruis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) NOT NULL,
  `screenid` varchar(45) NOT NULL,
  `jsontext` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_useruis`
--

LOCK TABLES `cms_useruis` WRITE;
/*!40000 ALTER TABLE `cms_useruis` DISABLE KEYS */;
INSERT INTO `cms_useruis` VALUES (1,'1','PostEditScreen','[{\"id\":\"ls-sortable\",\"item\":\"accordionMainPost\",\"position\":0,\"state\":true},{\"id\":\"ls-sortable\",\"item\":\"accordionPhim\",\"position\":1,\"state\":false},{\"id\":\"ls-sortable\",\"item\":\"accordionSeoPost\",\"position\":2,\"state\":false},{\"id\":\"ls-sortable\",\"item\":\"accordionTracer\",\"position\":3,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionPostPublished\",\"position\":4,\"state\":true},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-qg\",\"position\":5,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-tl\",\"position\":6,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-dd\",\"position\":7,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-dv\",\"position\":8,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionSerial\",\"position\":9,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordiontags\",\"position\":10,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionPostThumbnail\",\"position\":11,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionPostIcon\",\"position\":12,\"state\":false}]','2021-07-09 05:22:46','2021-07-27 02:38:16'),(2,'1','PostAddScreen','[{\"id\":\"ls-sortable\",\"item\":\"accordionMainPost\",\"position\":0,\"state\":true},{\"id\":\"ls-sortable\",\"item\":\"accordionPhim\",\"position\":1,\"state\":true},{\"id\":\"ls-sortable\",\"item\":\"accordionSeoPost\",\"position\":2,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionPostPublished\",\"position\":3,\"state\":true},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-tl\",\"position\":4,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-qg\",\"position\":5,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-dv\",\"position\":6,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordioncategory-dd\",\"position\":7,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionSerial\",\"position\":8,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordiontags\",\"position\":9,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionPostThumbnail\",\"position\":10,\"state\":false},{\"id\":\"rs-sortable\",\"item\":\"accordionPostIcon\",\"position\":11,\"state\":false}]','2021-07-16 18:44:57','2021-07-28 17:30:41'),(3,'1','PageAddScreen','[{\"id\":\"ls-sortable\",\"item\":\"accordionMainPost\",\"position\":0,\"state\":true},{\"id\":\"ls-sortable\",\"item\":\"accordionSeoPost\",\"position\":1,\"state\":true},{\"id\":\"rs-sortable\",\"item\":\"accordionPostPublished\",\"position\":2,\"state\":true},{\"id\":\"rs-sortable\",\"item\":\"accordionPageTemplate\",\"position\":3,\"state\":true},{\"id\":\"rs-sortable\",\"item\":\"accordionPostThumbnail\",\"position\":4,\"state\":true}]','2021-07-21 12:25:12','2021-07-21 12:25:12');
/*!40000 ALTER TABLE `cms_useruis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-29  0:36:26
