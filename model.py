# from model.recipe import Ingredient, Recipe
# from model.bar import Bar

import json
import os
import sqlite3
import hashlib

class Model:
    def __init__(self, db_path='drinks.db'):
        self.conn = sqlite3.connect(db_path)
        self.c = self.conn.cursor()
        self.count = 0

    def create_table(self):
        self.c.execute("""CREATE TABLE drinks (
                    id text,
                    d_name text,
                    d_cat text,
                    d_alcohol text,
                    d_glass text,
                    d_instructions text,
                    d_img_url text,
                    d_ingredients text,
                    d_creator text)""")
        self.c.execute("""CREATE TABLE users (
                    id text,
                    first_name text,
                    last_name text,
                    email text,
                    google_id text,
                    facebook_id text,
                    gender text,
                    date_of_birth text,
                    liked_drinks text)""")


    def get_all_drinks(self):
        self.c.execute("SELECT * FROM drinks WHERE 1=1")
        return self.c.fetchall()

    def get_all_users(self):
        self.c.execute("SELECT * FROM users WHERE 1=1")
        return self.c.fetchall()

    # TODO Prevent from SQL Injection attacks by using .format(..)
    def substring_query(self, substring):
        self.c.execute("SELECT * FROM drinks WHERE d_name LIKE '{}%'".format(substring))
        return self.c.fetchall()

    def load_file(self, path):
        with open(path) as drinks_file:
            drinks = json.loads(drinks_file.read())
            for drink in drinks:
                self.insert_drink(drink)

    def insert_drink(self, drink):
        self.count += 1
        with self.conn:
            self.c.execute("""INSERT INTO drinks VALUES (
                :id,
                :name,
                :cat,
                :alcohol,
                :glass,
                :instructions,
                :img_url,
                :ingredients,
                :creator
            )""", {
            'id': self.count,
            'name': drink['d_name'],
            'cat': drink['d_cat'],
            'alcohol': drink['d_alcohol'],
            'glass': drink['d_glass'],
            'instructions': drink['d_instructions'],
            'img_url': drink['d_img_url'],
            'ingredients': drink['d_ingredients'],
            'creator': drink['d_creator']})

    def insert_user(self, user):
        with self.conn:
            self.c.execute("""INSERT INTO users VALUES (
                :id,
                :first_name,
                :last_name,
                :email,
                :google_id,
                :facebook_id,
                :gender,
                :date_of_birth,
                :liked_drinks
            )""", {'id': user['id'],
            'first_name': user['first_name'],
            'last_name': user['last_name'],
            'email': user['email'],
            'google_id': user['google_id'],
            'facebook_id': user['facebook_id'],
            'gender': user['gender'],
            'date_of_birth': user['date_of_birth'],
            'liked_drinks': user['liked_drinks'],
            })


    def get_drinks_by_name(self, name):
        self.c.execute("SELECT * FROM drinks WHERE d_name=:name", {'name': name})
        return self.c.fetchall()

    def filter_drinks(self, attr, value):
        # print("""SELECT * FROM drinks WHERE :attr LIKE ':{}}%'""", {'attr': attr, 'value': value})
        self.c.execute("""SELECT * FROM drinks WHERE {} LIKE '{}%'""".format(attr, value))
        return self.c.fetchall()

    # def update_drink(drink):
    #     with conn:
    #         c.execute("""UPDATE drinks SET 
    #                     pay = :pay
    #                     WHERE first = :first AND last = :last""",
    #                   {'first': emp.first, 'last': emp.last, 'pay': pay})

    def remove_drink(self, drink):
        with self.conn:
            self.c.execute("DELETE from drinks WHERE name = :name", {'name': drink.name})

    def drop_table(self):
        with self.conn:
            self.c.execute('DROP TABLE drinks')
            self.c.execute('DROP TABLE users')

    def close(self):
        self.conn.close()


if __name__ == "__main__":
    dummy_user = {'id': '111',
            'first_name': 'Gabriel',
            'last_name': 'Peter',
            'email': 'gabepeter0817@gmail.com',
            'google_id': "101658123011673567176",
            'facebook_id': 'None',
            'gender': 'Male',
            'date_of_birth': '08.17.1999',
            'liked_drinks': 'Margarita',
            }
    db = Model()
    db.create_table()
    db.insert_user(dummy_user)
    db.load_file('/Users/gabrielpeter/MixAssist/desktop/data_dump/d_Data.json')
    fetched_drinks = db.get_drinks_by_name("Margarita")
    print(fetched_drinks[0])
    
    db.substring_query("Margarita")
    all_users = db.get_all_users()
    print(all_users)
    db.drop_table()
    db.close()
    


