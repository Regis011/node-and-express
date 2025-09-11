#!/bin/bash

# Function to kill process on port 5000
kill_port_5000() {
    echo "🔍 Checking if port 5000 is in use..."
    
    # Find process ID using port 5000
    PID=$(lsof -ti:5000)
    
    if [ -n "$PID" ]; then
        echo "⚠️  Port 5000 is being used by process $PID"
        echo "🔨 Killing process $PID..."
        kill -9 $PID
        sleep 1
        echo "✅ Process killed successfully"
    else
        echo "✅ Port 5000 is free"
    fi
}

# Kill any process on port 5000
kill_port_5000

echo "🚀 Starting development server..."
nodemon --watch src --ext ts --exec "ts-node src/index.ts"
