const axios = require('axios');

(async () => {
    try {
        const inputRes = await axios.get('https://share.shub.edu.vn/api/intern-test/input');
        const { token, data, query } = inputRes.data;
        
        const totalSum = [0];
        const diffSum = [0];
        data.forEach((val, index) => {
            totalSum.push(totalSum[index] + val);
            diffSum.push(diffSum[index] + (index % 2 === 0 ? val : -val));
        });

        const results = query.map(q => {
            const [l, r] = q.range;
            if (q.type === '1') {
                return totalSum[r + 1] - totalSum[l];
            } else {
                return diffSum[r + 1] - diffSum[l];
            }
        });

        const outputRes = await axios.post('https://share.shub.edu.vn/api/intern-test/output', results, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }}
        );

        console.log('response: ', outputRes.data);
    } catch (error) {
        console.error('Lỗi', error.message);
    }
})();
