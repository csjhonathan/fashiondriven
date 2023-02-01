const modelSection = document.querySelector('.model');
const neckSection = document.querySelector('.neck');
const materialSection = document.querySelector('.material');
// const sayYourNameModal = document.querySelector('.sayYourName');
// const sayYourNameModalBtn = document.querySelector('.sayYourName button');
// const sayYourNameModalInput = document.querySelector('.sayYourName input');



const order = {
    model: '',
    neck: '',
    material: '',
    image: '',
    owner: '',
    author: '',
}

// const sayYourName = () => {

//     if(!sayYourNameModal.classList.contains('hidden')){
//         sayYourNameModal.classList.add('hidden')
//     } else {
//         sayYourNameModal.classList.remove('hidden')
//     }
    
    
//     if(sayYourNameModalInput.value !== ''){
//         order.owner = sayYourNameModalInput.value;
//         order.author = sayYourNameModalInput.value;
//     }
// }
// sayYourName();

const selectModel = (elemento, modelo) => {
    const selected = modelSection.querySelector('.selected');

    if (selected) {
        selected.classList.remove('selected')
    }
    elemento.classList.add('selected')
    order.model = modelo;
}

const selectNeck = (elemento, gola) => {
    const selected = neckSection.querySelector('.selected');

    if (selected) {
        selected.classList.remove('selected')
    }
    elemento.classList.add('selected')
    order.neck = gola;
}

const selectMaterial = (elemento, tecido) => {
    const selected = materialSection.querySelector('.selected');

    if (selected) {
        selected.classList.remove('selected')
    }
    elemento.classList.add('selected')
    order.material = tecido;
}

// sayYourNameModalBtn.addEventListener('click', e => {
    
//     if(sayYourNameModalInput.value === ''){
//         alert('preencha este campo')
//         return
//     }
//     sayYourName();
// })