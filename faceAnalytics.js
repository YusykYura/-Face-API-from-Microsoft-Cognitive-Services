document.getElementById("analyze").addEventListener("click", analyze);
function analyze(){

    var reqBody = {
        "url": document.getElementById("image_url").value
    }

    var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'023f1661f6244d3e9f81501646ef9a0f'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender', initObject);

    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        document.getElementById("analyzed_img").src	=	document.getElementById("image_url").value;
        document.getElementById("face_age").innerHTML = response[0].faceAttributes.age;
        document.getElementById("face_gender").innerHTML = response[0].faceAttributes.gender;
    }).catch(function(err){
        err = err.toString();
        if(err.includes("Cannot read property 'faceAttributes' of undefined")== true)
            alert("No Faces Detected");
        document.getElementById("analyzed_img").src	=	'';
        document.getElementById("face_age").innerHTML = "";
        document.getElementById("face_gender").innerHTML = "";
    });

}