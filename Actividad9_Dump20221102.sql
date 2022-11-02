CREATE DATABASE  IF NOT EXISTS `actividad9` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `actividad9`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: actividad9
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'Mario del Pozo Sierra','mporsierra@hotmail.com','\'https://picsum.photos/200\''),(2,'Mariano Frías García','mfrias@unir.net','imagen2.jpg'),(3,'María de las Mercedes Audi','mvagauto@yahoo.es','\'https://picsum.photos/250\''),(4,'Rafael Gonzaga','autor@gmail.com','imagen.jpg'),(5,'Ruy Adorno','autor@gmail.com','imagen.jpg'),(6,'Vladimir de Turckheim','autor@gmail.com','imagen.jpg'),(7,'Michaël Zasso','autor@gmail.com','imagen.jpg'),(8,'Danielle Adams','autor@gmail.com','imagen.jpg'),(9,'Joe Sepi','autor@gmail.com','imagen.jpg'),(10,'Mario Rodríguez Artalejo','autor@gmail.com','imagen.jpg'),(11,'Teresa Hortalá','autor@gmail.com','imagen.jpg'),(12,'David de Frutos','autor@gmail.com','imagen.jpg'),(13,'Jose Luís Sierra','autor@gmail.com','imagen.jpg'),(14,'Alberto Navarro','autor@gmail.com','imagen.jpg'),(15,'Nombre del autor','autor@gmail.com','http://imagen.jpg'),(16,'Otro autor más','autor@gmail.com','imagen.jpg'),(19,'Remigio Martínez Smith','remi_mar_smith@gmail.com','https://picsum.photos/300');
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_creacion` date NOT NULL DEFAULT (curdate()),
  `categoria` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `autores_id` int NOT NULL,
  PRIMARY KEY (`id`,`autores_id`),
  KEY `fk_posts_autores_idx` (`autores_id`),
  CONSTRAINT `fk_posts_autores` FOREIGN KEY (`autores_id`) REFERENCES `autores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'OpenSSL November Security Release','The Node.js project may be releasing new versions across all of its supported release lines in the first week of November to incorporate upstream patches from OpenSSL. Please read on for full details.','2022-10-31','News',1),(2,'Node v18.12.0 (LTS)','This release marks the transition of Node.js 18.x into Long Term Support (LTS) with the codename \'Hydrogen\'. The 18.x release line now moves into \"Active LTS\" and will remain so until October 2023. After that time, it will move into \"Maintenance\" until end of life in April 2025.','2022-10-25','News',1),(3,'Node v19.0.0 (Current)','Starting with this release, Node.js sets keepAlive to true by default. This means that any outgoing HTTP(s) connection will automatically use HTTP 1.1 Keep-Alive. The default waiting window is 5 seconds. Enable keep-alive will deliver better throughput as connections are reused by default.','2022-10-18','Updates',2),(4,'Node v18.11.0 (Current)','Running in \'watch\' mode using node --watch restarts the process when an imported file is changed.','2022-10-13','News',3),(5,'OpenSSL and zlib update assessment, and Node.js Assessment workflow','The vulnerability in the OpenSSL Security release of Oct 11 2022 does not affect any active Node.js release lines, as well as the zlib vulnerability (CVE-2022-37434) patched on the zlib Security release of Oct 13 2022, does not affect Node.js.','2022-10-24','Updates',1),(6,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(7,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(8,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(11,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(12,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(14,'Título del post','Descripción del post','2022-10-31','Categoría del post',2),(30,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(36,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(37,'Título del post','Descripción del post','2022-10-31','Categoría del post',12),(38,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(39,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(40,'Título del post','Descripción del post','2022-10-31','Categoría del post',3),(41,'Título del post','Descripción del post','2022-10-31','Categoría del post',3),(42,'Título del post','Descripción del post','2022-10-31','Categoría del post',1),(43,'Título del post','Descripción del post','2022-10-31','Categoría del post',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-02 20:33:25
