# Building the front end
cd ui
yarn
yarn build --prod --aot --build-optimizer
cp -R dist/ ../service/src/main/resources

# Building the back end
cd ../service
sh install.sh -ssl ~/keystore.jks
