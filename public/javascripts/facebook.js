const facebookBtn = document.getElementById('facebook')

facebookBtn.addEventListener('click', loginWithFacebook, false)

function loginWithFacebook() {
    FB.login(response => {
        
        if (response.status === 'connected') {

            // Get user details 
            FB.api('/me', { fields: 'name,email' }, async function (user) {

                // post user data on the backend
                let result = await fetch('http://localhost:3000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...user,
                        facebookId: response.authResponse.userID,
                        facebookToken: response.authResponse.accessToken
                    })
                });

                let data = await result.json()
                console.log(data);

            });
        }
    }, { scope: 'public_profile,email' });

    return false
}