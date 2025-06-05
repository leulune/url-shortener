# 🔗 URL Shortener

Проект представляет собой сервис для сокращения ссылок с REST API и современным фронтендом. Сервис позволяет создавать короткие ссылки, отслеживать статистику переходов и управлять ссылками через простой и интуитивно понятный интерфейс.

## 🚀 Стек технологий

### Backend:
- **NestJS** (TypeScript)
- **PostgreSQL**
- **Prisma ORM**
- **Docker / Docker Compose**

### Frontend:
- **React** (TypeScript)
- **Vite**
- **Tailwind CSS**
- **Axios**

---

## 🧩 Возможности

✅ Создание коротких ссылок  
✅ Указание времени действия ссылки (`expiresAt`)  
✅ Кастомный alias (максимум 20 символов)  
✅ Переход по ссылке с редиректом  
✅ Отображение статистики (IP, время перехода, количество кликов)  
✅ Удаление ссылок  
✅ Просмотр информации по ссылке  
✅ Валидации и обработка ошибок

---

## 🧪 Запуск проекта

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Настройка `.env` файлов

#### Для `backend/.env`:

```
DATABASE_URL="postgresql://postgres:postgres@db:5432/url_shortener"
PORT=3001
```

#### Для `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:3001
```

---

### 3. Запуск проекта через Docker

```bash
docker-compose up --build
```

После запуска:
- Фронтенд: http://localhost:3000  
- Бэкенд API: http://localhost:3001

---

## 📦 Структура проекта

```
url-shortener/
├── backend/             # NestJS backend
│   ├── prisma/          # Prisma schema and migrations
│   ├── src/             # Модули, контроллеры, сервисы
│   └── Dockerfile
├── frontend/            # React + Tailwind frontend
│   ├── src/             # Компоненты, стили, логика
│   └── Dockerfile
├── docker-compose.yml
```

---

## ✨ Дополнительные улучшения

🟢 Обработка истекших ссылок:  
Перед переходом на короткую ссылку осуществляется проверка на валидность (если истекла — alert без редиректа).

🟢 Обновление статистики кликов в реальном времени:  
После возврата пользователя на вкладку, данные автоматически обновляются через `window.onfocus`.

🟢 Современный UI с TailwindCSS:  
Адаптивная верстка, плавные эффекты наведения и стилизованные модальные окна.

🟢 Полностью типизированный код (TypeScript):  
И фронтенд, и бэкенд написаны строго с использованием типов.

---

## 🧪 Тестирование

Для бэкенда реализованы тесты (NestJS e2e):
- Проверка создания короткой ссылки с alias
- Проверка редиректа

Локально:
```bash
cd backend
npm run test
```

Внутри Docker:
```bash
docker compose exec backend npm run test:e2e
```

---

## 📬 Контакты

Если возникнут вопросы — свяжитесь со мной:

- Email: issabaym@gmail.com
- Telegram: @malinkalubimka

---