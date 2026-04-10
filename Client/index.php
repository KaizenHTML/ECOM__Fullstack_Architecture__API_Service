<!--Base URL-->
<?php 
    require_once __DIR__ . '/config.php';
?>


<!DOCTYPE html>
<html lang="es"> 

<head> 

    <meta charset="UTF-8"> 

    <title> Inicio | Market Mallorca </title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    
    <!--Page description-->
    <meta name="description" content="Bienvenido a Market Mallorca. Conoce nuestra misión y visión, descubre nuestro catálogo de productos, realiza pedidos y contáctanos para tus compras en Ibagué."> 


    <!--CSS-->
    <link rel="icon" href="./Assets/Images/IconLime.webp"> 

    <link rel="stylesheet" href="Assets/Fonts/Fonts.css"> 

    <link rel="stylesheet" href="index.css"> 

    <link rel="stylesheet" href="./Header/Header.css"> 

    <link rel="stylesheet" href="./FooterPage/FooterPage.css"> 


    <!--URL canonica-->
    <link rel="canonical" href="https://www.marketmallorca.com/">


    <!--Content URLs-->
    <meta property="og:title" content="Inicio | Market Mallorca"> 

    <meta property="og:description" content="Encuentra los mejores productos y ofertas en Market Mallorca. ¡Tu experiencia de compra ágil y confiable está aquí!"> 

    <meta property="og:url" content="https://www.marketmallorca.com/"> 

    <meta property="og:type" content="website">  

</head>


<body> 

    <!--Header-->
    <?php 
        require_once BASE_PATH . 'Header/Header.php'; 
    ?>


    <main>

        <section>

            <div class="Encapsulated-Banner">

                <div>

                    <h2 class="Title-Banner"> Bienvenido a Market Mallorca </h2>

                    <p> <strong>Tú eres nuestra prioridad</strong>. Por eso, diseñamos esta nueva experiencia para estar más cerca de ti. Descubre quiénes somos, explora nuestros productos y haz tu pedido en minutos. Calidad y cercanía en cada clic.
                    </p>

                    <p> Seleccionamos los mejores productos locales para que disfrutes de la mejor calidad sin salir de casa. 
                    </p>

                    <div class="Encapsulated-Links-Banner">
                        <a class="Link-Banner" href=""> Ver Catálogo </a>

                        <a class="Link-Banner" href="<?= BASE_URL ?>Members/Members.php"> Conócenos </a>
                    </div>

                </div>


                <div >
                    <img src="Assets/Images/Home-Img.webp" alt="Productos frescos Market Mallorca" class="Img-Banner" loading="eager">
                </div>
                
            </div>

        </section>


        <h2 class="Title-Section-Cards"> ¿Por qué comprar con nosotros? </h2>

        <section class="Encapsulated-Cards">

            <div class="Feature-Card">

                
                <div class="Feature-Content">

                    <div>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path><path d="M12 11c-2 0-2-.63-2-1 0-.48.7-1 2-1 1.18 0 1.39.64 1.4 1.02l1-.02h1c0-1.03-.67-2.47-2.4-2.88V6h-2v1.09C9.03 7.42 8 8.72 8 10c0 1.12.52 3 4 3 2 0 2 .68 2 1 0 .42-.62 1-2 1-1.84 0-1.99-.86-2-1H8c0 .92.66 2.55 3 2.92V18h2v-1.09c1.97-.33 3-1.63 3-2.91 0-1.12-.52-3-4-3"></path>
                        </svg>
                    </div>

                    <h3 class="Title-Cards"> Pago contra entrega </h3>
                    <p class="Text-Cards"> Paga al recibir tu pedido en casa. </p>

                </div>

            </div>


            <div class="Feature-Card">

                
                <div class="Feature-Content">

                    <div>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10 10-4.58 10-10S17.42 2 12 2m0 18c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8-3.66 8-8 8"></path><path d="M13 7h-2v6h6v-2h-4z"></path>
                        </svg>
                    </div>

                    <h3 class="Title-Cards"> Velocidad Local </h3>
                    <p class="Text-Cards"> Entregas en menos de 20 minutos. </p>

                </div>

            </div>
            

            <div class="Feature-Card">
                
                <div class="Feature-Content">

                    <div class="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C9.24 2 7 4.24 7 7v1H4c-.55 0-1 .45-1 1v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-.55-.45-1-1-1h-3V7c0-2.76-2.24-5-5-5M9 7c0-1.65 1.35-3 3-3s3 1.35 3 3v1H9zm10 3v10H5V10z"></path>
                        </svg>
                    </div>

                    <h3 class="Title-Cards"> Productos Locales </h3>
                    <p class="Text-Cards"> Garantizando frescura total. </p>

                </div>

            </div>

        </section>


        <div class="Encapsulated-Card-Phrase">


            <p class="Phrase"> El pedido lo haces tú, tus compras las hacemos nosotros <a href="" class="Link-Phrase-Home"> <strong> ¡Explora todo el Market en un solo clic! </strong> </a> 
            </p>

        </div>
        
    </main>


    <!--Footer-->
    <?php 
        require_once BASE_PATH . 'FooterPage/FooterPage.php'; 
    ?>


    <!--Enlace Gsap-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script> 

    <!--Enlace SplitText-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script> 


    <!--Tween Header-->
    <script src="<?= BASE_URL ?>Scripts/Tween-Header.js" defer></script> 

    <!--Enlace ScrollTrigger-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script> 

    <!--Tween Cards -->
    <script src="<?= BASE_URL ?>Scripts/Tween-Cards.js" defer></script>

    <!--Enlace TweenTitles-->
    <script src="<?= BASE_URL ?>Scripts/Tween-Titles.js"></script>

</body>

</html> 

