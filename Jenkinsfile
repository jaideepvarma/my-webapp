pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = "831441088496"
        AWS_REGION = "us-east-1"
        ECR_REPO = "my-webapp-repo"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/jaideepvarma/my-webapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t my-webapp .'
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                script {
                    sh "docker tag my-webapp:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                script {
                    // Stop existing container (if any)
                    sh "docker stop webapp || true && docker rm webapp || true"
                    // Run new container
                    sh "docker run -d -p 80:3000 --name webapp ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
