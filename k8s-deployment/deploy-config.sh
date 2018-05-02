#!/bin/bash

kubectl create configmap node-app-envoy-config --from-file=envoy.json=../envoy/envoy.json