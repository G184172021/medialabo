let data = {
  "coord": {
    "lon": 116.3972,
    "lat": 39.9075
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "曇りがち",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 9.94,
    "feels_like": 8.65,
    "temp_min": 9.94,
    "temp_max": 9.94,
    "pressure": 1022,
    "humidity": 14,
    "sea_level": 1022,
    "grnd_level": 1016
  },
  "visibility": 10000,
  "wind": {
    "speed": 2.65,
    "deg": 197,
    "gust": 4.84
  },
  "clouds": {
    "all": 53
  },
  "dt": 1646542386,
  "sys": {
    "type": 1,
    "id": 9609,
    "country": "CN",
    "sunrise": 1646520066,
    "sunset": 1646561447
  },
  "timezone": 28800,
  "id": 1816670,
  "name": "北京市",
  "cod": 200
};

////////// 課題3-2 ここからプログラムを書こう
//天気予報のテンプレート: 都市名，最高気温，最低気温を出力させる

let t1 = document.querySelector('div#toshi');
t1.textContent = (data.name);

let t2 = document.querySelector('div#max');
t2.textContent = (data.main.temp_max);

let t3 = document.querySelector('div#mini');
t3.textContent = data.main.temp_min;


let b = document.querySelector('#sendRequest');
b.addEventListener('click', sendRequest);


// 通信を開始する処理
function sendRequest() {
    // URL を設定
    let e = document.querySelector('input[name=integer]');
    let key = e.value;
    let url = 'https://www.nishita-lab.org/web-contents/jsons/openweather/' + key + '.json';

    // 通信開始
    axios.get(url)
        .then(showResult)   // 通信成功
        .catch(showError)   // 通信失敗
        .then(finish);      // 通信の最後の処理
}

// 通信が成功した時の処理
function showResult(resp) {
    // サーバから送られてきたデータを出力
    let data = resp.data;

    //都市名
    let t4 = document.querySelector('div#data1');
    t4.textContent = data.name;
    //緯度
    let t5 = document.querySelector('div#data2');
    t5.textContent = data.coord.lon;
    //経度
    let t6 = document.querySelector('div#data3');
    t6.textContent = data.coord.lat;
    //天気
    let s = document.querySelector('div#data4');
    s.textContent = data.weather.description;
    //最低気温
    let s1 = document.querySelector('div#data5');
    s1.textContent = data.main.temp_min;
    //最高気温
    let s2 = document.querySelector('div#data6');
    s2.textContent = data.main.temp_max;

    let s3 = document.querySelector('div#data7');
    s3.textContent = data.main.humidity;

    let s4 = document.querySelector('div#data8');
    s4.textContent = data.wind.speed;
    // data が文字列型なら，オブジェクトに変換する
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    // data をコンソールに出力
    console.log(data);

    // data.x を出力
    console.log(data.x);
}
// 通信エラーが発生した時の処理
function showError(err) {
    console.log(err);
}

// 通信の最後にいつも実行する処理
function finish() {
    console.log('Ajax 通信が終わりました');
}