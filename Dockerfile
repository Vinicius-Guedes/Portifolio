FROM nginx:alpine

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o site
COPY site /usr/share/nginx/html