# 🛠️  MiniMediaSosial Setup Guide (React + Vite & Laravel)

## 📦 Clone Repository
```bash
git clone https://github.com/Mikoofficial404/MiniMediaSosial.git
cd MiniMediaSosial
```

## 📁 Folder React
```bash
cd frontend
```

## 📦 Install dependencies:
With bun
```bash
bun install
```
With npm
```bash
npm install
```
## 🚀 Run development server:
With bun
```bash
bun run dev
```
With npm
```bash
npm run dev
```
## 🔙 Backend (Laravel API)

## 📁 folder backend:
```bash
cd RestApi-Minimediasosia
```
## 📦 Install dependencies:
```bash
composer install
```

## ⚙️ copy file .env:
```bash
cp .env.example .env
```
## 🔑 Generate APP Key:
```bash
php artisan key:generate
```
## 🔐 Generate JWT Secret:
```bash
php artisan jwt:secret
```

## 🧬 run migrasi database (opsional):
```bash
php artisan migrate
```

## 🚀 run server Laravel:
```bash
php artisan serve
```

## 📷 Demo
<img width="1898" height="992" alt="Image" src="https://github.com/user-attachments/assets/cacd2e8c-4312-47bf-8137-28514e11e8ae" />


