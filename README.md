🗳️ MiniPolls
MiniPolls is a simple cloud-native demo app built with two microservices and a PostgreSQL database, deployed on Kubernetes (Minikube).
It demonstrates:
* Microservice architecture
* REST APIs for communication
* Independent scaling of services
* Persistent database storage
* External access via NodePort frontend

✨ Features
* Create polls with multiple options
* Vote on polls
* View real-time results (counts + percentages)
* Health endpoints for readiness checks
* Horizontal scaling of services
* Postgres PVC for persistence

📦 Tech Stack
* Frontend: Nginx + static HTML/CSS/JS
* Poll Service: Node.js + Express + pg
* Results Service: Python + FastAPI + asyncpg
* Database: PostgreSQL with PersistentVolumeClaim
* Orchestration: Docker, Kubernetes (Minikube)
