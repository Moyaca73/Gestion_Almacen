-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2022 a las 17:45:56
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `almacen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombre_categoria` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre_categoria`) VALUES
(18, 'asientos'),
(17, 'direcion'),
(13, 'Filtros'),
(12, 'frenos'),
(19, 'llantas'),
(2, 'prueba'),
(1, 'Repuestos'),
(3, 'Ruedas'),
(4, 'truños'),
(10, 'volantes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idCompra` int(11) NOT NULL,
  `producto_id` int(11) UNSIGNED NOT NULL,
  `unidades` int(32) UNSIGNED NOT NULL,
  `precio_compra` float NOT NULL,
  `precio_venta` float NOT NULL,
  `total` float DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`idCompra`, `producto_id`, `unidades`, `precio_compra`, `precio_venta`, `total`, `fecha`) VALUES
(1, 1, 5, 5, 10, 25, '2022-05-02'),
(2, 5, 100, 15, 20, 1500, '2022-05-02'),
(3, 1, 8, 5, 10, 40, '2022-05-02'),
(4, 7, 10, 22, 33, 220, '2022-05-02'),
(5, 7, 8, 22, 33, 176, '2022-05-02'),
(6, 23, 2, 80.32, 130.25, 160.64, '2022-05-02'),
(7, 1, 2, 5, 10, 10, '2022-05-02'),
(8, 1, 5, 5, 10, 25, '2022-05-02'),
(9, 1, 5, 5, 10, 25, '2022-05-02'),
(10, 1, 5, 5, 10, 25, '2022-05-02'),
(11, 1, 6, 5, 10, 30, '2022-05-02'),
(12, 5, 6, 15, 20, 90, '2022-05-02'),
(13, 7, 5, 22, 33, 110, '2022-05-02'),
(14, 7, 2, 22, 33, 44, '2022-05-02'),
(15, 5, 6, 15, 20, 90, '2022-05-02'),
(16, 30, 23, 0.02, 0.04, 0.46, '2022-05-09'),
(17, 32, 10, 44, 66, 440, '2022-05-10'),
(18, 34, 10, 25, 45.5, 250, '2022-05-14'),
(19, 34, 10, 25, 45.5, 250, '2022-05-14'),
(20, 35, 10, 185, 250, 1850, '2022-05-14'),
(21, 34, 1, 25, 45.5, 25, '2022-05-14'),
(22, 35, 1, 185, 250, 185, '2022-05-14'),
(23, 34, 1, 25, 45.5, 25, '2022-05-14'),
(24, 35, 1, 185, 250, 185, '2022-05-14'),
(25, 34, 1, 25, 45.5, 25, '2022-05-14'),
(26, 34, 2, 25, 45.5, 50, '2022-05-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_usuarios`
--

CREATE TABLE `grupos_usuarios` (
  `id` int(11) NOT NULL,
  `nombre_grupo` varchar(150) NOT NULL,
  `rol_grupo` int(11) NOT NULL,
  `status_grupo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupos_usuarios`
--

INSERT INTO `grupos_usuarios` (`id`, `nombre_grupo`, `rol_grupo`, `status_grupo`) VALUES
(1, 'Administrador', 1, 1),
(4, 'Usuario', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) UNSIGNED NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `stock` int(50) NOT NULL,
  `precio_compra` decimal(25,2) NOT NULL,
  `precio_venta` decimal(25,2) NOT NULL,
  `categoria_id` int(11) UNSIGNED NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `creado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `estado`, `nombre`, `stock`, `precio_compra`, `precio_venta`, `categoria_id`, `imagen`, `creado`) VALUES
(1, 0, 'Filtro de gasolina', 31, '5.00', '10.00', 2, NULL, '2017-06-16 07:03:16'),
(5, 0, 'rueda', 115, '15.00', '20.00', 3, NULL, '2022-03-03 15:23:37'),
(7, 0, 'Pastillas', 25, '22.00', '33.00', 12, NULL, '2022-04-27 21:25:13'),
(23, 0, 'llanta', 52, '80.32', '130.25', 3, NULL, '2022-04-29 18:30:59'),
(24, 0, 'Neumatio lluvia', 30, '55.00', '88.00', 3, NULL, '2022-05-04 20:57:03'),
(29, 0, 'bicicleta', 1, '0.01', '0.04', 12, 'bicicleta.jpg', '2022-05-06 17:31:44'),
(30, 0, 'caca', 4, '0.02', '0.04', 12, 'caca.jpg', '2022-05-06 18:06:29'),
(31, 0, 'manillar', 78, '25.00', '60.00', 17, 'manillar.jpg', '2022-05-10 20:51:11'),
(32, 0, 'volante', 8, '44.00', '66.00', 17, 'volante.jpg', '2022-05-10 21:29:52'),
(33, 0, 'filtro gasolina', 8, '55.00', '65.00', 13, 'filtro gasolina.jpg', '2022-05-11 16:31:34'),
(34, 1, 'Funda asientos', 30, '25.00', '45.50', 18, 'Funda asientos.jpg', '2022-05-13 21:30:17'),
(35, 1, 'Llanta aluminio', 22, '185.00', '250.00', 19, 'Llanta aluminio.jpg', '2022-05-14 17:27:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `ultimo_acceso` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `nombre_usuario`, `clave`, `rol`, `status`, `ultimo_acceso`) VALUES
(1, 'Admin Admin', 'Admin', 'admin', 1, 1, '2022-05-17 16:28:12'),
(11, 'Antonio', 'Antonio', 'antonio', 3, 1, '2022-05-13 21:16:35'),
(27, 'Carlos', 'carlos', '1234', 1, 1, NULL),
(30, 'Eufrasio', 'calavera', '1234', 3, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `idVenta` int(11) UNSIGNED NOT NULL,
  `producto_id` int(11) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(25,2) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`idVenta`, `producto_id`, `cantidad`, `precio`, `fecha`) VALUES
(257, 5, 1, '20.00', '2022-04-30 19:23:39'),
(260, 30, 19, '0.04', '2022-05-09 22:59:34'),
(261, 1, 4, '10.00', '2022-05-10 18:41:34'),
(262, 5, 40, '20.00', '2022-05-10 20:58:17'),
(263, 32, 2, '66.00', '2022-05-11 15:47:35'),
(265, 1, 1, '10.00', '2022-05-11 16:55:02'),
(269, 34, 3, '45.50', '2022-05-14 18:47:21'),
(270, 35, 2, '250.00', '2022-05-14 18:47:35'),
(272, 34, 1, '45.50', '2022-05-16 18:23:27'),
(273, 34, 1, '45.50', '2022-05-16 18:54:36'),
(274, 35, 8, '250.00', '2022-05-17 10:30:21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`nombre_categoria`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idCompra`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `grupos_usuarios`
--
ALTER TABLE `grupos_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `group_level` (`rol_grupo`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`nombre`),
  ADD KEY `categorie_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`nombre_usuario`),
  ADD KEY `user_level` (`rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`idVenta`),
  ADD KEY `product_id` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `grupos_usuarios`
--
ALTER TABLE `grupos_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `idVenta` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `FK_products` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_user` FOREIGN KEY (`rol`) REFERENCES `grupos_usuarios` (`rol_grupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `SK` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
