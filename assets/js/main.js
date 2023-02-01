const modelSection = document.querySelector('.model');
const neckSection = document.querySelector('.neck');
const materialSection = document.querySelector('.material');
const lastOrderList = document.querySelector('.lastOrderList')
const confirmOrderBtn = document.querySelector('.confirmOrder')
const axiosUrl = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts/'
// const sayYourNameModal = document.querySelector('.sayYourName');
// const sayYourNameModalBtn = document.querySelector('.sayYourName button');
// const sayYourNameModalInput = document.querySelector('.sayYourName input');



const order = {
    model: '',
    neck: '',
    material: '',
    image: '',
    owner: 'Jhon',
    author: 'Jhon',
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

const getLastOrders = () => {
    axios
        .get(axiosUrl)
        .then(response => {
            
            showLastOrders(response.data)
        })
        .catch(response => console.log(response))
}
getLastOrders()
const showLastOrders = (lastOrders) => {
    lastOrderList.innerHTML = '';
    for(let i = 0; i< lastOrders.length; i++){
        const id = lastOrders[i].id;
        const image = lastOrders[i].image;
        const material = lastOrders[i].material;
        const model = lastOrders [i].model;
        const neck = lastOrders[i].neck;
        const owner = lastOrders[i].owner;
        lastOrderList.innerHTML += `
        <li class="lastOrderListItem" onclick="selectShirt(this)" data-id = '${id}' data-material = '${material}' data-model='${model}' data-neck='${neck}' data-owner='${owner}' data-img='${image}'>
            <img src="${image}" alt="" class = 'lastOrderImg' >
            <p class="createdBy"><span class="bold">Criador: </span>${owner}</p>
        </li>
    `
    }
}
const selectModel = (elemento, modelo) => {
    const selected = modelSection.querySelector('.selected');

    if (selected) {
        selected.classList.remove('selected')
    }
    elemento.classList.add('selected')
    order.model = modelo;

    checkOrder()
}

const selectNeck = (elemento, gola) => {
    const selected = neckSection.querySelector('.selected');

    if (selected) {
        selected.classList.remove('selected')
    }
    elemento.classList.add('selected')
    order.neck = gola;

    checkOrder()
}

const selectMaterial = (elemento, tecido) => {
    const selected = materialSection.querySelector('.selected');

    if (selected) {
        selected.classList.remove('selected')
    }
    elemento.classList.add('selected')
    order.material = tecido;

    checkOrder()
}
const checkOrder = () => {
    if(order.model && order.neck && order.material && order.image){
        confirmOrderBtn.removeAttribute('disabled')
        confirmOrderBtn.classList.remove('disabled')
        confirmOrderBtn.classList.add('enabled')
        return
    }

    if(!order.model || !order.neck || !order.material || !order.image){
        confirmOrderBtn.setAttribute('disabled', '')
        confirmOrderBtn.classList.remove('enabled')
        confirmOrderBtn.classList.add('disabled')
        return
    }
}

const inputValidator = input => {
    
    const inputClasslist = input.classList;
    const inputValue = input.value;

    if(inputClasslist.contains('insertLink')){

        if (inputValue.startsWith('https://') 
        || inputValue.startsWith('http://')) {

            if (inputValue.includes('.jpg') 
            || inputValue.includes('.jpeg') 
            || inputValue.includes('.png') 
            || inputValue.includes('.webp')) {

                order.image = input.value;
                checkOrder();
                return true

            } else {

                order.image = '';
                checkOrder();
                return false
            }
        } else {

            order.image = '';
            checkOrder();
            return false
        }
    
    }
}

const confirmOrder = () =>{
    const selectedModel = modelSection.querySelector('.selected');
    const selectedNeck = neckSection.querySelector('.selected');
    const selectedMaterial = materialSection.querySelector('.selected');
    const insertLink = document.querySelector('.insertLink')
    axios
        .post(axiosUrl, order)
        .then(() =>{
            getLastOrders();
            alert('Encomenda realizada');
            
            if(insertLink.value !==''){
                insertLink.value = ''
            }

            if(selectedModel){
                selectedModel.classList.remove('selected');
            }
            if(selectedNeck ){
                selectedNeck.classList.remove('selected');
            }
            
            if(selectedMaterial){
                selectedModel.classList.remove('selected');
            }
            
            confirmOrderBtn.setAttribute('Disabled', '');
            confirmOrderBtn.classList.remove('enabled');
            confirmOrderBtn.classList.add('disabled');

            order.model = '';
            order.neck = '';
            order.material = '';
            order.image = '';
        })
        .catch(response => {
            console.log(response)
            alert('Ops, não conseguimos processar sua encomenda');
        })
}
const selectShirt = shirt => {
    const model = shirt.getAttribute('data-model');
    const neck = shirt.getAttribute('data-neck');
    const material = shirt.getAttribute('data-material');
    const image = shirt.getAttribute('data-img');
    const owner = shirt.getAttribute('data-owner');

    order.model = model;
    order.neck = neck;
    order.material = material;
    order.image = image;
    order.owner = order.author;

    if(confirm('Deseja realizar este pedido?')){
        console.log('sim')
        console.log(order)
        confirmOrder();
        
    }else{
        order.model = '';
        order.neck = '';
        order.material = '';
        order.image = '';
        order.owner = '';
        console.log('não')
        console.log(order)
    }
}
// sayYourNameModalBtn.addEventListener('click', e => {
    
//     if(sayYourNameModalInput.value === ''){
//         alert('preencha este campo')
//         return
//     }
//     sayYourName();
// })