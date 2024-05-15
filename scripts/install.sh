#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Installing frontend and backend"
    cd ../CleverHug-Frontend
    pnpm install
    cd ../CleverHug-Backend
    python -m venv .venv
    source .venv/Scripts/activate
    pip install -r requirements.txt
elif [ $# -eq 1 ]; then
    if [ $1 -eq 0 ]; then
        echo "Installing frontend"
        cd ../CleverHug-Frontend
        pnpm install
    elif [ $1 -eq 1 ]; then
        echo "Installing backend"
        cd ../CleverHug-Backend
        python -m venv .venv
        source .venv/Scripts/activate
        pip install -r requirements.txt
    else
        echo "Invalid argument. Please provide 0 or 1"
    fi
else
    echo "Invalid number of arguments. Please provide 0 or 1"
fi