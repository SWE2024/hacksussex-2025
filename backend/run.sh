#!/bin/bash

DIR=".venv"

if [ -d "$DIR" ]; then
    echo "Exists"
else
    echo "Does not exist"
    python3 -m venv .venv
fi

source .venv/bin/activate
pip install -r requirements.txt

rm ./database.db
fastapi dev main.py