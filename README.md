🗳️ MiniPolls :
MiniPolls is a simple cloud-native demo app built with two microservices and a PostgreSQL database, deployed on Kubernetes (Minikube).
It demonstrates:
* Microservice architecture
* REST APIs for communication
* Independent scaling of services
* Persistent database storage
* External access via NodePort frontend

Features
* Create polls with multiple options
* Vote on polls
* View real-time results (counts + percentages)
* Health endpoints for readiness checks
* Horizontal scaling of services
* Postgres PVC for persistence

Tech Stack
* Frontend: Nginx + static HTML/CSS/JS
* Poll Service: Node.js + Express + pg
* Results Service: Python + FastAPI + asyncpg
* Database: PostgreSQL with PersistentVolumeClaim
* Orchestration: Docker, Kubernetes (Minikube)

Repository Structure
frontend/ → UI with Nginx + HTML/JS/CSS
poll-service/ → Node.js microservice
results-service/ → FastAPI microservice
k8s/ → Kubernetes manifests
README.md
SECURITY.md
ARCHITECTURE.md
docker-compose.yml

Run Locally (Docker Compose)
docker compose up --build -d
Open: http://localhost:8082

Run on Kubernetes (Minikube)
minikube start --driver=docker --memory=3000 --cpus=2
kubectl apply -f k8s/
kubectl get pods -n minipolls
minikube service frontend -n minipolls

Example API Usage
1.Create a poll
curl -X POST "$URL/api/v1/polls" \
  -H 'content-type: application/json' \
  -d '{"question":"Tea or Coffee?","options":["Tea","Coffee"]}'

2.Vote
curl -X POST "$URL/api/v1/polls/1/vote" \
  -H 'content-type: application/json' \
  -d '{"optionId":3}'

3.Results
curl "$URL/api/v1/results/1/summary"

Security
* Database credentials stored in Kubernetes Secret
* Only frontend exposed externally (NodePort); backend services are internal (ClusterIP)
* Health endpoints included for monitoring
* Future: Ingress + TLS, RBAC, NetworkPolicies
