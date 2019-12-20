/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-12-20 19:01:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for products-images
-- ----------------------------
DROP TABLE IF EXISTS `products-images`;
CREATE TABLE `products-images` (
  `ID` int(200) NOT NULL AUTO_INCREMENT,
  `imgName` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `imgDetails` varchar(255) NOT NULL,
  `imgSrc` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products-images
-- ----------------------------
INSERT INTO `products-images` VALUES ('1', '奶茶1 ', 'tea ', '10 ', '香醇可口，美妙至极！ ', '6b698eb050780a24f07ee1614db79c79.jpg');
INSERT INTO `products-images` VALUES ('2', '奶茶2 ', 'tea ', '10 ', '香醇可口，美妙至极！ ', 'ce1baa90e4b8de4d8b5f39cc31b1b646.jpg');
INSERT INTO `products-images` VALUES ('3', '奶茶3 ', 'tea ', '12 ', '香醇可口，美妙至极！ ', '9cbfe7b5f43a232cbe5b3af15339448d.jpg');
INSERT INTO `products-images` VALUES ('4', '奶茶4 ', 'tea ', '14 ', '香醇可口，美妙至极！ ', '7f3759d768292f5b4e1059f40ab6b120.jpg');
INSERT INTO `products-images` VALUES ('5', '奶茶5 ', 'tea ', '11 ', '香醇可口，美妙至极！ ', 'b8a54a68785c61df3a6dc1f588f1adc6.jpg');
INSERT INTO `products-images` VALUES ('6', '奶茶6 ', 'tea ', '04 ', '香醇可口，美妙至极！ ', '73faf1903428d77c713f05110aa95ffa.jpg');
INSERT INTO `products-images` VALUES ('7', '蛋糕1 ', 'cake ', '11 ', '香甜可口，宇宙无敌小甜甜！ ', 'a34cab5cc38102741662c37325141110.jpg');
INSERT INTO `products-images` VALUES ('8', '蛋糕2 ', 'cake ', '10 ', '香甜可口，宇宙无敌小甜甜！ ', 'c8be14a1ec9d4859fed5f3886ec81b6d.jpg');
INSERT INTO `products-images` VALUES ('9', '蛋糕3 ', 'cake ', '15 ', '香甜可口，宇宙无敌小甜甜！ ', '303d24462aa8e65408980f4737352a7d.jpg');
INSERT INTO `products-images` VALUES ('10', '蛋糕4 ', 'cake ', '22 ', '香甜可口，宇宙无敌小甜甜！ ', '176cddeb20d91433f1e1ca73b63facc8.jpg');
INSERT INTO `products-images` VALUES ('11', '套餐一 ', 'mix ', '33 ', '优惠满满，满足一切欲望！ ', '0cd71d6ef7ef5d5632e3aa9f624174ab.jpg');
INSERT INTO `products-images` VALUES ('12', '套餐二 ', 'mix ', '25 ', '优惠满满，满足一切欲望！ ', 'c60fa10ae97830549820ecc9013173fc.jpg');
INSERT INTO `products-images` VALUES ('13', '套餐三 ', 'mix ', '44 ', '优惠满满，满足一切欲望！ ', '8b506e5edef9d6a08fa36684dac6bc55.jpg');
INSERT INTO `products-images` VALUES ('14', '套餐四 ', 'mix ', '28 ', '优惠满满，满足一切欲望！ ', 'd65c0851c72296ae6e447046c08d38bd.jpg');
INSERT INTO `products-images` VALUES ('15', '套餐五 ', 'mix ', '30 ', '优惠满满，满足一切欲望！ ', '4379409cf86d42c7b8028a196256961c.jpg');
INSERT INTO `products-images` VALUES ('16', '套餐六 ', 'mix ', '22 ', '优惠满满，满足一切欲望！ ', 'acb2fc8b18fcf40e6962ba5d1371216f.jpg');
INSERT INTO `products-images` VALUES ('21', '套餐七 ', 'mix ', '48 ', '优惠满满，满足一切欲望！ ', '21e4012ea1e4902c7202843c9e508875.jpg');
INSERT INTO `products-images` VALUES ('22', '套餐八 ', 'mix ', '99 ', '优惠满满，满足一切欲望！ ', 'b6a433f940882b576116338ba85caf71.jpg');

-- ----------------------------
-- Table structure for shopusers
-- ----------------------------
DROP TABLE IF EXISTS `shopusers`;
CREATE TABLE `shopusers` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopusers
-- ----------------------------
INSERT INTO `shopusers` VALUES ('4', 'www', '123456');
INSERT INTO `shopusers` VALUES ('5', 'wxb', '123');
