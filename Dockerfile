# 1. Use Node.js 18 as the base
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first (for better caching)
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# 4. Install dependencies (We focus on server for this demo)
WORKDIR /app/server
RUN npm install

# 5. Copy the rest of the code
COPY server/ ./

# 6. Open the port
EXPOSE 5000

# 7. Start the app
CMD ["node", "server.js"]
