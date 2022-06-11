video = "";
objects= [];
function setup() {
    canvas= createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded() {
    console.log("Model loaded!");
   status = true;
} 

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
      if (status != "")
      {
          objectDetector.detect(video, gotResult);

          for (i = 0; i < objects.length; i++) {
              document.getElementById("status").innerHTML = "Status : Objects Detected";
              document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].height);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          }
      }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    

}

