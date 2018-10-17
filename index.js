const express = require('express');
const excel = require('exceljs');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist/bikepark'));

app.post('/bikepark', (req, res) => {
  const { startDate, endDate, name, amount } = req.body;
  const formatDateIn = 'YYYY-MM-DD';
  const start = moment(startDate, formatDateIn);
  const end = moment(endDate, formatDateIn);
  const workbook = new excel.Workbook();
  const sheetName = 'Bang ke';

  const sheet = workbook.addWorksheet(sheetName);

  sheet.addRow([]);
  sheet.addRow(['', 'Ghi rõ tên công ty, địa chỉ', 'Ghi rõ tên công ty, địa chỉ']);
  sheet.addRow(['Ngày', 'Nơi đi', 'Nơi đến', 'Tiền gửi xe']);
  const rows = [];
  const days = end.diff(start, 'days');
  for (let i = 0; i <= days; i++) {
    const day = moment(startDate, formatDateIn).add(i, 'days');
    if (day.day() != 0 && day.day() != 6)
      rows.push([day.format('DD/MM/YYYY'), 'Nhà riêng', 'Văn phòng làm việc', amount]);
  }
  sheet.addRows(rows);
  sheet.columns = [
    { header: '', key: 'col1', width: 12 },
    { header: '', key: 'col2', width: 12 },
    { header: '', key: 'col3', width: 30 },
    { header: '', key: 'col4', width: 12 },
  ];

  const fileName = 'Theo doi gui xe_HN_' + name + '.xlsx';
  workbook.xlsx.writeFile(path.join(__dirname, 'dist/bikepark', fileName)).then(() => {
    res.sendStatus(200);
    // res.sendFile(path.join(__dirname, fileName));
  }).catch(err => {
    console.log('error: ', err);
    res.sendStatus(500);
  });

});

app.get('/');

app.listen(process.env.PORT || 3000);