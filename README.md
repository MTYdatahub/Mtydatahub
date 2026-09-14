# MTY DATA HUB — VTUGATE Sandbox Backend

Prepared for the MTY DATA HUB app.

Endpoints:
- GET /health
- GET /api/vtugate/account
- POST /api/data/plans
- POST /api/data/buy
- POST /api/transaction/status

Setup:
1. Copy .env.example to .env
2. Put your VTUGATE TEST/SANDBOX key in .env
3. Run: npm install
4. Run: npm start

IMPORTANT: Never put a VTUGATE live key in Android/HTML/JavaScript or GitHub.
Use the TEST key while building. VTUGATE documents HTTPS, Bearer authentication,
and the data endpoints /api/v1/fetchdataplans, /api/v1/buydata and
/api/v1/transactionstatus.
