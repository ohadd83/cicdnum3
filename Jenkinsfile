pipeline {
    agent any

    environment {
        IMAGE_NAME = "myapp"
        DEV_CONTAINER = "myapp-dev"
        PROD_CONTAINER = "myapp-prod"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Install & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Deploy to DEV') {
            steps {
                sh '''
                    docker stop $DEV_CONTAINER || true
                    docker rm $DEV_CONTAINER || true
                    docker run -d -p 8080:3000 --name $DEV_CONTAINER $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Approval for PROD') {
            steps {
                input message: "Deploy to PROD?", ok: "Yes, deploy"
            }
        }

        stage('Deploy to PROD') {
            steps {
                sh '''
                    docker stop $PROD_CONTAINER || true
                    docker rm $PROD_CONTAINER || true
                    docker run -d -p 80:3000 --name $PROD_CONTAINER $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}

