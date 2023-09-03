
window.onload = extraction;

const PlaylistId = document.getElementById('PlaylistId');
// Listen for input in the name field
PlaylistId.addEventListener('input', () => {
    updateTitle.disabled = !PlaylistId.value; // Enable the submit button if the input has a value
});

const updateTitle = document.getElementById('updateTitle');
updateTitle.addEventListener('click', updateTitleCB);


function extraction() {
    // extract params and playlistid

    const url = window.location.href;
    const urlParams = new URLSearchParams(url.split('#')[1]); // Extract parameters after the hash (#) symbol

    const accessTokenParam = urlParams.get('access_token');

    const PlaylistIdVal  = localStorage.getItem('PlaylistId');
    PlaylistId.value = PlaylistIdVal;
    if(PlaylistId.value){
        updateTitle.disabled = !PlaylistId.value;
    }

    if (accessTokenParam && PlaylistId.value) {
        window.history.replaceState(null, '', url.split('?')[0].split('#')[0]);
        updateTitle.disabled=true;
        updateTitle.textContent="Updating Title..."

        const apiUrl = url.split('?')[0].split('#')[0] + 'api/updateTitle';
        const bodyData = {
            playlistId:PlaylistId.value,
            token:accessTokenParam
        }

        fetch(apiUrl, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(bodyData)
            })
            .then(response => response.json())
            .then(data => {
                updateTitle.disabled=false;
                updateTitle.textContent="Update Title"

                console.log(data);

                document.getElementById('result').innerHTML = "Title Updated Successfully. Click on the below link to view your video.<br>Updated Title : " + data?.result?.jsonDoc?.snippet?.title
                const vidId=data?.result?.jsonDoc?.id
                if(vidId){
                document.getElementById('ytLink').textContent = "https://www.youtube.com/watch?v=" + vidId;
                document.getElementById('ytLink').href = "https://www.youtube.com/watch?v=" + vidId;

                }

            })
            .catch(error => {
                updateTitle.disabled=false;
                updateTitle.textContent="Update Title"

                console.error('Error fetching data:', error);
            });
    } 
}

function updateTitleCB(){
    const PlaylistIdVal = PlaylistId.value;
    if (PlaylistIdVal) {
        localStorage.setItem('PlaylistId', PlaylistIdVal);
        // alert(`PlaylistId "${PlaylistIdVal}" has been stored in local storage.`);
        window.location="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5001&response_type=token&client_id=644444506873-u1f31kni740e6575ek5ofa55opmvtj8i.apps.googleusercontent.com"
    } else {
        alert('Please enter PlaylistId.');
    }
}
