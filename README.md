### In order to start to work with the project, download it using command:
```
git clone https://github.com/MariyaMitko/FoodMe
```

### Then load all dependencies:
```
npm install
```

### For running all tests perform the command
```
protractor protractor.conf.js --suite all
```

### For running tests related to high priority suite run command:
```
protractor protractor.conf.js --suite highPriority
```

### For running tests related to medium priority suite run command:
```
protractor protractor.conf.js --suite mediumPriority
```

### After tests execution is completed, results are loaded into allure-results folder.
```
If you are running tests locally (not at the server) then for generating HTML report run the following command from the root project folder
.\node_modules\allure-commandline\dist\bin\allure" generate "allure-results" --clean

After that HTML reports would be available in the allure-report folder - just open index.html file.
IMPORTANT NOTE: Please, open the index.html in firefox browser (in other browser it may not be correctly presented because of allure issue)
