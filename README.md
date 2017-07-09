# nekos.life
The source code for https://nekos.life website and api
I recommend uwsig and gevent for production 

Something like uwsgi --socket 0.0.0.0:8885  --protocol=http 
-w wsgi --enable-threads --processes 8 --listen 4096 --ge
vent 4000 --thunder-lock --master                        
           
