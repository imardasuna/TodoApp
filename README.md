# Todo Yönetim Uygulaması

Bu proje, kullanıcıların yapılacaklar listesini yönetebileceği bir uygulamadır.

## Teknolojiler

- **Backend**: Laravel 11, PHP 8.2, MySQL
- **Frontend**: React, Redux Toolkit, Axios, TailwindCSS
- **Kimlik Doğrulama**: Manuel Token Tabanlı Kimlik Doğrulama

## Kurulum

### Gereksinimler

- PHP 8.2+ 
- MySQl için Server Xampp php 8.2 sürümü olabilir.
- Composer
- Node.js ve npm

### Adımlar

1. Backend'i kurmak için:
    ```bash
    cd backend
    composer install
    xamp server açıp 
    localhost/phpmyadmin adresinde bir database oluşturulmalı (XAMPP mysql için)
    .env dosyası ayarlama 
    DB_DATABASE ismi yazılmalı.
    komutlar:
    php artisan migrate
    php artisan serve
    ```


2. Frontend'i kurmak için:
    ```bash
    nodejs kütüphanesi kurulmalı
    cd frontend
    npm install
    npm run dev
    ```

## API Dökümantasyonu

### Kullanıcı Kayıt ve Giriş

- **POST /api/register**: Yeni kullanıcı kaydı
- **POST /api/login**: Kullanıcı girişi ve token alımı

### Todo İşlemleri

- **GET /api/todos**: Kullanıcının tüm görevlerini getirir
- **POST /api/todos**: Yeni görev oluşturur
- **GET /api/todos/{id}**: Belirli bir görevi getirir
- **PUT /api/todos/{id}**: Görevi günceller
- **DELETE /api/todos/{id}**: Görevi siler

## Bonus Özellikler

- kayıt ol ve giriş yap ile sadece kayıtlı kullancılar sisteme girebilir.
- Kullanıcıya özel görevler (user_id foreign key ile ilişkilendirilmiş)
- token doğrulama ile belirli işlemlerde ,api üzerinden sadece kayıtlı kullanıcılar cevap alabilir.
- güvenlik için sisteme her girişte yeni token oluşturulur. 

## Örnek Kullanım

1. Kullanıcı `/register` endpoint'ine yeni kullanıcı bilgileriyle kayıt olur.
2. `/login` ile giriş yapar ve JWT token alır.
3. Token her API isteğinde `Authorization: Bearer <token>` olarak eklenir.
4. Kullanıcı sadece kendi görevlerine erişebilir.

