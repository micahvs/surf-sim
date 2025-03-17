#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get absolute path
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$DIR/out"

# Check if the out directory exists
if [ ! -d "$OUT_DIR" ]; then
  echo -e "${RED}Error: The 'out' directory doesn't exist.${NC}"
  echo -e "Please run ${YELLOW}npm run build${NC} first to generate the static export."
  exit 1
fi

# Function to display the menu
display_menu() {
  clear
  echo -e "${PURPLE}=======================================${NC}"
  echo -e "${PURPLE}       🌊 GROOVY SURF VIEWER 🏄‍♂️        ${NC}"
  echo -e "${PURPLE}=======================================${NC}"
  echo ""
  echo -e "${BLUE}Available pages:${NC}"
  echo -e "  ${GREEN}1)${NC} Home Page"
  echo -e "  ${GREEN}2)${NC} Simulator"
  echo -e "  ${GREEN}3)${NC} Wave Dashboard"
  echo -e "  ${GREEN}4)${NC} Brand Specs"
  echo -e "  ${GREEN}5)${NC} MCP Documentation"
  echo -e "  ${GREEN}6)${NC} Quit"
  echo ""
  echo -e "${YELLOW}Enter your choice (1-6):${NC}"
}

# Function to open a file in the default browser
open_file() {
  # Default opening command
  open_cmd="open"
  
  # Check if we're on Linux and set the appropriate command
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    if command -v xdg-open &> /dev/null; then
      open_cmd="xdg-open"
    elif command -v gnome-open &> /dev/null; then
      open_cmd="gnome-open"
    fi
  # Check if we're on Windows with WSL
  elif [[ "$OSTYPE" == "msys"* ]] || [[ "$OSTYPE" == "win32"* ]]; then
    open_cmd="start"
  fi
  
  # Use the appropriate command to open the file
  $open_cmd "$1"
  
  echo -e "${GREEN}Opening $1${NC}"
  echo -e "${YELLOW}Press Enter to continue...${NC}"
  read
}

# Main loop
while true; do
  display_menu
  read choice
  
  case $choice in
    1)
      open_file "$OUT_DIR/index.html"
      ;;
    2)
      open_file "$OUT_DIR/simulator.html"
      ;;
    3)
      open_file "$OUT_DIR/dashboard.html"
      ;;
    4)
      open_file "$OUT_DIR/brand.html"
      ;;
    5)
      open_file "$OUT_DIR/mcp.html"
      ;;
    6)
      echo -e "${GREEN}Thank you for exploring Groovy Surf! 🏄‍♂️${NC}"
      exit 0
      ;;
    *)
      echo -e "${RED}Invalid option. Please try again.${NC}"
      sleep 2
      ;;
  esac
done