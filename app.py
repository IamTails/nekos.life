from flask import Flask, g, session, redirect, request, url_for, jsonify,render_template,abort,send_from_directory,request, abort
from functools import wraps
import os
import random
from gevent import monkey
monkey.patch_all()
application = Flask(__name__)
application.config['PROPAGATE_EXCEPTIONS'] = False
keys = db('keys')

def require_appkey(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        if request.headers.get('Key') and request.headers.get('Key') in keys:
            return view_function(*args, **kwargs)
        else:
            abort(401)
    return decorated_function

def random_image(x):
    names = os.listdir(os.path.join(application.static_folder, x))
    img_url = url_for('static', filename=os.path.join(x, random.choice(names)))
    return img_url


@application.route('/')
def neko():
    return render_template('neko.html', img_url=random_image("neko"))

@application.route('/lewd')
def nsfwneko():
    return render_template('nsfwneko.html', img_url=random_image("nya"))

@application.route('/api/neko')
def nekos():
    link = 'https://nekos.life' + random_image("neko")
    return jsonify(neko=link)

@application.route('/api/lewd/neko')
def lewdnekos():
    link = 'https://nekos.life' + random_image("nya")
    return jsonify(neko=link)

@application.route('/api/pat')
@require_appkey
def pat():
    link = 'https://nekos.life' + random_image("pat")
    return jsonify(url=link)

@application.route('/api/hug')
@require_appkey
def hug():
    link = 'https://nekos.life' + random_image("hug")
    return jsonify(url=link)

@application.route('/api/kiss')
@require_appkey
def kiss():
    link = 'https://nekos.life' + random_image("kiss")
    return jsonify(url=link)


if __name__ == '__main__':
    application.run(host='0.0.0.0', port=9999)
