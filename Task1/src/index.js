const axios = require('axios');
const XLSX = require('xlsx');

(async () => {
    try {
        const response = await axios.get('https://go.microsoft.com/fwlink/?LinkID=521962', {
            responseType: 'arraybuffer'
        });

        const file = XLSX.read(response.data, { type: 'buffer' });
        const sheetName = file.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(file.Sheets[sheetName]);

        const cleanSheet = sheet.map(row => {
            const cleanedRow = {};
            for (let key in row) {
                const cleanKey = key.trim();
                cleanedRow[cleanKey] = row[key];
            }
            return cleanedRow;
        });

        const result = cleanSheet.filter(row => row['Sales'] > 50000);

        const newSheet = XLSX.utils.json_to_sheet(result);
        const newFile = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newFile, newSheet, 'FilteredData');
        XLSX.writeFile(newFile, 'output/FilteredData.xlsx');
        
        console.log('File đã được lưu thành công tại thư mục output!');
    } catch (error) {
        console.error('Lỗi:', error.message);
    }
})();
