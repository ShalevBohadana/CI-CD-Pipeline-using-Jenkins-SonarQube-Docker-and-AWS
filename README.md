# 🚀 Full Cloud DevOps Portfolio Project

This project demonstrates a complete production-grade DevOps environment deployed on AWS Cloud, using modern tools and best practices.

---

## 🏗️ Project Architecture

- **Infrastructure**: Terraform + AWS (VPC, Subnets, EC2)
- **Provisioning**: Ansible (install Docker, Kubernetes, Jenkins, Prometheus, Grafana)
- **Containerization**: Docker
- **Orchestration**: Kubernetes (K3s lightweight cluster)
- **CI/CD**: Jenkins pipelines (build, test, deploy)
- **Monitoring**: Prometheus + Grafana
- **Source Control**: Git + GitHub

---

## 📈 Future Improvements Integrated into the Plan

✅ Install applications using Helm Charts  
✅ Integrate GitOps workflow with ArgoCD  
✅ Implement Kubernetes Horizontal Pod Autoscaling (HPA)  
✅ Setup Alerting with Prometheus Alertmanager  
✅ Enable HTTPS traffic with TLS certificates and Kubernetes Ingress  
✅ Add centralized logging with ELK Stack (Elasticsearch, Logstash, Kibana)

---

## 🛠️ Deployment Steps

### 1. Set Up Local Environment
- Install Terraform, AWS CLI, Docker, Kubectl, Ansible, Git.
- Configure AWS credentials using `aws configure`.

### 2. Infrastructure Deployment
- Create custom VPC, public and private subnets using Terraform.
- Configure Security Groups to allow only necessary traffic.
- Launch EC2 instances (Ubuntu 20.04 LTS) for:
  - Jenkins Server
  - Kubernetes Master Node
  - Kubernetes Worker Node(s)
  - Monitoring Server (Prometheus + Grafana)

### 3. Server Provisioning
- Use Ansible to:
  - Install Docker on all instances.
  - Install lightweight Kubernetes cluster (K3s) on master and worker nodes.
  - Setup Jenkins on a dedicated EC2 instance.
  - Install Prometheus and Grafana on Monitoring Server.

### 4. CI/CD Setup
- Configure Jenkins pipelines to:
  - Build Docker images
  - Push images to AWS ECR (Elastic Container Registry) or DockerHub
  - Deploy to Kubernetes cluster

### 5. Kubernetes Workloads Deployment
- Deploy applications using Kubernetes YAML files.
- **(Improvement)**: Migrate deployments into Helm charts for better lifecycle management.

### 6. Monitoring and Observability
- Setup Prometheus scraping configurations for Kubernetes metrics.
- Build custom Grafana dashboards to monitor cluster health and workloads.
- **(Improvement)**: 
  - Integrate Prometheus Alertmanager for real-time alerts.
  - Setup centralized logging using ELK Stack (Elasticsearch, Logstash, Kibana).

### 7. Networking and Security
- Configure Kubernetes Ingress Controller for routing.
- **(Improvement)**: Add HTTPS and TLS certificates to secure all traffic (Let's Encrypt).

### 8. GitOps Integration
- **(Improvement)**: Deploy ArgoCD for full GitOps pipeline.
- Automate application rollouts based on Git events.

### 9. Kubernetes Cluster Enhancements
- **(Improvement)**: Implement Horizontal Pod Autoscaling (HPA) for dynamic scaling.

---

## 📊 Final Architecture Diagram

AWS Cloud ├── VPC │ ├── Public Subnet (Jenkins, Ingress endpoints) │ └── Private Subnet (Kubernetes nodes, Prometheus, Grafana) │ ├── EC2 Instances │ ├── Jenkins Server │ ├── Kubernetes Master Node │ ├── Kubernetes Worker Node(s) │ └── Monitoring Server (Prometheus + Grafana) │ └── Security Groups ├── Allow SSH (port 22), HTTP (port 80), HTTPS (port 443) ├── Allow Kubernetes NodePort Traffic └── Deny all unnecessary inbound traffic



---

## 📦 Project Structure

```bash
devops-portfolio-project/
├── terraform/
│   ├── network/
│   ├── ec2/
│   └── security_groups/
├── ansible/
│   ├── install_docker.yml
│   ├── install_k3s.yml
│   ├── install_jenkins.yml
│   ├── install_monitoring.yml
│   └── install_argo.yml  # (GitOps improvement)
├── kubernetes/
│   ├── deployments/
│   ├── services/
│   ├── ingress/
├── helm/
│   └── charts/  # (Helm charts improvement)
├── jenkins/
│   └── pipelines/
├── monitoring/
│   ├── prometheus/
│   └── grafana/
├── logging/
│   ├── elk/
├── README.md


✨ Author
Name: Shalev Bohadana
LinkedIn: linkedin.com/in/shalev-bohadana-767aa3210/
GitHub: https://github.com/ShalevBohadana