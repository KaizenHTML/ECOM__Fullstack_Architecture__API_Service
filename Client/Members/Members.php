<!--Base URL-->
<?php 
    require_once dirname(__DIR__) . '/config.php'; 
?>

<!DOCTYPE html>
<html lang="es"> 

<head> 

    <meta charset="UTF-8"> 

    <title> ¿Quiénes Somos? | Market Mallorca </title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <!--Page description-->
    <meta name="description" content="Descubre el corazón de Market Mallorca: nuestra misión de calidad, la visión de servirte mejor y el equipo comprometido con la comunidad. ¡Conoce a las personas detrás de tus compras!"> 


    <!--CSS-->
    <link rel="icon" href="<?= BASE_URL ?>Assets/Images/IconLime.webp">

    <link rel="stylesheet" href="<?= BASE_URL ?>Assets/Fonts/Fonts.css"> 

    <link rel="stylesheet" href="Members.css"> 

    <link rel="stylesheet" href="<?= BASE_URL ?>Header/Header.css"> 

    <link rel="stylesheet" href="<?= BASE_URL ?>FooterPage/FooterPage.css"> 


    <!--URL Canónica-->
    <link rel="canonical" href="https://marketmallorca.com/Members/Members.php"> 


    <!--Content URLs-->
    <meta property="og:title" content="¿Quiénes Somos? | Market Mallorca">  

    <meta property="og:description" content="Descubre el corazón de Market Mallorca: nuestra misión de calidad, la visión de servirte mejor y el equipo comprometido con la comunidad. ¡Conoce a las personas detrás de tus compras!"> 

    <meta property="og:url" content="https://marketmallorca.com/Members/Members.php"> 

    <meta property="og:type" content="website"> 

</head>


<body> 

    <!--Header-->
    <?php 
        require_once BASE_PATH . 'Header/Header.php'; 
    ?>
    

    <!--Encapsulated Page-->
    <main class="Encapsulated-Page">
            
        
        <!--Section Purpose-->
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


        <section> 
            
            <h2 class="Title-Members"> Miembros </h2>
    
            <div class="Section-Cards-Members"> 

                <!--Cards Members-->
                <article class="Cards">

                    <img src="<?= BASE_URL ?>Assets/Images/Propietarios.webp" class="Member-Photos" alt="Foto de los Propietarios del Market Mallorca">

                    <h3> Sthepania Ariza y Juan Pablo </h3>

                    <h4 class="Member-Position"> Propietarios </h4>

                    <p> Ambos lideran el market, asegurándose de que cada área funcione correctamente. Juntos, toman decisiones estratégicas y supervisan la calidad del servicio, garantizando una experiencia óptima para los clientes.                   
                    </p>

                </article>


                <article class="Cards">

                    <img src="<?= BASE_URL ?>Assets/Images/Ana.webp" class="Member-Photos" alt="Foto de la Administradora Ana Caleño">

                    <h3> Ana Caleño </h3>

                    <h4 class="Member-Position"> Administradora </h4>

                    <p> Se encarga de coordinar y gestionar las operaciones del market. Supervisa al equipo, administra inventarios y compras, y se asegura de que todo funcione eficientemente para ofrecer un servicio de calidad a los clientes.                      
                    </p>

                </article>


                <article class="Cards">

                    <img src="<?= BASE_URL ?>Assets/Images/Gloria.webp" class="Member-Photos" alt="Foto de la coordinadora Gloria Loaiza">
                    
                    <h3> Gloria Loaiza </h3>
                    
                    <h4 class="Member-Position"> Coordinadora </h4>

                    <p> Es la figura que garantiza la eficiencia de todas las operaciones diarias, la gestión de pedidos y la optimización de la experiencia del cliente. Su rol es clave para mantener la promesa de calidad y servicio que define a Market Mallorca. 
                    </p>

                </article>


                <article class="Cards">

                    <img src="<?= BASE_URL ?>Assets/Images/Equipo.webp" class="Member-Photos" alt="Foto del Equipo de Trabajo: Cajeros y Domiciliarios.">

                    <h3> Equipo de Trabajo </h3>

                    <h4 class="Member-Position"> Cajeros y domiciliarios </h4>

                    <p> Son el rostro amable en la línea de pago brindando una atención al cliente más directa, encargados de procesar las transacciones de manera eficiente. Siendo tambien el puente que conecta nuestro market con la comodidad de tu hogar. 
                    </p> 
                    
                </article>

            </div>

        </section>

    </main> 


    <!--Footer-->
    <?php 
        require_once BASE_PATH . 'FooterPage/FooterPage.php' 
    ?>


    <!--Enlace Gsap-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" ></script> 

    <!--Enlace SplitText-->
    <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js" ></script>

    <!--Enlace ScrollTrigger-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script> 

    <!--Enlace TweenTitles-->
    <script src="<?= BASE_URL ?>Scripts/Tween-Titles.js" defer></script>

    <!--Enlace TweenHeader-->
    <script src="<?= BASE_URL ?>Scripts/Tween-Header.js" defer></script>

</body>

</html> 