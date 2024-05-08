-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: spantaneous
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin','admin','admin','admin@gmail.com','09123456789');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `date_appointed` timestamp NOT NULL,
  `customer_id` int NOT NULL,
  `service_booked` int NOT NULL,
  `message` longtext,
  `request_status` int NOT NULL DEFAULT '0',
  `appointment_status` tinyint NOT NULL DEFAULT '0',
  `payment_status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`appointment_id`),
  KEY `customer_idFK_idx` (`customer_id`),
  KEY `service_idFK_idx` (`service_booked`),
  CONSTRAINT `customer_idFK` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `service_idFK` FOREIGN KEY (`service_booked`) REFERENCES `services` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (11,'2024-05-30 02:56:00',78,1,'please be gentle',1,0,1);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assigned_employee`
--

DROP TABLE IF EXISTS `assigned_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigned_employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `service_category` varchar(45) NOT NULL,
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `appfk_idx` (`appointment_id`),
  KEY `empfk_idx` (`employee_id`),
  CONSTRAINT `appfk` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`),
  CONSTRAINT `empfk` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigned_employee`
--

LOCK TABLES `assigned_employee` WRITE;
/*!40000 ALTER TABLE `assigned_employee` DISABLE KEYS */;
INSERT INTO `assigned_employee` VALUES (49,11,2,'Massage',0);
/*!40000 ALTER TABLE `assigned_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `time_from` timestamp NOT NULL,
  `time_to` timestamp NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'try','password','try','try','2008-10-23 05:33:56','2008-10-23 05:33:56','try@gmail.com','09465845'),(2,'artoro','password','James','Arthur','2008-10-23 05:33:56','2008-10-23 05:33:56','artoro@gmail.com','09384384384');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(45) NOT NULL,
  `description` longtext NOT NULL,
  `price` double(10,2) NOT NULL,
  `category` varchar(45) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Swedish Massage','Enjoy a relaxing Swedish massage to relieve stress and tension in your muscles.',900.00,'Massage','swedish.png','uploads\\image-1713880829292.png'),(14,'Deep Tissue Massage','Experience the therapeutic benefits of a deep tissue massage, targeting deeper layers of muscles and connective tissue.',1000.00,'Massage','deep.jpg','uploads\\image-1713879913006.jpg'),(15,'Hot Stone Massage','Indulge in the soothing warmth of hot stones combined with massage techniques to relax muscles and improve circulation.',1500.00,'Massage','hotstone.jpg','uploads\\image-1713879927999.jpg'),(16,'Classic Facial','Revitalize your skin with our classic facial, including cleansing, exfoliation, and hydration to leave your skin feeling refreshed.',950.00,'Facial','classic.jpg','uploads\\image-1713879947084.jpg'),(17,'Anti-Aging Facial','Combat the signs of aging with our anti-aging facial, featuring specialized treatments to reduce wrinkles and improve skin elasticity.',1200.00,'Facial','anti.jpg','uploads\\image-1713879954655.jpg'),(18,'Hydrating Facial','Restore moisture to dry skin with our hydrating facial, designed to nourish and replenish your skin for a healthy glow.',1300.00,'Facial','hydra.jpg','uploads\\image-1713879965961.jpg'),(19,'Manicure','Treat your hands to a manicure, including nail shaping, cuticle care, and polish application for beautifully groomed nails.',450.00,'Nail Treatment','mani.jpg','uploads\\image-1713879979348.jpg'),(20,'Pedicure','Pamper your feet with a pedicure, featuring nail trimming, callus removal, and a relaxing foot massage to rejuvenate tired feet.',300.00,'Nail Treatment','pedi.jpg','uploads\\image-1713879992785.jpg'),(21,'Gel Nail Extension','Get long-lasting color and shine with gel nails, perfect for chip-free manicures and pedicures that last up to two weeks.',675.00,'Nail Treatment','Nail.jpg','uploads\\image-1713879998814.jpg'),(22,'Body Scrub','Exfoliate and renew your skin with a body scrub, removing dead skin cells to reveal smoother, softer skin.',1299.00,'Body Treatment','scrub.jpg','uploads\\image-1713880011059.jpg'),(23,'Body Wrap','Detoxify and hydrate your skin with a body wrap, promoting relaxation and improving skin tone and texture.',1450.00,'Body Treatment','wrap.jpg','uploads\\image-1713880018087.jpg'),(24,'Aromatherapy','Experience the therapeutic benefits of aromatherapy, using essential oils to enhance your massage or body treatment.',999.00,'Body Treatment','aroma.jpg','uploads\\image-1713880044119.jpg');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('EK0WGqlyDyCbkyAojydiRD-oTkjhRpaZ',1715180293,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-05-07T15:31:34.825Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"user_id\":76,\"username\":\"jesss\",\"Fname\":\"Jestoni\",\"Lname\":\"Vargas\",\"contact\":\"09468644454\",\"email\":\"jesss@gmail.com\"}}'),('VCGFxD6iv1JjgRXFtIAe__j8X5ToVOVa',1715212610,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-05-08T23:55:49.690Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"user_id\":78,\"username\":\"alepse\",\"Fname\":\"kenneth\",\"Lname\":\"alepse\",\"contact\":\"09475867463\",\"email\":\"alepse@gmail.com\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (76,'jesss','$2b$10$ZH10sgkBTq.Vck.FdkONdugR7xkbwzXHkMyjnRu2//KRnJVHyL0F6','Jestoni','Vargas','09468644454','jesss@gmail.com'),(77,'yong','$2b$10$0MhwrWDEdTWJ6Tf7tF1bMu7WzMDj7pfg1nAADoqjzfc/BD0y45EAm','Maidon Jeho','Duran','09847563748','yong@gmail.com'),(78,'alepse','$2b$10$7JzANwmXo4iaJwH2ZSQaweyRu6GJYbnlGTjQvKlKalPIa9bt/92He','kenneth','alepse','09475867463','alepse@gmail.com'),(79,'nebrej','$2b$10$tembpULl6.F6LnGPzvc7u.0mg8C.uEgmav3pvSEHLCEqWw6cbMGNe','john nebrej','rempis','09384756321','nebrej@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'spantaneous'
--

--
-- Dumping routines for database 'spantaneous'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-08  8:00:58
