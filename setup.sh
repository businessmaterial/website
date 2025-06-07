#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up Exam Planner projects...${NC}"

# Setup User Project
echo -e "${GREEN}Setting up User Project...${NC}"
cd exam-planner-user
npm install
echo -e "${GREEN}User Project dependencies installed${NC}"

# Setup Admin Project
echo -e "${GREEN}Setting up Admin Project...${NC}"
cd ../exam-planner-admin
npm install
echo -e "${GREEN}Admin Project dependencies installed${NC}"

# Return to root
cd ..

echo -e "${BLUE}Setup complete! You can now start the projects:${NC}"
echo -e "${GREEN}For User Project: cd exam-planner-user && npm start${NC}"
echo -e "${GREEN}For Admin Project: cd exam-planner-admin && npm start${NC}" 