function showAlert(text, type = 'succes') {      
    //   ALERT CUSTOM:
const alertDialog = document.createElement('div');
alertDialog.classList.add('alert-dialog');
alertDialog.innerText = text;
document.body.appendChild(alertDialog);

if(type === 'error') {
alertDialog.style.background = 'linear-gradient(rgba(159, 159, 161, 1), rgba(217, 15, 33, 1)';
}
if(type ==='warning') {
alertDialog.style.background = 'linear-gradient(rgba(159, 159, 161,1), rgba(217, 99, 15, 1))'
}

setTimeout(() => alertDialog.classList.add('show'), 10)

setTimeout(() =>{
alertDialog.remove('show');
setTimeout(() => {
alertDialog.remove()
}, 1000)

}, 3000)

}