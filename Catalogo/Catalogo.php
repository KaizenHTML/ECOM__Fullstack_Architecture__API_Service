<!DOCTYPE html>
<html lang="es-co"> <!--Idioma-->

<head> <!--Encabezado-->
    
    <title> Market Mallorka </title>

    <meta charset="UTF-8"> <!--Codifición-->
        
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="Catalogo.css"> <!--CSS-->

    <link rel="stylesheet" href="../Header/Header.css"> <!--Css de Encabezado-->

    <link rel="stylesheet" href="../FooterPage/FooterPage.css"> <!--Css Pie de Página-->
        
    <link rel="stylesheet" href="../Fonts/Fonts.css"> <!--Tipografias-->
        
    <link rel="icon" href="../Imagenes/Catalogo.png"> <!--Icono Pagina-->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script> <!--Icono Carrito-->

</head>

    
<body> <!--Cuerpo-->

    <!--Encabezado Incluido con PHP-->
    <?php include '../Header/Header.php'; ?>


    <!--Ventana Modal Datos-->
    <dialog class="Modal" id="ModalDatos">
        <form class="FormularioModalDatos">

            <h2 class="TituloModalDatos"> Dirección </h2>

            <div class="SeparadoresModalDatos"></div>

            <label class="EnunciadoModalDatos"> Ingrese su nombre:
                <input type="text" class="EntradaModalDatos" id="Nombre" required>
            </label>

            <label class="EnunciadoModalDatos"> Ingrese su (Conjunto - TO - Apt):
                <input type="text" class="EntradaModalDatos" id="Direccion" required>
            </label>

            <input type="submit" class="BotonModalDatos" id="BotonDatos">

        </form>
    </dialog>


    <!--Ventana Modal Confirmación-->
    <dialog class="Modal" id="ModalCompra">
        <form class="FormularioModalConfirmacion">

            <h2 class="TituloModalConfirmacion"> !Gracias por tu compra! </h2>

            <div class="SeparadoresModalConfirmacion"></div>

            <p class="TextoModalConfirmacion" id="TextoModalConfirmacion"> </p>

            <input type="submit" class="BotonModalConfirmacion">

        </form>
    </dialog>


    <!--Encapsulado Grande-->
    <div class="EncapsuladoGrande">

        <div class="EncapsuladoMenu">

            <section class="Menu"> <!--Agrupa Contenido-->
                <a class="Opciones" href="#Carnes"> Carnes </a>
                <a class="Opciones" href="#Verduras"> Verduras </a>
                <a class="Opciones" href="#Lonchera"> Lonchera </a>
                <a class="Opciones" href="#Aseo"> Aseo </a>
            </section>

        </div>


        <!--Encapsulado Productos-->
        <div class="EncapsuladoProductos" id="EncapsuladoProductos">

        </div>

    </div>


    <!--Icono Carrito de Compras-->
    <div id="IconoCarritoCompras"></div>


    <!--Icono de Whatssapp-->
    <a href="https://wa.me/573001010014?text=Hola%20tengo%20una%20pregunta"  target="_blank">
        <img src="../Imagenes/IconoWhatsapp.png" title="Contactate con el Matket" class="IconoWhats">
    </a>


    <!--Icono Flecha-->
    <button class="BotonIconoFlecha" id="BotonFlecha">
        <img src="../Imagenes/FlechaArriba.png" class="IconoFlecha">
    </button>


    <!--Pie de Página Incluida con PHP-->
    <?php include '../FooterPage/FooterPage.php' ?>


    <!--JavaScript-->
    <script src="../Funciones/BotonFlecha.Js"></script>

    <script src="../Funciones/IconoCarrito.Js"></script>

    <script src="../Funciones/ProductosJSON.Js"></script>

    <script src="../Funciones/Renderizado.Js"></script>

</body>

</html> <!--Estructura-->