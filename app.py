from flask import Flask, g, session, redirect, request, url_for, jsonify,render_template,abort,send_from_directory
import os
import random
from gevent import monkey
monkey.patch_all()
application = Flask(__name__)
application.config['PROPAGATE_EXCEPTIONS'] = False
def random_image():
    names = os.listdir(os.path.join(application.static_folder, 'neko'))
    img_url = url_for('static', filename=os.path.join('neko', random.choice(names)))
    return img_url

def random_lewd_image():
    names = os.listdir(os.path.join(application.static_folder, 'nya'))
    img_url = url_for('static', filename=os.path.join('nya', random.choice(names)))
    return img_url


@application.route('/')
def neko():
    return render_template('neko.html', img_url=random_image())

@application.route('/lewd')
def nsfwneko():
    return render_template('nsfwneko.html', img_url=random_lewd_image())
@application.route('/api/neko')
def nekos():
    link = 'https://nekos.life' + random_image()
    return jsonify(neko=link)

@application.route('/api/lewd/neko')
def lewdnekos():
    link = 'https://nekos.life' + random_lewd_image()
    return jsonify(neko=link)

if __name__ == '__main__':
    application.run()
