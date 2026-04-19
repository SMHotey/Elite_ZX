# Elite ZX - Installation Script

Write-Host "=== Elite ZX - Installation ===" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js не найден. Установите с https://nodejs.org" -ForegroundColor Red
    exit 1
}

$nodeVersion = node -v
$npmVersion = npm -v

Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "✓ npm: $npmVersion" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "Установка зависимостей..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка установки" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Сборка ===" -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка сборки" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✓ Готово!" -ForegroundColor Green
Write-Host ""
Write-Host "Запуск режима разработки:" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Или превью:" -ForegroundColor White
Write-Host "  npm run preview" -ForegroundColor Gray
Write-Host ""
Write-Host "Содержимое dist/ скопируйте на веб-сервер." -ForegroundColor White