CURRENT_DIR=$(pwd)

COMMIT_MESSAGE=$1

WEBAPP_PATH='/home/amit/Documents/Amit/skillstrainer_webapp'
ADMIN_PANEL_PATH='../admin'
MARKETING_WEBSITE_PATH='../marketing-website/ui'

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
echo "\n\n\nDeploying to git"
git add .
git commit -m "$COMMIT_MESSAGE"
git push

# Update in other repositories
if [ -d $WEBAPP_PATH ];
  then
    echo "\n\n\nUpgrading package in Webapp"
    cd $WEBAPP_PATH && yarn upgrade skillstrainer-resource-library    
fi

if [ -d $ADMIN_PANEL_PATH ];
  then
    echo "\n\n\nUpgrading package in Admin Client"
    cd $ADMIN_PANEL_PATH && yarn upgrade skillstrainer-resource-library
fi

if [ -d $MARKETING_WEBSITE_PATH ];
  then
    echo "\n\n\nUpgrading pacakge in Marketing website"
    cd $MARKETING_WEBSITE_PATH && yarn upgrade skillstrainer-resource-library
fi

echo "Deployment completed!"