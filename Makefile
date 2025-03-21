install:
	npm ci
	make -C frontend install

build:
	rm -rf frontend/dist
	npm run build

start:
	npx start-server -s ./frontend/dist