pipeline {
    agent any

    tools {
        jdk 'JDK21'        // Optional for static sites
        maven 'Maven3.9.9' // Only needed if you have a build step
    }

    environment {
        GIT_CREDENTIALS = 'github-https' // ID of your stored GitHub credentials in Jenkins
        TARGET_BRANCH = 'main'       // GitHub Pages branch
        BUILD_DIR = 'build'              // Output folder after build; use '.' if files are already ready
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: "${GIT_CREDENTIALS}",
                    url: 'https://github.com/balajivb25/website-jenkins-projects.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building website...'
                // For static HTML, this can be skipped or replaced with a simple copy
                // Example for React/Vue:
                // sh 'npm install && npm run build'
                sh 'mkdir -p build && cp -r * build/ || true'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                script {
                    sh """
                        git config --global user.email "balajiv.b25@gmail.com"
                        git config --global user.name "Jenkins CI"

                        git checkout --orphan ${TARGET_BRANCH}
                        git --work-tree=${BUILD_DIR} add --all
                        git --work-tree=${BUILD_DIR} commit -m "Deploy website from Jenkins"
                        git push origin HEAD:${TARGET_BRANCH} --force
                        git checkout main
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Website deployed to GitHub Pages successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
