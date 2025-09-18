# Portfolio API Configuration

## Setup Instructions

1. **Update the API URL** in `src/config/api.js` to match your backend server:
   ```javascript
   export const API_CONFIG = {
     BASE_URL: 'http://localhost:YOUR_PORT/api', // Change this to your backend URL
   };
   ```

2. **Common backend ports:**
   - Node.js/Express: `3001`, `5000`, `8000`
   - Spring Boot: `8080`
   - Django: `8000`
   - FastAPI: `8000`

3. **Make sure your backend server is running** before testing the portfolio functionality.

## API Endpoints Used

The portfolio functionality uses these endpoints on your backend:

**Companies API:**
- `GET /companies` - Get all companies
- `GET /companies/:id` - Get company details with allocations
- `GET /companies/sector/:sectorId` - Get companies by sector

**Sectors API:**
- `GET /sectors` - Get all sectors
- `GET /sectors/:id` - Get sector details
- `GET /sectors/:id/companies` - Get companies by sector

## Testing the Connection

1. Start your backend server
2. Start the React app: `npm start`
3. Navigate to "Portfolio Analysis" in the navbar
4. Check the browser console for API request logs

## Troubleshooting

- **Connection refused errors**: Make sure your backend server is running on the correct port
- **CORS errors**: Configure CORS in your backend to allow requests from `http://localhost:3000`
- **404 errors**: Check that your backend routes match the expected endpoints
- **API URL issues**: Verify the BASE_URL in `src/config/api.js` matches your backend server
- **Data format errors**: Ensure your backend returns data in the expected format (see API endpoints above)

## Environment Variables (Optional)

You can also use environment variables by creating a `.env` file in your project root:

```
REACT_APP_API_URL=http://localhost:3001/api
```

Then update `src/config/api.js`:
```javascript
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
};
```
