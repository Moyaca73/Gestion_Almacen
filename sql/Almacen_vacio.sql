-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-05-2022 a las 19:02:01
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

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
(1, 'Admin Admin', 'Admin', 'admin', 1, 1, '2022-05-24 18:03:43'),
(11, 'Usuario Usuario', 'Usuario', 'usuario', 3, 1, '2022-05-19 20:57:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `idVenta` int(11) UNSIGNED NOT NULL,
  `id_vendedor` int(11) UNSIGNED NOT NULL,
  `producto_id` int(11) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(25,2) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  ADD KEY `SK` (`producto_id`),
  ADD KEY `SK_vendedor` (`id_vendedor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `grupos_usuarios`
--
ALTER TABLE `grupos_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
