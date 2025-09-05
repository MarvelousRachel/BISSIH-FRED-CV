#!/bin/bash

echo "🎯 BISSIH FRED CV - PDF Generator"
echo "================================="
echo ""

# Get the current directory
CV_DIR="/Users/fomekongrachelmarvelous/Desktop/BISSIH FRED"
CV_FILE="$CV_DIR/BISSIH_FRED_CV_Modern.html"

if [ -f "$CV_FILE" ]; then
    echo "✅ Found CV file: BISSIH_FRED_CV_Modern.html"
    echo ""
    echo "🖨️ AUTOMATED PDF GENERATION INSTRUCTIONS:"
    echo "=========================================="
    echo ""
    echo "1️⃣ Opening your CV in Safari..."
    open -a Safari "$CV_FILE"
    echo ""
    echo "2️⃣ MANUAL STEPS (Safari will open):"
    echo "   • Wait for CV to load completely"
    echo "   • Press Cmd+P (Print)"
    echo "   • Choose 'Save as PDF'"
    echo "   • Set margins to 'Minimum'"
    echo "   • Save as 'BISSIH_FRED_CV_Modern.pdf'"
    echo ""
    echo "3️⃣ Alternative method:"
    echo "   • File → Export as PDF (if available)"
    echo ""
    echo "✨ Your CV has:"
    echo "   • Professional sidebar with photo"
    echo "   • Complete experience timeline"
    echo "   • Skills sections"
    echo "   • References with contact info"
    echo ""
    sleep 3
    echo "🚀 Safari should now be opening with your CV..."
else
    echo "❌ CV file not found: $CV_FILE"
fi
