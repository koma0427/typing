var p = document.getElementById('text');
var timer = null; // タイマー用の変数
var startTime = null; // 開始時間用の変数
var elapsedTime = null; // 経過時間用の変数
var count = 0; // 入力文字数用の変数

//タイピングする文字列をここで用意しておく
var textLists = [    'Hello World',    'This is my App',    'How are you?',    'Hello Hello',    'I love JavaScript!',    'Good morning',    'I am Japanese',    'Let it be'];
var checkTexts = [];


createText();

function createText() {
    //文字列をランダムに取得する
    var rnd = Math.floor(Math.random() * textLists.length);

    //前の文字列を削除してから次の文字列を表示する
    p.textContent = '';
    
    //文字列を1文字ずつに分解して、それぞれにspanタグを挿入する
    checkTexts = textLists[rnd].split('').map(function(value) {
        var span = document.createElement('span');

        span.textContent = value;
        p.appendChild(span);

        return span;
    });

    //タイピング開始時間を設定する
    startTime = Date.now();

    //タイマーをスタートする
    if (!timer) {
      timer = setInterval(updateTimer, 10);
    }
}

function updateTimer() {
    //タイマー更新処理
    elapsedTime = Date.now() - startTime;
    document.getElementById("timer").textContent = (elapsedTime / 1000).toFixed(2);
}

document.addEventListener('keydown', keyDown);

function keyDown(e) {
    //キーボードからの入力は「e.key」に格納されている
    if(e.key === checkTexts[0].textContent) {
        checkTexts[0].classList.add('add-blue');
        count++;

        //0番目の配列要素を削除して、次の1文字を比較対象にする
        checkTexts.shift();

        //配列要素が空っぽになったら次の問題を出す
        if(!checkTexts.length) {
            //タイマーを停止する
            clearInterval(timer);
            timer = null;

            //タイピング完了メッセージを表示する
            var message = "入力完了！" + count + "文字 / " + (elapsedTime / 1000).toFixed(2) + "秒";
            alert(message);
            createText();
        }
    } else {
        checkTexts[0].classList.add('add-red');
    }
}
