## 1. Project Restructuring

- [x] 1.1 Create `presentations/` folder at project root
- [x] 1.2 Move `java-11-to-17/mark-down/` to `presentations/java-11-to-17/`
- [x] 1.3 Create `reveal.js/` folder at project root
- [x] 1.4 Move js/, css/, dist/, plugin/ from java-11-to-17/ to reveal.js/
- [x] 1.5 Create `assets/images/` folder at project root
- [x] 1.6 Move background images to assets/images/
- [x] 1.7 Clean java-11-to-17/ folder (remove all non-markdown files)

## 2. Package.json and Build Configuration

- [x] 2.1 Move package.json from java-11-to-17/ to project root
- [x] 2.2 Remove test dependencies from package.json
- [x] 2.3 Install webpack and webpack-cli
- [x] 2.4 Install webpack-dev-server
- [x] 2.5 Install html-webpack-plugin
- [x] 2.6 Install copy-webpack-plugin
- [x] 2.7 Remove gulpfile.js and gulp dependencies

## 3. Webpack Configuration

- [x] 3.1 Create webpack.config.js at project root
- [x] 3.2 Configure entry points to discover presentations in `presentations/`
- [x] 3.3 Configure output to /site folder
- [x] 3.4 Configure html-webpack-plugin to generate index.html
- [x] 3.5 Configure JavaScript minification/compression
- [x] 3.6 Configure copy-webpack-plugin to copy assets to /site
- [x] 3.7 Configure dev server with hot reload

## 4. Index.html and Presentation Loading

- [x] 4.1 Create index.html template with reveal.js setup
- [x] 4.2 Implement query parameter routing for presentation selection
- [x] 4.3 Configure default presentation (java-11-to-17)

## 5. NPM Scripts

- [x] 5.1 Update package.json scripts: "dev" for hot reload server
- [x] 5.2 Update package.json scripts: "build" for production build
- [x] 5.3 Update package.json scripts: "start" as alias for dev

## 6. Verification

- [x] 6.1 Run `npm install` to verify dependencies
- [x] 6.2 Run `npm run dev` to verify hot reload works
- [x] 6.3 Run `npm run build` to verify /site folder is created
- [x] 6.4 Verify /site contains all required files
- [x] 6.5 Verify presentation loads correctly in browser
- [x] 6.6 Verify markdown changes trigger hot reload
