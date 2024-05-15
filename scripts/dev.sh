#!/bin/bash
start_frontend() {
    echo "Starting frontend"
    cd ../CleverHug-Frontend
    pnpm start
}

start_backend() {
    echo "Starting backend"
    cd ../CleverHug-Backend
    python app.py
}

if [ $# -eq 0 ]; then
    echo "Starting frontend and backend"
    start_frontend &
    start_backend &
    wait
elif [ $# -eq 1 ]; then
    if [ "$1" = "0" ]; then
        start_frontend
        wait
    elif [ "$1" = "1" ]; then
        start_backend
        wait
    else
        echo "Invalid argument. Please provide 0 or 1"
    fi
else
    echo "Invalid number of arguments. Please provide 0 or 1"
fi