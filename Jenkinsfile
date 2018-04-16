def image = "/registry.hub.docker.com/v1/repositories/rjerome/node-app:${env.BRANCH_NAME}-${env.BUILD_ID}"
def label = "jenkins-pod-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'nodejs', image: 'node:6-onbuild', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true)
],
volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
    node(label) {
        stage('Build the application') {
            container('nodejs') {
                sh """
                    pwd
                    npm install
                    echo 'Success'
                """
            }
        }
    }
}