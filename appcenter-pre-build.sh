touch ./android/app/src/main/assets/appcenter-config.json
echo "{ \n \"app_secret\":$ANDROID_SECRET \n }" >> "./android/app/src/main/assets/appcenter-config.json"

touch ./ios/AppCenter-Config.plist
rm -f output
echo -e "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n <!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"https://www.apple.com/DTDs/PropertyList-1.0.dtd\"> \n <plist version=\"1.0\"> \n <dict> \n <key>AppSecret</key> \n <string>$IOS_SECRET</string> \n </dict> \n </plist>" >> output
sed 's/\\//g' output > ./ios/AppCenter-Config.plist

if [ $ENV_FLAVOR == "STAGING" ]
then
    echo STAGING
   ./node_modules/.bin/rnuc .env.staging
else
    echo PROD
   ./node_modules/.bin/rnuc .env.production
fi

cd ./node_modules/react-native

if [ $ENV_FLAVOR == "STAGING" ]
then
    sed -i.gradle "150i\\
    def flavorPathSegment = \"\"\\
            android.productFlavors.all { flavor ->\\
                if (targetName.toLowerCase().contains(flavor.name)) {\\
                    flavorPathSegment = flavor.name\\
            }\\
            }\\
    def buildVariant = \"\"\\
            android.applicationVariants.all { variantType ->\\
                buildVariant = variantType.buildType.name\\
            }\\
    doLast {\\
        def moveFunc = { resSuffix ->\\
            File originalDir = file(\"\$buildDir/generated/res/react/beta/stagingrelease/drawable-\${resSuffix}\")\\
            if (originalDir.exists()) {\\
                File destDir = file(\"\$buildDir/../src/main/res/drawable-\${resSuffix}\")\\
                ant.move(file: originalDir, tofile: destDir)\\
            }\\
        }\\
        def moveRawFunc = { dir ->\\
            File originalDir = file(\"\$buildDir/generated/res/react/beta/stagingrelease/\${dir}\")\\
            if (originalDir.exists()) {\\
                File destDir = file(\"\$buildDir/../src/main/res/\${dir}\")\\
                ant.move(file: originalDir, tofile: destDir)\\
            }\\
        }\\
        moveFunc.curry(\"ldpi\").call()\\
        moveFunc.curry(\"mdpi\").call()\\
        moveFunc.curry(\"hdpi\").call()\\
        moveFunc.curry(\"xhdpi\").call()\\
        moveFunc.curry(\"xxhdpi\").call()\\
        moveFunc.curry(\"xxxhdpi\").call()\\
        moveRawFunc.curry(\"raw\").call()\\
    }" react.gradle
else
    sed -i.gradle "150i\\
    def flavorPathSegment = \"\"\\
            android.productFlavors.all { flavor ->\\
                if (targetName.toLowerCase().contains(flavor.name)) {\\
                    flavorPathSegment = flavor.name\\
            }\\
            }\\
    def buildVariant = \"\"\\
            android.applicationVariants.all { variantType ->\\
                buildVariant = variantType.buildType.name\\
            }\\
    doLast {\\
        def moveFunc = { resSuffix ->\\
            File originalDir = file(\"\$buildDir/generated/res/react/prod/release/drawable-\${resSuffix}\")\\
            if (originalDir.exists()) {\\
                File destDir = file(\"\$buildDir/../src/main/res/drawable-\${resSuffix}\")\\
                ant.move(file: originalDir, tofile: destDir)\\
            }\\
        }\\
        def moveRawFunc = { dir ->\\
            File originalDir = file(\"\$buildDir/generated/res/react/prod/release/\${dir}\")\\
            if (originalDir.exists()) {\\
                File destDir = file(\"\$buildDir/../src/main/res/\${dir}\")\\
                ant.move(file: originalDir, tofile: destDir)\\
            }\\
        }\\
        moveFunc.curry(\"ldpi\").call()\\
        moveFunc.curry(\"mdpi\").call()\\
        moveFunc.curry(\"hdpi\").call()\\
        moveFunc.curry(\"xhdpi\").call()\\
        moveFunc.curry(\"xxhdpi\").call()\\
        moveFunc.curry(\"xxxhdpi\").call()\\
        moveRawFunc.curry(\"raw\").call()\\
    }" react.gradle
fi

cd ../..