#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Starting the server"
    cd ../CleverHug-Backend
    python app.py
    echo "Starting the frontend"
    cd ../CleverHug-Frontend
    index.html
elif [ $# -eq 1 ]; then
    if [ "$1" = "0" ]; then
        echo "Starting the server"
        cd ../CleverHug-Backend
        python app.py
    elif [ "$1" = "1" ]; then
        echo "Starting the frontend"
        cd ../CleverHug-Frontend
        serve -s build
    else
        echo "Invalid argument. Please provide 0 or 1"
    fi
else
    echo "Invalid number of arguments. Please provide 0 or 1"
fi
