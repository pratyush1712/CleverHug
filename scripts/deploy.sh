# using vercel cli to deploy the app

if [ $# -eq 0 ]; then
    echo "Deploying the server"
    cd ../CleverHug-Backend
    vercel --prod
    echo "Deploying the frontend"
    cd ../CleverHug-Frontend
    vercel --prod
    wait
    if [ $? -ne 0 ]; then
        echo "Error: Deployment failed"
    fi
    read -p "Do you want to alias the deployment? (y/n): " alias
elif [ $# -eq 1 ]; then
    if [ "$1" = "0" ]; then
        echo "Deploying the server"
        cd ../CleverHug-Backend
        vercel --prod
        wait
        if [ $? -ne 0 ]; then
            echo "Error: Deployment failed"
        fi
        read -p "Do you want to alias the deployment? (y/n): " alias
    elif [ "$1" = "1" ]; then
        echo "Deploying the frontend"
        cd ../CleverHug-Frontend
        vercel --prod
        wait
        if [ $? -ne 0 ]; then
            echo "Error: Deployment failed"
        fi
        read -p "Do you want to alias the deployment? (y/n): " alias
    else
        echo "Invalid argument. Please provide 0 or 1"
    fi
else
    echo "Invalid number of arguments. Please provide 0 or 1"
fi