const envelopeContainer = document.getElementById('envelopeContainer');
const letterContainer = document.getElementById('letterContainer');
const waxSeal = document.querySelector('.wax-seal');
const envelopeFlap = document.querySelector('.envelope-flap');
const confirmButton = document.getElementById('confirmButton');
const formOverlay = document.getElementById('formOverlay');
const closeFormButton = document.getElementById('closeFormButton');
const confirmationForm = document.getElementById('confirmationForm');
const successOverlay = document.getElementById('successOverlay');
const successButton = document.getElementById('successButton');

waxSeal.addEventListener('click', () => {
    envelopeFlap.classList.add('open');
    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        letterContainer.classList.add('active');
    }, 600);
});

confirmButton.addEventListener('click', () => {
    formOverlay.classList.add('active');
});

closeFormButton.addEventListener('click', () => {
    formOverlay.classList.remove('active');
});

formOverlay.addEventListener('click', (e) => {
    if (e.target === formOverlay) {
        formOverlay.classList.remove('active');
    }
});

confirmationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const companions = document.getElementById('companions').value;
    const phone = document.getElementById('phone').value;
    
    if (!fullName.trim() || companions === '' || !phone.trim()) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Por favor, insira um telefone válido.');
        return;
    }
    
    const formData = {
        nome: fullName,
        acompanhantes: companions,
        telefone: phone,
        data: new Date().toISOString()
    };
    
    console.log('Dados de confirmação:', formData);
    enviarDados(formData);
});

function enviarDados(dados) {
    setTimeout(() => {
        mostrarSucesso();
    }, 1000);
}

function mostrarSucesso() {
    formOverlay.classList.remove('active');
    
    setTimeout(() => {
        successOverlay.classList.add('active');
        confirmationForm.reset();
    }, 300);
}

successButton.addEventListener('click', () => {
    successOverlay.classList.remove('active');
});

successOverlay.addEventListener('click', (e) => {
    if (e.target === successOverlay) {
        successOverlay.classList.remove('active');
    }
});

document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
    }
    
    e.target.value = value;
});

let enviando = false;

confirmationForm.addEventListener('submit', function(e) {
    if (enviando) {
        e.preventDefault();
        return false;
    }
    enviando = true;
    
    setTimeout(() => {
        enviando = false;
    }, 2000);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (formOverlay.classList.contains('active')) {
            formOverlay.classList.remove('active');
        }
        if (successOverlay.classList.contains('active')) {
            successOverlay.classList.remove('active');
        }
    }
});
