window.logger.onMainProcessEvent = () => {
    console.log('Message recut !');
};

document.getElementById('mon-bouton').addEventListener('click', () => {
    window.logger.error("une erreur critique est survenue !");
});

document.getElementById('bouton-ajax').addEventListener('click', async () => {
    const result = await window.ipcRenderer.invoke('ajax-request', 'https://jsonplaceholder.typicode.com/todos/1');
    document.getElementById('ajax-content').innerText = JSON.stringify(result);
});

document.getElementById('bouton-test').addEventListener('click', async () => {
    const response = await window.dialog.showMessageBox({
        buttons: ['ok', 'Annuler'],
        cancelId: 1,
        title: "faite un choix",
        message: "ete vous sur de vouloir realiser cette action ?",
        type: 'warning',
        checkboxLabel: "confirmer en cochant la case",
        checkboxChecked: false,
    });

    await window.dialog.showMessageBox({
        title: 'resultat:',
        message: `Bouton choisi: ${response.response}, la checkbox est elle clicker? ${response.checkboxChecked ? 'oui' : 'non'}`
    });
});


