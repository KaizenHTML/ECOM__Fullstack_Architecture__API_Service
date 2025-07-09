<!DOCTYPE html>
<html lang="es-co"> 

<head> <!--Encabezado de Página-->

    <title> ¿Quiénes Somos? | Market Mallorca </title>
    
    <meta charset="UTF-8"> 

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="Members.css"> <!--CSS-->

    <link rel="stylesheet" href="../Header/Header.css"> <!--CSS Encabezado-->

    <link rel="stylesheet" href="../FooterPage/FooterPage.css"> <!--CSS Pie de Pagina-->

    <link rel="stylesheet" href="../Fonts/Fonts.css"> <!--Tipografias-->

    <link rel="icon" href="../Images/Grupo.png"> <!--Icono-->

    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script> <!--Enlace Gsap-->

    <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></Script> <!--Enlace SplitText-->
    
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script> <!--Enlace ScrollTrigger-->

    <link rel="canonical" href="https://marketmallorca/Members/Members.php"> <!--Enlace Canónico-->

    <meta name="description" content="Conoce la misión, visión y el equipo detrás de Market Mallorca. Descubre nuestros valores y compromiso con la comunidad."> <!--Descripción-->

    <meta property="og:title" content="¿Quiénes Somos? | Market Mallorca">  <!--Enlace Titulo-->

    <meta property="og:url" content="https://marketmallorca/Members/Members.php"> <!--Enlace URL-->
    
    <meta property="og:type" content="website"> <!--Enlace Tipo-->

</head>


<body> 

    <!--Barra de Navegación-->
    <?php include '../Header/Header.php'; ?>
    

    <!--Encapsulado Página-->
    <main class="Encapsulated-Page">

        <section> <!--Sección de Miembros-->
            
            <h2 class="Title-Members"> Miembros </h2>
    
            <!--Encasulado Miembros-->
            <div class="Encapsulated-Members"> 

                <article class="Contents-Encapsulated">

                    <img src="../Images/Propietarios.jpeg" class="Photos" alt="Foto de los Propietarios">

                    <span class="Position"> Propietarios </span>

                    <h2> Sthepania Ariza y Juan Pablo </h2>

                    <p> Ambos lideran el market, asegurándose de que cada área funcione correctamente. Juntos, toman decisiones estratégicas y supervisan la calidad del servicio, garantizando una experiencia óptima para los clientes.</p>

                </article>


                <article class="Contents-Encapsulated">

                    <img src="../Images/Ana.jpeg" class="Photos" alt="Foto de la Administradora">

                    <span class="Position"> Administradora </span>

                    <h2> Ana Caleño </h2>

                    <p> Se encarga de coordinar y gestionar las operaciones del market. Supervisa al equipo, administra inventarios y compras, y se asegura de que todo funcione eficientemente para ofrecer un servicio de calidad a los clientes. </p>

                </article>


                <article class="Contents-Encapsulated">

                    <img src="../Images/Gloria.jpeg" class="Photos" alt="Foto de la coordinadora">

                    <span class="Position"> Coordinadora </span>

                    <h2> Gloria Loaiza </h2>

                    <p> Es la figura que garantiza la eficiencia de todas las operaciones diarias, desde la gestión de pedidos hasta la coordinación de entregas y la optimización de la experiencia del cliente. Su rol es clave para mantener la promesa de calidad y servicio que define a Market Mallorca. </p>

                </article>


                <article class="Contents-Encapsulated">

                    <img src="../Images/Equipo.jpeg" class="Photos" alt="Foto del Equipo de Trabajo">

                    <span class="Position"> Cajeros y domiciliarios </span>

                    <h2> Equipo de Trabajo </h2>

                    <p> Son el rostro amable en la línea de pago brindando una atención al cliente más directa, encargados de procesar las transacciones de manera eficiente.</p> 
                    
                    <p> Son el puente que conecta nuestro market con la comodidad de tu hogar. </p>

                </article>

            </div>

        </section>
            
        
        <section> <!--Sección de Propósito-->
            
            <h2 class="Caption-Purpose-Supermarket"> Razón de ser </h2>

            <div class="Encapsulated-Purpose-Supermarket">

                <!--Encapsulado Misión-->
                <article class="Contents-Encapsulated"> 

                    <h2 class="Caption-Contents-Purpose"> Misión </h2>

                    <p> Ofrecer productos de calidad y atención cercana a nuestros clientes, garantizando una experiencia de compra ágil, accesible y confiable. Trabajamos día a día para ser el punto de referencia en la comunidad, brindando variedad, buenos precios y un servicio amable que haga sentir a cada cliente como en casa. </p>

                </article>


                <!--Encapsulado Visión-->
                <article class="Contents-Encapsulated"> 

                    <h2 class="Caption-Contents-Purpose"> Visión </h2>

                    <p> Ser el minimarket preferido en la zona, reconocido por nuestra calidad, compromiso y cercanía con las personas. Nos proyectamos como un negocio en constante crecimiento, adaptándonos a las necesidades de nuestros clientes y expandiendo nuestra oferta para seguir siendo su mejor opción en las compras del día a día. </p>

                </article>

            </div>

        </section>

    </main> 

    <!--Pie de Página Incluida con PHP-->
    <?php include '../FooterPage/FooterPage.php' ?>


    <!--Script-->
    <script src="../Scripts/Tween-Members.js"></script>

</body>

</html> <!--Estructura-->