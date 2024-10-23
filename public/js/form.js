document.getElementById("submitform").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Hiba sikeresen beküldve!");
            //window.location.href = '/dashboard.html';  // Redirect to dashboard
        } else {
            alert("Hiba történt a beküldés során.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
});


/*document.getElementById('submitform').addEventListener('submit', event => {
    event.preventDefault();  
    const hnev = document.getElementById('hiba-nev').value;
    const hleir = document.getElementById('hiba-leiras').value; 
    const hfot = document.getElementById('hiba-foto').files[0];
    const hhely = document.getElementById('helyszin').value;
    const tag = document.getElementById('tag').value;
    const rd = new FileReader();

    rd.onload = () => {
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            hiba_nev: hnev, 
            hiba_leiras: hleir,
            hiba_foto: rd.result,
            helyszin: hhely, 
            tag: tag,
        }),
    }).then(response => {
        if (response.status === 200) {
            return response.text();
        } else {
            throw new Error('Hibás adatok'); 
        }
    }).then(data => {
        document.body.style.color = "#ffffff" 
        if(data && data.length > 0) {
            document.body.innerHTML = data;
        }
    }).catch(error => {
        console.error('Error:', error);
    });
    }
    if(hfot) {
        rd.readAsDataURL(hfot);
    } else {
        rd.onload();
    }
});
*/