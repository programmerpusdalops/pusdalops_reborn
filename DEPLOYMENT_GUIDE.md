# 🚀 DEPLOYMENT GUIDE — PUSDALOPS BPBD Sulteng

Panduan lengkap untuk deploy project ini ke **VPS Ubuntu** (production).

---

## 📋 Daftar Isi

1. [Persiapan Server](#1-persiapan-server)
2. [Setup Project](#2-setup-project)
3. [Konfigurasi Environment](#3-konfigurasi-environment)
4. [Konfigurasi Upload File](#4-konfigurasi-upload-file)
5. [Build Frontend](#5-build-frontend)
6. [Konfigurasi Nginx](#6-konfigurasi-nginx)
7. [Menjalankan Backend dengan PM2](#7-menjalankan-backend-dengan-pm2)
8. [Setup CI/CD](#8-setup-cicd)
9. [Best Practice Production](#9-best-practice-production)

---

## 1. Persiapan Server

### Update Ubuntu

```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js (v18 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v
```

### Install MySQL

```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

Buat database dan user:

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE pusdalops;
CREATE USER 'pusdalops_user'@'localhost' IDENTIFIED BY 'PASSWORD_KUAT';
GRANT ALL PRIVILEGES ON pusdalops.* TO 'pusdalops_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Import SQL:

```bash
mysql -u pusdalops_user -p pusdalops < pusdalops.sql
```

### Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Install Git

```bash
sudo apt install -y git
```

### Install PM2

```bash
sudo npm install -g pm2
```

---

## 2. Setup Project

### Clone Repository

```bash
cd /var/www
sudo git clone <URL_REPOSITORY> pusdalops
sudo chown -R $USER:$USER /var/www/pusdalops
cd /var/www/pusdalops
```

### Install Dependencies

```bash
# Backend
cd backend_reboon
npm install

# Frontend
cd ../frontend
npm install
```

---

## 3. Konfigurasi Environment

### Backend `.env`

```bash
cd /var/www/pusdalops/backend_reboon
cp .env.example .env
nano .env
```

Isi file `.env` untuk production:

```env
DB_HOST=127.0.0.1
DB_NAME=pusdalops
DB_USER=pusdalops_user
DB_PASS=PASSWORD_KUAT
DB_PORT=3306

PORT=5001
BASE_URL=https://api.domain-anda.com
CORS_ORIGIN=https://domain-anda.com

JWT_SECRET=ganti_dengan_string_random_panjang_minimal_32_karakter
WA_TOKEN=token_fonnte_anda
WA_TARGET=nomor_tujuan_whatsapp
```

> ⚠️ **PENTING:**
> - `BASE_URL` harus URL public domain API Anda (bukan localhost)
> - `CORS_ORIGIN` harus URL public frontend Anda
> - `JWT_SECRET` harus string random yang kuat, bisa generate dengan: `openssl rand -hex 32`

### Frontend `.env`

```bash
cd /var/www/pusdalops/frontend
cp .env.example .env
nano .env
```

```env
VITE_API_URL=https://api.domain-anda.com
```

---

## 4. Konfigurasi Upload File

### Buat Folder Upload

```bash
cd /var/www/pusdalops/backend_reboon
mkdir -p public/images
```

### Atur Permission

```bash
sudo chown -R $USER:www-data /var/www/pusdalops/backend_reboon/public/images
sudo chmod -R 775 /var/www/pusdalops/backend_reboon/public/images
```

### Pastikan Express Static Berjalan

File `index.js` sudah menggunakan `path.join(__dirname, "public", "images")` — ini memastikan path absolut yang benar di production.

### Verifikasi Akses Gambar

Setelah deploy, test upload lalu akses:

```
https://api.domain-anda.com/images/nama-file.jpg
```

---

## 5. Build Frontend

```bash
cd /var/www/pusdalops/frontend
npm run build
```

Hasil build ada di folder `dist/`.

---

## 6. Konfigurasi Nginx

### Buat File Konfigurasi

```bash
sudo nano /etc/nginx/sites-available/pusdalops
```

```nginx
# Frontend (React SPA)
server {
    listen 80;
    server_name domain-anda.com www.domain-anda.com;

    root /var/www/pusdalops/frontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 256;

    # SPA routing — semua path diarahkan ke index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Backend API
server {
    listen 80;
    server_name api.domain-anda.com;

    # Max upload size (sesuaikan dengan kebutuhan)
    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Aktifkan & Restart

```bash
sudo ln -s /etc/nginx/sites-available/pusdalops /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### Setup SSL (HTTPS) dengan Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domain-anda.com -d www.domain-anda.com -d api.domain-anda.com
```

---

## 7. Menjalankan Backend dengan PM2

### Jalankan Backend

```bash
cd /var/www/pusdalops/backend_reboon
pm2 start index.js --name "pusdalops-api"
```

### Auto Restart Saat Server Reboot

```bash
pm2 startup
pm2 save
```

### Monitoring

```bash
pm2 status          # Lihat status
pm2 logs            # Lihat log real-time
pm2 monit           # Monitor CPU/Memory
pm2 restart all     # Restart semua
```

---

## 8. Setup CI/CD

### GitHub Actions

Buat file `.github/workflows/deploy.yml` di root project:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/pusdalops

            # Pull kode terbaru
            git pull origin main

            # Backend
            cd backend_reboon
            npm install --production

            # Frontend
            cd ../frontend
            npm install
            npm run build

            # Restart backend
            pm2 restart pusdalops-api
```

### Setup GitHub Secrets

Di repository GitHub → Settings → Secrets → tambahkan:

| Secret | Value |
|--------|-------|
| `VPS_HOST` | IP VPS Anda |
| `VPS_USER` | Username SSH |
| `VPS_SSH_KEY` | Private key SSH |

---

## 9. Best Practice Production

### Keamanan Server

```bash
# Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd

# Fail2ban (brute force protection)
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
```

### Backup Database

Buat script backup otomatis:

```bash
sudo nano /usr/local/bin/backup-pusdalops.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/pusdalops"
mkdir -p $BACKUP_DIR

mysqldump -u pusdalops_user -pPASSWORD_KUAT pusdalops > $BACKUP_DIR/pusdalops_$DATE.sql
gzip $BACKUP_DIR/pusdalops_$DATE.sql

# Hapus backup lebih dari 30 hari
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup selesai: pusdalops_$DATE.sql.gz"
```

```bash
sudo chmod +x /usr/local/bin/backup-pusdalops.sh

# Jalankan otomatis setiap hari jam 2 pagi
sudo crontab -e
# Tambahkan:
0 2 * * * /usr/local/bin/backup-pusdalops.sh >> /var/log/pusdalops-backup.log 2>&1
```

### Logging

```bash
# PM2 log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

### Monitoring Server

```bash
# Install htop
sudo apt install -y htop

# PM2 monitoring dashboard
pm2 monit
```

---

## ✅ Checklist Sebelum Go Live

- [ ] `.env` backend sudah diisi dengan value production
- [ ] `.env` frontend sudah diisi `VITE_API_URL` domain production
- [ ] `JWT_SECRET` sudah diganti dari default `'test'`
- [ ] Database sudah diimport
- [ ] Folder `public/images` sudah ada dengan permission 775
- [ ] Frontend sudah di-build (`npm run build`)
- [ ] Nginx sudah dikonfigurasi dan berjalan
- [ ] SSL/HTTPS sudah aktif
- [ ] PM2 sudah menjalankan backend
- [ ] `pm2 save` dan `pm2 startup` sudah dijalankan
- [ ] Firewall sudah dikonfigurasi
- [ ] Backup database sudah dijadwalkan
- [ ] Test upload gambar berfungsi
- [ ] Test semua API endpoint bekerja
