FROM registry.access.redhat.com/ubi8/nodejs-18

USER root

RUN dnf install -y nginx socat \
    nss nspr atk at-spi2-atk cups-libs libdrm libXcomposite libXcursor \
    libXdamage libXext libXi libXtst pango alsa-lib gtk3 libxkbcommon \
    libXrandr libwayland-client libwayland-server libgbm && \
    dnf clean all

WORKDIR /opt/app-root/src

COPY ./deps/chromium-linux.zip /tmp/chromium.zip
RUN mkdir -p /opt/chromium \
    && unzip /tmp/chromium.zip -d /opt/chromium \
    && rm /tmp/chromium.zip \
    && chmod -R 755 /opt/chromium

RUN echo "net.ipv6.conf.all.disable_ipv6 = 1" >> /etc/sysctl.conf

CMD sh -c "\
    socat TCP-LISTEN:9222,fork,reuseaddr TCP:127.0.0.1:9223 & \
    /opt/chromium/chrome-linux/chrome \
      --headless=new \
      --no-sandbox \
      --disable-gpu \
      --disable-dev-shm-usage \
      --remote-debugging-address=127.0.0.1 \
      --remote-debugging-port=9223 \
      --remote-allow-origins=* \
      --user-data-dir=/data \
      about:blank \
"
