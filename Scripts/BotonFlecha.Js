
// Eventos
document.addEventListener('DOMContentLoaded', () => {

  const BotonFlecha = document.getElementById('BotonFlecha');


  // Eventos
  window.addEventListener('scroll', () => {

    // Cuenta los números de pixeles
    if (window.scrollY > 580){ 

      BotonFlecha.classList.add('MostrarBoton');

    } else {
      BotonFlecha.classList.remove('MostrarBoton');

    }
  });


  // Eventos
  BotonFlecha.addEventListener('click', () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Hará un desplazamiento suave

    });
  });
});