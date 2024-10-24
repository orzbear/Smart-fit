# Use an official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application’s source code
COPY . .

# Build the React app (output will be in the 'dist' folder)
RUN npm run build

# Install 'serve' globally to serve the production build
RUN npm install -g serve

# Expose port 3000 (or the port you're using)
EXPOSE 3000

# Start the React app using 'serve' and serving from 'dist'
CMD ["serve", "-s", "dist", "-l", "3000"]
