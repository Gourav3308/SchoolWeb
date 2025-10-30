## SchoolWeb

Modern school website with an Angular frontend and a Spring Boot backend. It provides public pages (home, facilities, gallery, notices, fees, contact) and an admin area for managing content such as student registrations and notices.

### Highlights
- **Clean Angular UI**: Responsive pages for key school information.
- **Spring Boot API**: Secure endpoints for notices, students, and fees.
- **Email support**: Pluggable email service for notifications (configurable).
- **Production-ready structure**: Separate `frontend/` and `backend/` apps.

### Tech Stack
- **Frontend**: Angular, TypeScript, SCSS
- **Backend**: Spring Boot, Spring Security, Spring Data JPA
- **Build/Tools**: Maven, Node.js, npm

### Repository Structure
```
backend/           # Spring Boot project (API)
frontend/          # Angular application (web)
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+ (LTS) and Maven 3.9+
- Git

### 1) Backend (Spring Boot)
```bash
cd backend
mvn clean package
# Run locally
mvn spring-boot:run
# or using the built jar (after package)
java -jar target/schoolweb-backend-0.0.1-SNAPSHOT.jar
```

Backend defaults can be configured in `backend/src/main/resources/application.properties` (datasource, mail, security, etc.).

Common endpoints (examples):
- `GET /health` – health check
- `GET /notices` – list notices
- `POST /notices` – create notice
- `GET /students` – list students
- `POST /students/register` – register a student
- `GET /fees` – list fees

Security specifics (auth roles, login flow) are defined in `backend/src/main/java/com/praswkrit/school/config/SecurityConfig.java`.

### 2) Frontend (Angular)
```bash
cd frontend
npm ci
npm start
# Angular will serve at http://localhost:4200
```

Build for production:
```bash
npm run build
```
Output will be in `frontend/dist/`.

### Configuration
- Backend: `backend/src/main/resources/application.properties`
  - Database URL/credentials (if using an external DB)
  - Mail settings for `EmailService`
  - CORS and security settings
- Frontend: update API base URLs or environment values in `frontend/src/environments` (add as needed if not present) or in services using HTTP.
- Assets: gallery images and manifest under `frontend/src/assets/school/gallery/`.

### Useful Scripts
Backend:
- `mvn spring-boot:run` – run API in dev mode
- `mvn test` – run backend tests

Frontend:
- `npm start` – start dev server
- `npm run build` – production build
- `npm test` – run unit tests (if configured)

## Development Notes
- The gallery uses a `manifest.json` to manage image metadata in `frontend/src/assets/school/gallery/`.
- For admin-only features, ensure proper roles are configured in the backend security config.
- If serving frontend and backend from different origins in dev, configure CORS on the backend.

## Deployment
You can deploy the frontend build output to any static hosting provider. The backend runs as a standard Spring Boot service (jar or container). Typical options:
- Frontend: Netlify, Vercel, S3+CloudFront, static Nginx
- Backend: Any JVM-friendly platform (VM, Docker/Kubernetes, Heroku-like services)

## Contributing
1. Create a feature branch: `git checkout -b feature/your-change`
2. Commit your changes: `git commit -m "feat: describe change"`
3. Push to the branch: `git push origin feature/your-change`
4. Open a Pull Request

## License
UNLICENSED – replace with your preferred license (e.g., MIT) if desired.

## Contact
For questions or support, please open an issue on the repository.


