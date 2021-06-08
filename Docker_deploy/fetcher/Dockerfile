FROM ubuntu:latest
WORKDIR /usr/src/TFM13186
COPY . .

RUN apt-get update -y && apt-get install -y python3-pip
RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip3 install iota_core_python-0.2.0_alpha.3-cp36-abi3-linux_x86_64.whl
