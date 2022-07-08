function showSkeletons(quantity, container) {
    // Selecionamos o container
    const TASKS_CONTAINER = document.querySelector(container);
    
    // Criamos um array que terá um lenght igual ao número de
    //skeletons que queremos renderizar
    const SKELETONS = Array.from({ length: quantity});
    
    // Iteramos sobre o array acessando cada elemento
    SKELETONS.forEach(() => {
      // Guardamos o HTML de cada skeleton. Adicionamos uma classe com o seletor do container
      // Isso nos permitirá posteriormente eliminar os skeletons do referido container
      const TEMPLATE = `
      <li class="skeleton-container ${container.replace(".","")}-child">
        <div class="skeleton-card">
          <p class="skeleton-text"></p>
          <p class="skeleton-text"></p>
        </div>
      </li>
    `;
    
      // Inserimos o HTML dentro do container
      TASKS_CONTAINER.innerHTML += TEMPLATE;
    });
}

function removeSkeleton(container) {
    // Selecionamos o container
    const TASKS_CONTAINER = document.querySelector(container);
    
    // Selecionamos todos os skeletons dentro deste container
    const SKELETONS = document.querySelectorAll(`${container}-child`);
    
    // Iteramos sobre a lista de skeletons e removemos cada um deles
    // do referido container
    SKELETONS.forEach((skeleton) => TASKS_CONTAINER.removeChild(skeleton));
}
   