const container = document.querySelector('.container');
const modalLogin = document.querySelector('.modalLogin')
const modelSection = document.querySelector('.model');
const neckSection = document.querySelector('.neck');
const materialSection = document.querySelector('.material');
const lastOrderList = document.querySelector('.lastOrderList');
const confirmOrderBtn = document.querySelector('.confirmOrder');
const axiosUrl = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts/';
const loginButton = document.querySelector('.loginButton');
const loginInput = document.querySelector('.loginInput')

const order = {
    model: '',
    neck: '',
    material: '',
    image: '',
    owner: '',
    author: '',
}

const getLastOrders = () => {
    axios
        .get(axiosUrl)
        .then(response => {
            modalLogin.classList.add('hidden');
            container.classList.remove('hidden');
            showLastOrders(response.data);
        })
        .catch(response => alert("Erro ao carregar os ultimos pedidos"))
}

const showLastOrders = (lastOrders) => {
    lastOrderList.innerHTML = '';
    for (let i = 0; i < lastOrders.length; i++) {
        const id = lastOrders[i].id;
        const image = lastOrders[i].image;
        const material = lastOrders[i].material;
        const model = lastOrders[i].model;
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
    if (order.model && order.neck && order.material && order.image) {
        confirmOrderBtn.removeAttribute('disabled')
        confirmOrderBtn.classList.remove('disabled')
        confirmOrderBtn.classList.add('enabled')
        return
    }

    if (!order.model || !order.neck || !order.material || !order.image) {
        confirmOrderBtn.setAttribute('disabled', '')
        confirmOrderBtn.classList.remove('enabled')
        confirmOrderBtn.classList.add('disabled')
        return
    }
}

const inputValidator = input => {

    const inputClasslist = input.classList;
    const inputValue = input.value;

    if (inputClasslist.contains('insertLink')) {

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

    if (inputClasslist.contains('loginInput')) {
        if (inputValue) {
            order.author = inputValue;
            order.owner = inputValue;
            loginButton.removeAttribute('Disabled');
            loginButton.classList.add('enabledLoginButton');
            loginButton.classList.remove('disabled');
        } else {
            order.author = '';
            order.owner = '';
            loginButton.setAttribute('Disabled', '');
            loginButton.classList.remove('enabledLoginButton');
            loginButton.classList.add('disabled');
        }
    }
}
const loginIn = () => {
    modalLogin.innerHTML = '<img class="loading" src="./assets/img/loagindRight.svg" alt="">'
    getLastOrders();
}

const confirmOrder = () => {
    const selectedModel = modelSection.querySelector('.selected');
    const selectedNeck = neckSection.querySelector('.selected');
    const selectedMaterial = materialSection.querySelector('.selected');
    const insertLink = document.querySelector('.insertLink')
    axios
        .post(axiosUrl, order)
        .then(response => {
            getLastOrders();
            
            alert('Encomenda realizada');

            if (insertLink.value !== '') {
                insertLink.value = ''
            }

            if (selectedModel) {
                selectedModel.classList.remove('selected');
            }
            if (selectedNeck) {
                selectedNeck.classList.remove('selected');
            }

            if (selectedMaterial) {
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
    order.owner = owner;

    if (confirm('Deseja realizar este pedido?')) {
        confirmOrder();

    } else {
        order.model = '';
        order.neck = '';
        order.material = '';
        order.image = '';
        order.owner = '';
    }
}


loginInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        loginIn();
    }
})