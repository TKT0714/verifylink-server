const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 🌟 MAUI（VerifyLink Connect）からのPOSTを受け止める窓口
app.post('/api/call', (req, res) => {
    const storeId = req.body.storeId;
    const num = req.body.number;
    const flag = req.body.flag;   // "0" = 追加, "1" = 削除
    const satei = req.body.satei; // 館名（"PC館" など）

    console.log(`【MAUI受信】 番号: ${num}, 状態: ${flag}, 館名: ${satei}`);

    if (num) {
        // 表示画面と音声画面へ、フラグや館名もセットで一斉拡声！
        io.emit('receive_number', { number: num, flag: flag, satei: satei });
        return res.status(200).json({ success: true });
    }
    return res.status(400).json({ success: false });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});