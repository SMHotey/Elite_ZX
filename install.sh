#!/bin/bash

echo "=== Elite ZX - Installation ==="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите с https://nodejs.org"
    exit 1
fi

echo "✓ Node.js: $(node -v)"
echo "✓ npm: $(npm -v)"
echo ""

# Install dependencies
echo "Установка зависимостей..."
npm install

echo ""
echo "=== Сборка ==="
npm run build

echo ""
echo "✓ Готово!"
echo ""
echo "Запуск режима разработки:"
echo "  npm run dev"
echo ""
echo "Или превью:"
echo "  npm run preview"
echo ""
echo "Содержимое dist/ скопируйте на веб-сервер."