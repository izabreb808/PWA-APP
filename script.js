console.log('Script works!');

function hello() {
    const userName = document.getElementById('name').value; 
    document.getElementById('userName').textContent = userName;
    document.getElementById('hello').style.display = 'block';
}
