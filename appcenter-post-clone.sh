### .env
# echo -e "API_BASE_URL="$API_BASE_URL_STAGING >> output
# echo -e "WEBSOCKET_BASE_URL="$WEBSOCKET_BASE_URL_STAGING >> output
# echo -e "IMAGES_PREFIX_URL="$IMAGES_PREFIX_URL >> output
# echo -e "GOOGLE_MAPS_API_KEY="$GOOGLE_MAPS_API_KEY >> output
# echo -e "MYAPP_DEBUG_STORE_FILE="$MYAPP_DEBUG_STORE_FILE >> output
# echo -e "MYAPP_DEBUG_KEY_ALIAS="$MYAPP_DEBUG_KEY_ALIAS >> output
# echo -e "MYAPP_DEBUG_STORE_PASSWORD="$MYAPP_DEBUG_STORE_PASSWORD >> output
# echo -e "MYAPP_DEBUG_KEY_PASSWORD="$MYAPP_DEBUG_KEY_PASSWORD >> output
# echo -e "MYAPP_RELEASE_STORE_FILE="$MYAPP_RELEASE_STORE_FILE >> output
# echo -e "MYAPP_RELEASE_KEY_ALIAS="$MYAPP_RELEASE_KEY_ALIAS >> output
# echo -e "MYAPP_RELEASE_STORE_PASSWORD="$MYAPP_RELEASE_STORE_PASSWORD >> output
# echo -e "MYAPP_RELEASE_KEY_PASSWORD="$MYAPP_RELEASE_KEY_PASSWORD >> output
# echo -e "SSL_EXPIRATION_WARNING="$SSL_EXPIRATION_WARNING_STAGING >> output
# echo -e "AWS_EXPORTS="$AWS_EXPORTS_STAGING >> output
# echo -e "ENV="$ENV >> output
# echo -e "CODE_PUSH_IOS_STAGING="$CODE_PUSH_IOS_STAGING >> output
# echo -e "CODE_PUSH_IOS_PROD="$CODE_PUSH_IOS_PROD >> output
# echo -e "CODE_PUSH_ANDROID_STAGING="$CODE_PUSH_ANDROID_STAGING >> output
# echo -e "CODE_PUSH_ANDROID_PROD="$CODE_PUSH_ANDROID_PROD >> output

yarn cache clean

echo -e "ENV=${ENV}" >> output
echo -e "API_BASE_URL=${API_BASE_URL}" >> output
echo -e "WEBSOCKET_BASE_URL=${WEBSOCKET_BASE_URL}" >> output
echo -e "MYAPP_DEBUG_STORE_FILE=debug.keystore" >> output
echo -e "MYAPP_DEBUG_KEY_ALIAS=androiddebugkey" >> output
echo -e "MYAPP_DEBUG_STORE_PASSWORD=android" >> output
echo -e "MYAPP_DEBUG_KEY_PASSWORD=android" >> output
echo -e "IMAGES_PREFIX_URL=${IMAGES_PREFIX_URL}" >> output
echo -e "GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}" >> output
echo -e "CODE_PUSH_IOS_STAGING=${CODE_PUSH_KEY}" >> output
echo -e "CODE_PUSH_IOS_PROD=${CODE_PUSH_KEY}" >> output
echo -e "CODE_PUSH_ANDROID_STAGING=${CODE_PUSH_KEY}" >> output
echo -e "CODE_PUSH_ANDROID_PROD=${CODE_PUSH_KEY}" >> output
echo -e "SSL_EXPIRATION_WARNING=${SSL_EXPIRATION_WARNING}" >> output
echo -e "SKIP_PREFLIGHT_CHECK=${SKIP_PREFLIGHT_CHECK}" >> output
echo -e "AWS_EXPORTS=${AWS_EXPORTS}" >> output


if [ $ENV_FLAVOR == "STAGING" ]
then
  echo STAGING
	sed 's/\\//g' output > .env.staging
else
  echo PROD
  sed 's/\\//g' output > .env.production
fi



