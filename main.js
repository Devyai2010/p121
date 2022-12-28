prediction_1 = ""

Webcam.set({
    Width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IENOfbcVU/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.SpeechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        prediction_1 = results[0].lable;
        speak();
        if(results[0].label == "amazing") 
        { 
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128522;"; 
            toSpeak = "This is looking amazing";
        }
        else if(results[0].label == "all the best") 
        { 
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128532;"; 
            toSpeak = "All the best";
        }
       else if(results[0].label == "victory") 
        { 
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128548;"; 
            toSpeak = "That was the marvelous victory";
        }   
    }

}