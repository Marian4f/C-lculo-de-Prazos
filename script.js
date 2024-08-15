document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const dataInicialStr = document.getElementById('dataInicial').value;
    const dias = parseInt(document.getElementById('dias').value);

    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataInicialStr)) {
        alert("Por favor, insira a data no formato dd/mm/yyyy.");
        return;
    }

    const partesData = dataInicialStr.split('/');
    const dia = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1;
    const ano = parseInt(partesData[2], 10);
    const dataInicial = new Date(ano, mes, dia);

    if (isNaN(dataInicial.getTime())) {
        alert("Data inválida. Por favor, insira uma data válida no formato dd/mm/yyyy.");
        return;
    }

    dataInicial.setDate(dataInicial.getDate() + dias);

    const diaFuturo = String(dataInicial.getDate()).padStart(2, '0');
    const mesFuturo = String(dataInicial.getMonth() + 1).padStart(2, '0');
    const anoFuturo = dataInicial.getFullYear();

    const dataFuturaStr = `${diaFuturo}/${mesFuturo}/${anoFuturo}`;

    document.getElementById('resultado').value = dataFuturaStr;
});
