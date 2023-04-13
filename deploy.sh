CURRENT_DIR=$(pwd)

COMMIT_MESSAGE=$1

# Create a file with the name "deploy_context.sh" in the same folder as this file
# Add the following code and replace with suitable values:
  # export WEBAPP_PATH='<PATH_TO_WEBAPP_LOCAL_REPO>'
  # export ADMIN_PANEL_PATH='<PATH_TO_ADMIN_LOCAL_REPO>'
  # export MARKETING_WEBSITE_PATH='<PATH_TO_MARKETING_WEBSITE_LOCAL_REPO>'

source "./deploy_context.sh"

if [ -z "$COMMIT_MESSAGE" ];
  then
    echo "Error: Please provide a commit message"
    echo "Usage: bash deploy.sh '<commit_message>'"
    exit
fi

# Build
echo "Building artifact"
yarn build

# Deploy
echo \n\n\n"Deploying to git"
git add .
git commit -m "$COMMIT_MESSAGE"
git push

# Update in other repositories
if [ -d $WEBAPP_PATH ];
  then
    echo \n\n\n"Upgrading package in Webapp"
    cd $WEBAPP_PATH && yarn upgrade skillstrainer-resource-library    
fi

if [ -d $ADMIN_PANEL_PATH ];
  then
    echo \n\n\n"Upgrading package in Admin Client"
    cd $ADMIN_PANEL_PATH && yarn upgrade skillstrainer-resource-library
fi

if [ -d $MARKETING_WEBSITE_PATH ];
  then
    echo \n\n\n"Upgrading pacakge in Marketing website"
    cd $MARKETING_WEBSITE_PATH && yarn upgrade skillstrainer-resource-library
fi

echo "Deployment completed!"