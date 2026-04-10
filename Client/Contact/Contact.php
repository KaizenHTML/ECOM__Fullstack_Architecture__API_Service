<!--Base URL-->
<?php 
    require_once dirname(__DIR__) . '/config.php';
?>


<!DOCTYPE html>
<html lang="es"> 

<head> 

    <meta charset="UTF-8">

    <title> Contáctanos | Market Mallorca </title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

    <!--Description Page-->
    <meta name="description" content="Contacta a Market Mallorca en Ibagué para consultas, pedidos o soporte. Encuentra nuestra dirección, teléfonos y correo electrónico. ¡Estamos listos para ayudarte!">

    
    <!--CSS-->
    <link rel="icon" href="<?= BASE_URL ?>Assets/Images/IconLime.webp">

    <link rel="stylesheet" href="<?= BASE_URL ?>Assets/Fonts/Fonts.css"> 

    <link rel="stylesheet" href="Contact.css"> 

    <link rel="stylesheet" href="<?= BASE_URL ?>Header/Header.css"> 

    <link rel="stylesheet" href="<?= BASE_URL ?>FooterPage/FooterPage.css"> 


    <!--URL Canonica-->
    <link rel="canonical" href="https://www.marketmallorca.com/Contact/Contact.php"> 
    
    
    <!--Content URLs-->
    <meta property="og:title" content="Contáctanos | Market Mallorca">

    <meta property="og:description" content="¿Tienes preguntas, sugerencias o necesitas ayuda? Contáctanos en Market Mallorca."> 

    <meta property="og:url" content="https://www.marketmallorca.com/Contact/Contact.php"> 

    <meta property="og:type" content="website">

</head>


<body> 

    <!--Header-->
    <?php 
        require_once BASE_PATH . '/Header/Header.php'; 
    ?>


    <!--Encapsulated Page-->
    <main class="Encapsulated-page">

        <!--Google Maps-->
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2415132473484d-74.0620023!2d-74.0645673!3e0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a72b5c00e69%3A0xe5a3c9a2f6430b8!2sCalle%2098%20%234b-80%20Sur%2C%20Ibagu%C3%A9%2C%20Tolima!5e0!3m2!1sen!2sco!4e0" class="Maps" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicación de Market Mallorca en Google Maps">
        </iframe>


        <!--Encapsulated Small-->
        <section class="Encapsulated-Small">

            <!--Section Contacts-->
            <section class="Section-Contacts">

                <h2> Contactos </h2>

                <ul>                  
                    <li class="Mail"> <strong> Correo: </strong> <a href="mailto:cardonaarizasas@gmail.com" aria-label="Enviar correo a cardonaarizasas@gmail.com" class="Methods-Contacts"> cardonaarizasas@gmail.com </a> </li> 

                    <li class="Number"> <strong> Numero principal: </strong> <a href="tel:+573001010014" class="Methods-Contacts"> 3001010014 </a> </li>

                    <li class="Number"> <strong> Numero de respaldo: </strong> <a href="tel:+57300411147" class="Methods-Contacts"> 300411147 </a> </li>

                    <li class="Addres"> <strong> Dirección: </strong> CALLE 98 #4 B - 80 SUR CONJ MALLORCA LOCAL 1 </li>
                </ul>

            </section>


            <!--Section Hours-->
            <section class="Section-Hours">

                <h2 class="Title-Hours"> Horario de atención </h2>

                <div class="Encapsulated-Hours">
                    <p class="Hours"> <strong> Lunes a Sabado: </strong> 07:00 a 22:00 </p>

                    <p class="Hours"> <strong> Domingo y Festivos: </strong> 08:00 a 21:00 </p>
                </div>

            </section>

        </section>

    </main> 


    <!--Footer-->
    <?php 
        require_once BASE_PATH . '/FooterPage/FooterPage.php'; 
    ?>


    <!--Enlace Gsap-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script> 

    <!--Enlace SplitText-->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script> 

    <!--Enlace Tween Header-->
    <script src="<?= BASE_URL ?>/Scripts/Tween-Header.js" defer></script> 

</body>

</html> 