1. tạo môi trường ảo
    Mở terminal cd đến folder BE_API, chạy lệnh: 
    python -m venv env
    (env là tên môi trường, có thể đổi thành tên khác)
    
2. kích hoạt mta
    Sau khi xuất hiện folder env chạy tiếp lệnh:
    .\env\Scripts\activate

3. cài các thư viện 
    pip install -r requirements.txt

4. copy file ".env copy" tạo file .env

5. truy cập https://ai.google.dev/ -> đăng nhập và tạo api key.
    Pase api vào file .env

6. sử dụng xampp hoặc laragon mở mysql tạo db tên py_chatbot

7. chạy lệnh:
    python app.py


