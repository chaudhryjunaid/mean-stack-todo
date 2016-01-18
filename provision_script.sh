sudo apt-get update
sudo apt-get install -y  vim git g++ mysql-client
wget https://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-x64.tar.gz
sudo tar -C /usr/local --strip-components 1 -xzf node-v4.2.4-linux-x64.tar.gz
sudo npm install -g bower mocha grunt-cli shipit-cli pm2
