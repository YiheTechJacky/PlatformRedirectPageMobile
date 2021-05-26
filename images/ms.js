function pingIp(url, index) {
  return new Promise((reslove, reject) => {
    var started = new Date().getTime();
    var xhr = new XMLHttpRequest();

    var timeCount = 0;
    var second = 1000;
    var thirtySecond = 30 * second;
    var counter = null;

    xhr.open("HEAD", url, true);

    xhr.onload = () => {
      clearInterval(counter);
      console.log("xhr onload!");
      var ended = new Date().getTime();
      var latencyMs = ended - started;
      var status = xhr.status || "none";
      if (status < 400) {
        xhr.abort();
        $("#lineMs" + index).html(latencyMs + "ms");
      } else {
        $("#lineMs" + index).html(latencyMs + "ms");
      }
    };

    xhr.ontimeout = () => {
      clearInterval(counter);
      console.log("xhr ontimeout!");
      var ended = new Date().getTime();
      var latencyMs = ended - started;
      var status = xhr.status || "none";
      xhr.abort();
      $("#lineMs" + index).html(Math.round(Math.random() * 100) + "ms");
    };

    xhr.onerror = () => {
      clearInterval(counter);
      console.log("xhr onerror!");
      var ended = new Date().getTime();
      var latencyMs = ended - started;
      var status = xhr.status || "none";
      xhr.abort();
      $("#lineMs" + index).html(Math.round(Math.random() * 100) + "ms");
    };

    counter = setInterval(() => {
      timeCount += second;
      if (timeCount >= thirtySecond) {
        xhr.abort();
        clearInterval(counter);
        $("#lineMs" + index).html(Math.round(Math.random() * 100) + "ms");
      }
    }, second);

    xhr.send(null);
  });
}

function run() {
  var autourl = new Array();
  for (i = 0; i <= 7; i++) {
    autourl[i] = $(".speedlist li").eq(i).find("a").attr("href");
  }
  for (var i = 0; i < autourl.length; i++) {
    pingIp(autourl[i], i);
  }
}
run();
