# Student Management System - Backend

## 1. Install
```bash
npm install
```

## 2. Environment
Copy `.env.example` to `.env`, then set:
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: long random secret
- `CLIENT_URL`: frontend origin, normally http://localhost:5173
- `ADMIN_SETUP_KEY`: private key used only for first/admin registration

Never commit `.env` or share database credentials.

## 3. Run
```bash
npm run dev
```
Health check: `GET http://localhost:5000/api/health`

## 4. First admin registration
POST `http://localhost:5000/api/auth/register`
```json
{
  "name": "System Admin",
  "email": "admin@example.com",
  "password": "ChangeThisPassword123",
  "setupKey": "the-value-from-ADMIN_SETUP_KEY"
}
```
The setup key must be kept private. After creating your admin, remove or rotate `ADMIN_SETUP_KEY` and disable the registration route before production.

## 5. Login
POST `/api/auth/login` with email/password. Send returned token on protected routes:
`Authorization: Bearer YOUR_TOKEN`

## API overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | First/admin registration using setup key |
| POST | /api/auth/login | Admin login |
| GET | /api/auth/me | Current admin |
| GET | /api/dashboard/stats | Dashboard statistics |
| GET | /api/students | Search/filter/sort/pagination |
| POST | /api/students | Add student (multipart form, photo field `profilePhoto`) |
| GET | /api/students/:id | Student profile |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |
| GET | /api/courses | List courses |
| POST | /api/courses | Add course |
| GET | /api/courses/:id | Course details |
| PUT | /api/courses/:id | Update course |
| DELETE | /api/courses/:id | Delete course (blocked while students are assigned) |
| GET | /api/courses/:id/students | Students assigned to course |

Student list query examples:
`/api/students?search=pravesh&status=Active&page=1&limit=10&sortBy=createdAt&order=desc`
`/api/students?course=COURSE_OBJECT_ID`

## Notes
- This starter stores uploaded photos on local disk in `uploads/`. For cloud deployment, use durable object storage (e.g. Cloudinary/Supabase Storage) because VM local disk may be ephemeral.
- Add production-grade request validation, audit logs, backups, and secure admin provisioning before public production use.
- CORS is configured from `CLIENT_URL`; comma-separated origins are supported.
