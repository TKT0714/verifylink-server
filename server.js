const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/call', (req, res) => {
    const num = req.body.number;
    console.log(`【MAUIから受信】 番号: ${num}`);

    if (num) {
        io.emit('receive_number', { number: num });
        return res.status(200).json({ success: true, message: "送信完了ザます" });
    }
    return res.status(400).json({ success: false, message: "番号がありません" });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`VerifyLink Webサーバーがポート ${PORT} で起動したザます！`);
});