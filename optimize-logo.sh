#!/bin/bash

# Script pour optimiser le logo
# Convertit en WebP et redimensionne à 512x477 (dimensions d'affichage)

INPUT="src/assets/images/logo.png"
OUTPUT_WEBP="src/assets/images/logo.webp"
OUTPUT_OPTIMIZED="src/assets/images/logo-optimized.png"

echo "Optimisation du logo..."

# Vérifier si sips est disponible (macOS)
if command -v sips &> /dev/null; then
    echo "1. Redimensionnement à 512x477..."
    sips -z 477 512 "$INPUT" --out "$OUTPUT_OPTIMIZED" 2>/dev/null || sips -Z 512 "$INPUT" --out "$OUTPUT_OPTIMIZED"
    
    echo "2. Compression PNG..."
    # Utiliser pngquant si disponible, sinon sips avec compression
    if command -v pngquant &> /dev/null; then
        pngquant --quality=65-80 --ext .png --force "$OUTPUT_OPTIMIZED"
    else
        echo "   (pngquant non disponible, compression basique avec sips)"
    fi
fi

# Convertir en WebP si cwebp est disponible
if command -v cwebp &> /dev/null; then
    echo "3. Conversion en WebP..."
    cwebp -q 80 "$INPUT" -o "$OUTPUT_WEBP"
    echo "   ✓ WebP créé: $OUTPUT_WEBP"
else
    echo "3. cwebp non disponible - installez avec: brew install webp"
fi

echo ""
echo "Optimisation terminée!"
echo "Taille originale: $(du -h "$INPUT" | cut -f1)"
if [ -f "$OUTPUT_OPTIMIZED" ]; then
    echo "Taille optimisée PNG: $(du -h "$OUTPUT_OPTIMIZED" | cut -f1)"
fi
if [ -f "$OUTPUT_WEBP" ]; then
    echo "Taille WebP: $(du -h "$OUTPUT_WEBP" | cut -f1)"
fi

