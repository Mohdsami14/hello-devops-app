# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app code
COPY . .

# Expose port 3000 for the app
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
