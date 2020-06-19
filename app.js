const express = require('express')
const app = express()
const path = require('path')
var Leap = require('leapjs'); 

var controller = Leap.loop({frameEventName:'deviceFrame', enableGestures:true});

const rootPath = path.dirname(require.main.filename)

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', socket => {

    controller.on('frame', function(frame) { 
        if(frame.valid && frame.gestures.length > 0){
            frame.gestures.forEach(function(gesture){
                switch (gesture.type){
                case "circle":
                    // console.log("Circle Gesture");
                    break;
                case "keyTap":
                    console.log("Key Tap Gesture");
                    socket.emit('gesture', 'Pause')
                    break;
                case "screenTap":
                    // console.log("Screen Tap Gesture");
                    // socket.emit('gesture', 'Pause')
                    break;
                case "swipe":
                    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                    //Classify as right-left or up-down
                    if(isHorizontal){
                        if(gesture.direction[0] > 0){
                            swipeDirection = "right";
                        } else {
                            swipeDirection = "left";
                        }
                    } else { //vertical
                        if(gesture.direction[1] > 0){
                            swipeDirection = "up";
                        } else {
                            swipeDirection = "down";
                        }                  
                    }
    
                    if(swipeDirection === 'right') {
                        console.log('next')
                        socket.emit('gesture', 'Next')
                    } else if(swipeDirection === 'left') {
                        console.log('prev')
                        socket.emit('gesture', 'Previous')
                    }
                    // console.log(swipeDirection)
                    break;
                }
            });
          }
    }); 
    // socket.emit('gesture', 'text')

});

app.get('/', (req, res) => {
    res.sendFile(rootPath + '/index.html')
})


server.listen(3000, () => console.log('server running'))