#!groovy​
def image = "/registry.hub.docker.com/v1/repositories/rjerome/node-app:${env.BRANCH_NAME}-${env.BUILD_ID}"
def label = "jenkins-pod-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
    containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat',
        envVars: [containerEnvVar(key: 'DOCKER_CONFIG', value: '/tmp/')]
    ),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'nodejs', image: 'node:9.11-alpine', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true)
],
volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
    node(label) {
        def DOCKER_HUB_ACCOUNT = 'rjerome'
        def DOCKER_IMAGE_NAME = 'node-app'
        def K8S_DEPLOYMENT_NAME = 'node-app'
        def myRepo = checkout scm
        def gitCommit = myRepo.GIT_COMMIT
        def gitBranch = myRepo.GIT_BRANCH

        stage('Build') {
            git 'https://github.com/robin-jerome/node-app.git'
            container('nodejs') {                
                sh """
                    npm install
                """
            }
        }
        stage('Unit Tests') {
            container('nodejs') {
                sh """
                    npm test
                """
            }
        }
        stage('Build Docker Image') {
            container('docker') {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', 
                        credentialsId: 'docker-creds',
                        usernameVariable: 'DOCKER_HUB_USER', 
                        passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
                    sh """
                        docker build -t ${DOCKER_HUB_ACCOUNT}/${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} .  
                        docker login -u ${env.DOCKER_HUB_USER} -p ${env.DOCKER_HUB_PASSWORD}
                        docker push ${DOCKER_HUB_ACCOUNT}/${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}
                        docker tag ${DOCKER_HUB_ACCOUNT}/${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} ${DOCKER_HUB_ACCOUNT}/${DOCKER_IMAGE_NAME}:latest
                        docker push ${DOCKER_HUB_ACCOUNT}/${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }
    }
}