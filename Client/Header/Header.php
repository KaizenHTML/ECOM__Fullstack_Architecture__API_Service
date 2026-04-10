<?php 
    require_once dirname(__DIR__) . '/config.php'; 
?>

<header>

    <nav class="Page-Header"> 

        <!--Icon and title-->
        <div class="Encapsulated-Icon-Title">
            <a href="<?= BASE_URL ?>index.php">
                <img src="<?= BASE_URL ?>Assets/Images/IconLime.webp" alt="Logo del Market Mallorca" title="Home" class="IconLemon">
            </a>

             <h1 class="Title-Header"> MARKET <br> MALLORCA </h1>
        </div>

       
       

        <!--Navigation Bar-->
        <div class="Navigation-Bar"> 

            <li class="Navigation-Bar-List" > 
                <a href="<?= BASE_URL ?>Catalogo/Catalogo.php">
                    <svg class="Svg-Header" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" viewBox="0 0 24 24" ><path d="M19.1 2.8c-.38-.5-.97-.8-1.6-.8h-11c-.63 0-1.22.3-1.6.8L2.2 6.4c-.13.17-.2.38-.2.6v1c0 1.04.41 1.98 1.06 2.69-.03.1-.06.2-.06.31v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-.11-.03-.21-.06-.31C21.59 9.98 22 9.04 22 8V7c0-.22-.07-.43-.2-.6zm.9 4.53V8c0 1.1-.9 2-2 2s-2-.9-2-2V7q0-.12-.03-.24L15.28 4h2.22zM10.78 4h2.44L14 7.12V8c0 1.1-.9 2-2 2s-2-.9-2-2v-.88zM4 7.33 6.5 4h2.22l-.69 2.76Q8 6.88 8 7v1c0 1.1-.9 2-2 2s-2-.9-2-2zM10 20v-4h4v4zm6 0v-4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v4H5v-8.14c.32.08.65.14 1 .14 1.2 0 2.27-.54 3-1.38.73.84 1.8 1.38 3 1.38s2.27-.54 3-1.38c.73.84 1.8 1.38 3 1.38.35 0 .68-.06 1-.14V20z"></path>
                    </svg> 
                    <span class="Navigation-Bar-Text"> Catálogo </span> 
                </a> 
            </li> 

            <li class="Navigation-Bar-List"> 
                <a href="<?= BASE_URL ?>Account/"> 
                    <svg  class="Svg-Header" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path>
                    </svg>  
                    <span class="Navigation-Bar-Text"> Cuenta </span> 
                </a> 
            </li>
                
            <li class="Navigation-Bar-List"> 
                <a href="<?= BASE_URL ?>Members/Members.php">
                    <svg class="Svg-Header" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" viewBox="0 0 24 24" > <path d="M12 7H6v6h6zm-2 4H8V9h2zm3 4H6v2h12v-2zm1-4h4v2h-4zm0-4h4v2h-4z"></path><path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"></path>
                    </svg> 
                    <span class="Navigation-Bar-Text"> Conócenos </span> 
                </a> 
            </li>

            <li class="Navigation-Bar-List">
                <a href="<?= BASE_URL ?>Contact/Contact.php"> 
                    <svg  class="Svg-Header" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" viewBox="0 0 24 24" ><path d="M21.55 8.17 19 6.47V5.01c0-.55-.45-1-1-1h-2.7l-2.75-1.83c-.34-.22-.77-.22-1.11 0L8.69 4.01h-2.7c-.55 0-1 .45-1 1v1.46l-2.55 1.7c-.28.19-.45.5-.45.83v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-.33-.17-.65-.45-.83ZM7 6h10v4.46l-5 3.33-5-3.33zM4 20v-9.13l1.45.96 6 4c.17.11.36.17.55.17s.39-.06.55-.17l6-4 1.45-.96V20z"></path>
                    </svg>  
                    <span class="Navigation-Bar-Text"> Contáctanos </span> 
                </a>  
            </li>

        </div>

    </nav>
    
    
</header> 

