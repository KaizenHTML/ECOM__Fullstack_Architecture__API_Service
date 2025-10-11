<!DOCTYPE html>
<html lang="es"> 

<head> 

    <title> ¿Quiénes Somos? | Market Mallorca </title>
    
    <meta charset="UTF-8"> 

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--Descripción página-->
    <meta name="description" content="Descubre el corazón de Market Mallorca en Ibagué: nuestra misión de calidad, la visión de servirte mejor y el equipo comprometido con la comunidad. ¡Conoce a las personas detrás de tus compras!"> 


    <!--CSS-->
    <link rel="icon" href="../Images/IconLime.webp">

    <link rel="stylesheet" href="../Fonts/Fonts.css"> 

    <link rel="stylesheet" href="Members.css"> 

    <link rel="stylesheet" href="../Header/Header.css"> 

    <link rel="stylesheet" href="../FooterPage/FooterPage.css"> 


    <!--URL Canónica-->
    <link rel="canonical" href="https://marketmallorca.com/Members/Members.php"> 


    <!--Contenido ULRs-->
    <meta property="og:title" content="¿Quiénes Somos? | Market Mallorca">  

    <meta property="og:url" content="https://marketmallorca.com/Members/Members.php"> 

    <meta property="og:type" content="website"> 

</head>


<body> 

    <!--Barra de navegación-->
    <?php include '../Header/Header.php'; ?>
    

    <!--Encapsulado página-->
    <main class="Encapsulated-Page">

        <!--Sección de miembros-->
        <section> 
            
            <h2 class="Title-Members"> Miembros </h2>
    
            <div class="Section-Cards-Members"> 

                <!--Cartas-->
                <article class="Cards">

                    <img src="../Images/Propietarios.webp" class="Member-Photos" alt="Foto de los Propietarios del Market Mallorca">

                    <h3 class="Member-Position"> Propietarios </h3>

                    <h4> Sthepania Ariza y Juan Pablo </h4>

                    <p> Ambos lideran el market, asegurándose de que cada área funcione correctamente. Juntos, toman decisiones estratégicas y supervisan la calidad del servicio, garantizando una experiencia óptima para los clientes.                   
                    </p>

                </article>


                <article class="Cards">

                    <img src="../Images/Ana.webp" class="Member-Photos" alt="Foto de la Administradora Ana Caleño">

                    <h3 class="Member-Position"> Administradora </h3>

                    <h4> Ana Caleño </h4>

                    <p> Se encarga de coordinar y gestionar las operaciones del market. Supervisa al equipo, administra inventarios y compras, y se asegura de que todo funcione eficientemente para ofrecer un servicio de calidad a los clientes.                      
                    </p>

                </article>


                <article class="Cards">

                    <img src="../Images/Gloria.webp" class="Member-Photos" alt="Foto de la coordinadora Gloria Loaiza">

                    <h3 class="Member-Position"> Coordinadora </h3>

                    <h4> Gloria Loaiza </h4>

                    <p> Es la figura que garantiza la eficiencia de todas las operaciones diarias, desde la gestión de pedidos hasta la coordinación de entregas y la optimización de la experiencia del cliente. Su rol es clave para mantener la promesa de calidad y servicio que define a Market Mallorca. 
                    </p>

                </article>


                <article class="Cards">

                    <img src="../Images/Equipo.webp" class="Member-Photos" alt="Foto del Equipo de Trabajo: Cajeros y Domiciliarios.">

                    <h3 class="Member-Position"> Cajeros y domiciliarios </h3>

                    <h4> Equipo de Trabajo </h4>

                    <p> Son el rostro amable en la línea de pago brindando una atención al cliente más directa, encargados de procesar las transacciones de manera eficiente.
                    </p> 
                    
                    <p> Son el puente que conecta nuestro market con la comodidad de tu hogar. </p>

                </article>

            </div>

        </section>
            
        
        <!--Sección propósito-->
        <section> 
            
            <h2 class="Title-Purpose-Supermarket"> Razón de ser </h2>

            <div class="Section-Card-Purpose">
             
                <article class="Cards"> 

                    <h3 class="Title-Cards-Purpose"> Misión </h3>

                    <p> Ofrecer productos de calidad y atención cercana a nuestros clientes, garantizando una experiencia de compra ágil, accesible y confiable. Trabajamos día a día para ser el punto de referencia en la comunidad, brindando variedad, buenos precios y un servicio amable que haga sentir a cada cliente como en casa. 
                    </p>

                </article>


                <article class="Cards"> 

                    <h3 class="Title-Cards-Purpose"> Visión </h3>

                    <p> Ser el minimarket preferido en la zona, reconocido por nuestra calidad, compromiso y cercanía con las personas. Nos proyectamos como un negocio en constante crecimiento, adaptándonos a las necesidades de nuestros clientes y expandiendo nuestra oferta para seguir siendo su mejor opción en las compras del día a día. 
                    </p>

                </article>

            </div>

        </section>

    </main> 


    <!--Pie de página-->
    <?php include '../Footer_Page/FooterPage.php' ?>


    <!--Scripts-->
    <script src="../Scripts/Tween-Members.js" defer></script>

    <!--Enlace Gsap-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" ></script> 

    <!--Enlace SplitText-->
    <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js" ></Script>

    <!--Enlace ScrollTrigger-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script> 

</body>

</html> 