var WIDTH = 640;
var HEIGHT = 480;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

var video = document.getElementById('video_cam');
navigator.getUserMedia({
        video: true,
        audio: false
    },
    function (stream) { // for success case
        console.log(stream);
        video.src = window.URL.createObjectURL(stream);
    },
    function (err) { // for error case
        console.log(err);
    }
);


//1文字の大きさを取得する
$("#asc").text(".");
var charWidth = Math.floor($('#asc').width());
var charHeight = Math.floor($('#asc').height());
var seeds = "ﾎﾇﾆﾉｨ..";
var seeds2 = "ホヌニノイカ";

(function loops() {
    var video = document.querySelector('#video_cam');
    var drow = document.querySelector('#canvas_draw');
    video.width = drow.width = WIDTH;
    video.height = drow.height = HEIGHT;

    //ビデオ画像をcanvasに落とす
    var ctx_draw = drow.getContext('2d');
    ctx_draw.drawImage(video, 0, 0, video.width, video.height);

    // imagedataの取得
    imgdata = ctx_draw.getImageData(0, 0, WIDTH, HEIGHT).data;

    var ascdata = [];
    for (y = 0; y < HEIGHT; y = y + charHeight) {
        for (x = 0; x < WIDTH; x = x + charWidth) {
            var idx = (x + y * WIDTH) * 4;
            var r = imgdata[idx + 0];
            var g = imgdata[idx + 1];
            var b = imgdata[idx + 2];
            //輝度計算
            var v = r * 0.298912 + g * 0.586611 + b * 0.114478;
            ascdata.push(seeds[Math.floor(v / 255 * seeds.length)]);
        }
        ascdata.push('<br/>');
    }
    $("#asc").html(ascdata.join(''));
    window.requestAnimationFrame(loops);
}());

var start = function () {
    if ($("#shower").css("display") == "none") {
        $("#shower").css("display", "");
        matrixCnt = 0;
        shower.getContext('2d').clearRect(0, 0, WIDTH, HEIGHT);
        timer = setInterval(matrix, 80);
    } else {
        $("#video_cam").css("display", "");
        $("#asc").css("display", "none");
        $("#shower").css("display", "none");
        clearInterval(timer);
    }

};

var matrixCnt = 0;
shower.width = WIDTH;
shower.height = HEIGHT;

var letters = Array(256).join(1).split('');

var matrix = function () {
    if (matrixCnt > 80) {
        shower.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
        shower.getContext('2d').fillRect(0, 0, WIDTH, HEIGHT);
    } else {
        if (matrixCnt == 80) {
            $("#asc").css("display", "");
        }
        matrixCnt++;
    }
    shower.getContext('2d').fillStyle = '#0F0';
    letters.map(function (y_pos, index) {
        text = seeds2[Math.floor(Math.random() * seeds2.length)];
        x_pos = index * 10;
        shower.getContext('2d').fillText(text, x_pos, y_pos);
        letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
    });
};
