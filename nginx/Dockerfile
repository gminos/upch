FROM nginx:alpine
WORKDIR /etc/nginx/conf.d/
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