### .env.staging
# echo -e "API_BASE_URL="$API_BASE_URL_STAGING >> output.staging
# echo -e "WEBSOCKET_BASE_URL="$WEBSOCKET_BASE_URL_STAGING >> output.staging
# echo -e "IMAGES_PREFIX_URL="$IMAGES_PREFIX_URL >> output.staging
# echo -e "GOOGLE_MAPS_API_KEY="$GOOGLE_MAPS_API_KEY >> output.staging
# echo -e "MYAPP_DEBUG_STORE_FILE="$MYAPP_DEBUG_STORE_FILE >> output.staging
# echo -e "MYAPP_DEBUG_KEY_ALIAS="$MYAPP_DEBUG_KEY_ALIAS >> output.staging
# echo -e "MYAPP_DEBUG_STORE_PASSWORD="$MYAPP_DEBUG_STORE_PASSWORD >> output.staging
# echo -e "MYAPP_DEBUG_KEY_PASSWORD="$MYAPP_DEBUG_KEY_PASSWORD >> output.staging
# echo -e "MYAPP_RELEASE_STORE_FILE="$MYAPP_RELEASE_STORE_FILE >> output.staging
# echo -e "MYAPP_RELEASE_KEY_ALIAS="$MYAPP_RELEASE_KEY_ALIAS >> output.staging
# echo -e "MYAPP_RELEASE_STORE_PASSWORD="$MYAPP_RELEASE_STORE_PASSWORD >> output.staging
# echo -e "MYAPP_RELEASE_KEY_PASSWORD="$MYAPP_RELEASE_KEY_PASSWORD >> output.staging
# echo -e "SSL_EXPIRATION_WARNING="$SSL_EXPIRATION_WARNING_STAGING >> output.staging
# echo -e "AWS_EXPORTS="$AWS_EXPORTS_STAGING >> output.staging
# echo -e "ENV="$ENV >> output.staging
# echo -e "CODE_PUSH_IOS_STAGING="$CODE_PUSH_IOS_STAGING >> output.staging
# echo -e "CODE_PUSH_IOS_PROD="$CODE_PUSH_IOS_PROD >> output.staging
# echo -e "CODE_PUSH_ANDROID_STAGING="$CODE_PUSH_ANDROID_STAGING >> output.staging
# echo -e "CODE_PUSH_ANDROID_PROD="$CODE_PUSH_ANDROID_PROD >> output.staging

# ### .env.production
# echo -e "API_BASE_URL=$API_BASE_URL_PROD" >> output.production
# echo -e "WEBSOCKET_BASE_URL=$WEBSOCKET_BASE_URL_PROD" >> output.production
# echo -e "IMAGES_PREFIX_URL=$IMAGES_PREFIX_URL" >> output.production
# echo -e "GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY" >> output.production
# echo -e "MYAPP_DEBUG_STORE_FILE=$MYAPP_DEBUG_STORE_FILE" >> output.production
# echo -e "MYAPP_DEBUG_KEY_ALIAS=$MYAPP_DEBUG_KEY_ALIAS" >> output.production
# echo -e "MYAPP_DEBUG_STORE_PASSWORD=$MYAPP_DEBUG_STORE_PASSWORD" >> output.production
# echo -e "MYAPP_DEBUG_KEY_PASSWORD=$MYAPP_DEBUG_KEY_PASSWORD" >> output.production
# echo -e "MYAPP_RELEASE_STORE_FILE=$MYAPP_RELEASE_STORE_FILE" >> output.production
# echo -e "MYAPP_RELEASE_KEY_ALIAS=$MYAPP_RELEASE_KEY_ALIAS" >> output.production
# echo -e "MYAPP_RELEASE_STORE_PASSWORD=$MYAPP_RELEASE_STORE_PASSWORD" >> output.production
# echo -e "MYAPP_RELEASE_KEY_PASSWORD=$MYAPP_RELEASE_KEY_PASSWORD" >> output.production
# echo -e "SSL_EXPIRATION_WARNING=$SSL_EXPIRATION_WARNING_PROD" >> output.production
# echo -e "AWS_EXPORTS=$AWS_EXPORTS_PROD" >> output.production
# echo -e "ENV="$ENV >> output.production
# echo -e "CODE_PUSH_IOS_STAGING="$CODE_PUSH_IOS_STAGING >> output.production
# echo -e "CODE_PUSH_IOS_PROD="$CODE_PUSH_IOS_PROD >> output.production
# echo -e "CODE_PUSH_ANDROID_STAGING="$CODE_PUSH_ANDROID_STAGING >> output.production
# echo -e "CODE_PUSH_ANDROID_PROD="$CODE_PUSH_ANDROID_PROD >> output.production

#Remove backslashes
# sed 's/\\//g' output.production > .env.production
# sed 's/\\//g' output.staging > .env.staging
# sed 's/\\//g' output > .env