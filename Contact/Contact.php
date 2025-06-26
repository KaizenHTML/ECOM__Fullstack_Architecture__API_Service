<!DOCTYPE html>
<html lang="es-co"> <!--Idioma-->

<head> <!--Encabezado-->

    <title> Contáctanos </title>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="Contact.css"> <!--CSS Central-->

    <link rel="stylesheet" href="../Header/Header.css"> <!--CSS Encabezado-->

    <link rel="stylesheet" href="../FooterPage/FooterPage.css"> <!--CSS Pie de Pagina-->

    <link rel="stylesheet" href="../Fonts/Fonts.css"> <!--Tipografias-->

    <link rel="icon" href="../Images/Contacto.png"> <!--Icono-->

</head>


<body> 

    <!--Encabezado Incluido con PHP-->
    <?php include '../Header/Header.php'; ?>


    <!--Encapsulado Página-->
    <main class="Encapsulated-page">

        <!--Google Maps-->
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.962158103609!2d-75.1741804!3d4.4181529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c5bbfc179a99%3A0x49e655d010036745!2sMarket%20Mallorca!5e0!3m2!1ses!2sco!4v1746377840999!5m2!1ses!2sco"  loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="Maps">
        </iframe>

        <!--Encapsulado Pequeño-->
        <div class="Encapsulated-Small">

            <!--Encapsulado Contactos-->
            <section class="Encapsulated-Contacts">

                <h3> Contactos </h3>

                <ul> 
                    <li> <strong> Correo: </strong> cardonaarizasas@gmail.com </li>
                    <li> <strong> Numero principal: </strong> 3001010014 </li>
                    <li> <strong> Numero de respaldo: </strong> 300411147 </li>
                    <li> <strong> Dirección: </strong> CALLE 98 #4 B - 80 SUR CONJ MALLORCA LOCAL 1 </li>
                </ul>

            </section>


            <!--Encapsulado Métodos de Pagos-->
            <section class="Encapsulated-Methods">

                <h3> Métodos de Pago </h3>

                <div class="Encapsulated-Logos-Payments">

                    <img src="../Images/bancolombia.png" class="Logos-Payments">

                    <img src="../Images/nequi.png" class="Logos-Payments">

                    <img src="../Images/banco_popular.png" class="Logos-Payments">

                    <img src="../Images/banco_occidente.png" class="Logos-Payments">

                </div>

            </section>

        </div>

    </main> 


    <!--Pie de Página Incluido con PHP-->
    <?php include '../FooterPage/FooterPage.php' ?>

</body>

</html> <!--Estructura-->