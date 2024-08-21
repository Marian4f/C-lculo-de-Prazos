document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const dataInicialInput = document.getElementById('dataInicial');
    const diasInput = document.getElementById('dias');
    const resultadoTextarea = document.getElementById('resultado');

    // Função para formatar a data
    const formatDate = (value) => {
        const cleanValue = value.replace(/\D/g, '');
        let formattedValue = '';

        if (cleanValue.length <= 2) {
            formattedValue = cleanValue;
        } else if (cleanValue.length <= 4) {
            formattedValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2);
        } else if (cleanValue.length <= 8) {
            formattedValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4) + '/' + cleanValue.slice(4);
        } else {
            formattedValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4) + '/' + cleanValue.slice(4, 8);
        }

        return formattedValue;
    };

    // Adiciona o evento de input ao campo de data
    dataInicialInput.addEventListener('input', (event) => {
        event.target.value = formatDate(event.target.value);
    });

    // Adiciona o evento de blur para validar o formato da data
    dataInicialInput.addEventListener('blur', (event) => {
        const value = event.target.value;
        const [day, month, year] = value.split('/').map(num => parseInt(num, 10));
        
        if (day > 31 || month > 12 || year < 1000 || year > 9999) {
            alert('Data inválida. Por favor, insira uma data válida no formato dd/mm/yyyy.');
            event.target.focus();
        }
    });

    // Adiciona o evento de submit ao formulário
    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o envio do formulário

        const dataInicial = dataInicialInput.value;
        const dias = parseInt(diasInput.value, 10);

        if (!dataInicial || isNaN(dias)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const [day, month, year] = dataInicial.split('/').map(num => parseInt(num, 10));
        const data = new Date(year, month - 1, day); // Ajusta mês (0-indexado)

        if (isNaN(data.getTime())) {
            alert('Data inválida. Por favor, insira uma data válida.');
            return;
        }

        // Calcula a data futura
        const vencimento = new Date(data.getTime() + dias * 24 * 60 * 60 * 1000);
        const diaVencimento = String(vencimento.getDate()).padStart(2, '0');
        const mesVencimento = String(vencimento.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexado
        const anoVencimento = vencimento.getFullYear();

        // Exibe o resultado
        resultadoTextarea.value = `${diaVencimento}/${mesVencimento}/${anoVencimento}`;
    });
});
