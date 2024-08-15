document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Obter valores dos campos
    const dataInicialStr = document.getElementById('dataInicial').value;
    const dias = parseInt(document.getElementById('dias').value);

    // Verificar se a data inicial está no formato correto
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataInicialStr)) {
        alert("Por favor, insira a data no formato dd/mm/yyyy.");
        return;
    }

    // Converter string da data inicial para um objeto Date
    const partesData = dataInicialStr.split('/');
    const dia = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Mês começa em 0 no objeto Date
    const ano = parseInt(partesData[2], 10);
    const dataInicial = new Date(ano, mes, dia);

    // Verificar se a data é válida
    if (isNaN(dataInicial.getTime())) {
        alert("Data inválida. Por favor, insira uma data válida no formato dd/mm/yyyy.");
        return;
    }

    // Adicionar os dias
    dataInicial.setDate(dataInicial.getDate() + dias);

    // Formatar a data futura
    const diaFuturo = String(dataInicial.getDate()).padStart(2, '0');
    const mesFuturo = String(dataInicial.getMonth() + 1).padStart(2, '0');
    const anoFuturo = dataInicial.getFullYear();

    const dataFuturaStr = `${diaFuturo}/${mesFuturo}/${anoFuturo}`;

    // Exibir o resultado
    document.getElementById('resultado').value = dataFuturaStr;
});
